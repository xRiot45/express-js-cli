const templateCodeCsrfMiddlewareJS = () => {
  return `
import csrf from "csrf";

const tokens = new csrf();

// Middleware untuk generate token CSRF
export const generateCsrfToken = (req, res, next) => {
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
export const verifyCsrfToken = (req, res, next) => {
  const token = req.headers["x-csrf-token"] || req.body._csrf;
  const secret = req.cookies?._csrf_secret;

  if (!secret || !token || !tokens.verify(secret, token)) {
    return res.status(403).json({ error: "Invalid CSRF token" });
  }

  next();
};
`;
};

export default templateCodeCsrfMiddlewareJS;
