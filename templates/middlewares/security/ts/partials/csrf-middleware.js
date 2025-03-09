const templateCodeCsrfMiddlewareTS = () => {
  return `
import { Request, Response, NextFunction } from "express";
import csrf from "csrf";

const tokens = new csrf();

interface RequestWithCsrf extends Request {
  csrfSecret?: string;
}

// Middleware untuk generate token CSRF
export const generateCsrfToken = (req: RequestWithCsrf, res: Response, next: NextFunction): void => {
  let secret = req.cookies?._csrf_secret;
  
  if (!secret) {
    secret = tokens.secretSync();
    res.cookie("_csrf_secret", secret, { httpOnly: true, secure: false });
  }

  const token = tokens.create(secret);
  res.cookie("_csrf_token", token, { httpOnly: false, secure: false });

  req.csrfSecret = secret;
  next();
};

// Middleware untuk validasi token CSRF
export const verifyCsrfToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers["x-csrf-token"] as string | undefined || req.body._csrf;
  const secret = req.cookies?._csrf_secret;

  if (!secret || !token || !tokens.verify(secret, token)) {
    res.status(403).json({ error: "Invalid CSRF token" });
    return;
  }

  next();
};
`;
};

export default templateCodeCsrfMiddlewareTS;
