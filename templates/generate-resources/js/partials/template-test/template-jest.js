const templateCodeJest = (modelName) => {
  return `
import request from 'supertest';
import app from '../src/app.js';

const validToken = 'Bearer valid.token';
const invalidToken = 'Bearer invalid.token';
let ${modelName}Id;


describe('Testing Your API With Jest and Supertest', () => {
  beforeEach(async () => {
    const res = await request(app)
      .post('/api/v1/${modelName}')
      .set('Authorization', validToken)
      .send({
        // Send your request body in here
      });

    ${modelName}Id = res.body.id;
  });

  afterEach(async () => {
    await request(app)
      .delete(\`/api/v1/${modelName}/\${${modelName}Id}\`)
      .set('Authorization', validToken);
  });

  describe('POST /api/v1/${modelName} - API for creating data', () => {
    it('should return 201 if token is valid and request is valid', async () => {
      const res = await request(app)
        .post('/api/v1/${modelName}')
        .set('Authorization', validToken)
        .send({
          // Fill in with valid data
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
    });

    it('should return 400 if request is invalid', async () => {
      const res = await request(app)
        .post('/api/v1/${modelName}')
        .set('Authorization', validToken)
        .send({
          // Fill with invalid data
        });

      expect(res.statusCode).toEqual(400);
    });

    it('should return 401 if token is not found', async () => {
      const res = await request(app).post('/api/v1/${modelName}').send({
        // Fill in with valid data
      });

      expect(res.statusCode).toEqual(401);
    });

    it('should return 403 if token is invalid', async () => {
      const res = await request(app)
        .post('/api/v1/${modelName}')
        .set('Authorization', invalidToken)
        .send({
          // Fill in with valid data
        });

      expect(res.statusCode).toEqual(403);
    });

    it('should return 409 if data already exists', async () => {
      await request(app)
        .post('/api/v1/${modelName}')
        .set('Authorization', validToken)
        .send({
          // Fill in with valid data
        });

      const res = await request(app)
        .post('/api/v1/${modelName}')
        .set('Authorization', validToken)
        .send({
          // Fill with the same data
        });

      expect(res.statusCode).toEqual(409);
    });
  });

  describe('GET /api/v1/${modelName} - API for get data', () => {
    it('should return 200 if token is valid', async () => {
      const res = await request(app)
        .get('/api/v1/${modelName}')
        .set('Authorization', validToken);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return 401 if token not found', async () => {
      const res = await request(app).get('/api/v1/${modelName}');

      expect(res.statusCode).toEqual(401);
    });

    it('should return 403 if token is invalid', async () => {
      const res = await request(app)
        .get('/api/v1/${modelName}')
        .set('Authorization', invalidToken);

      expect(res.statusCode).toEqual(403);
    });
  });

  describe('GET /api/v1/${modelName}/:id - API for get data by id', () => {
    it('should return 200 if token is valid and ID is valid', async () => {
      const res = await request(app)
        .get(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', authId);
    });

    it('should return 401 if token is not found', async () => {
      const res = await request(app).get(\`/api/v1/${modelName}/\${${modelName}Id}\`);

      expect(res.statusCode).toEqual(401);
    });

    it('should return 403 if token is invalid', async () => {
      const res = await request(app)
        .get(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', invalidToken);

      expect(res.statusCode).toEqual(403);
    });

    it('should return 404 if ID is not found', async () => {
      const nonExistentId = 'non_existent_id';
      const res = await request(app)
        .get(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken);

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /api/v1/${modelName}/:id - API for update data by id', () => {
    it('should return 200 if token is valid, ID is valid and request is valid', async () => {
      const res = await request(app)
        .put(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken)
        .send({
          // Fill in with valid data for update
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', authId);
    });

    it('should return 400 if token is valid, ID is valid but request is invalid', async () => {
      const res = await request(app)
        .put(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken)
        .send({
          // Fill with invalid data
        });

      expect(res.statusCode).toEqual(400);
    });

    it('should return 401 if token is not found', async () => {
      const res = await request(app).put(\`/api/v1/${modelName}/\${${modelName}Id}\`).send({
        // Fill in with valid data
      });

      expect(res.statusCode).toEqual(401);
    });

    it('should return 403 if token is invalid', async () => {
      const res = await request(app)
        .put(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', invalidToken)
        .send({
          // Fill in with valid data
        });

      expect(res.statusCode).toEqual(403);
    });

    it('should return 404 if ID is invalid', async () => {
      const res = await request(app)
        .put(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken)
        .send({
          // Fill in with valid data
        });

      expect(res.statusCode).toEqual(404);
    });

    it('should return 409 if data already exists', async () => {
      // Pertama, buat data yang sama sekali
      await request(app)
        .post('/api/v1/${modelName}')
        .set('Authorization', validToken)
        .send({
          // Fill in with valid data
        });

      // Kemudian coba update dengan data yang sama
      const res = await request(app)
        .put(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken)
        .send({
          // Fill with the same data
        });

      expect(res.statusCode).toEqual(409);
    });
  });

  describe('DELETE /api/v1/${modelName}/:id - API for delete data by id', () => {
    it('should return 200 if token is valid and ID is valid', async () => {
      const res = await request(app)
        .delete(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken);

      expect(res.statusCode).toEqual(200);
    });

    it('should return 401 if token is not found', async () => {
      const res = await request(app).delete(\`/api/v1/${modelName}/\${${modelName}Id}\`);

      expect(res.statusCode).toEqual(401);
    });

    it('should return 403 if token is invalid', async () => {
      const res = await request(app)
        .delete(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', invalidToken);

      expect(res.statusCode).toEqual(403);
    });

    it('should return 404 if ID is invalid', async () => {
      const nonExistentId = 'non_existent_id';
      const res = await request(app)
        .delete(\`/api/v1/${modelName}/\${${modelName}Id}\`)
        .set('Authorization', validToken);

      expect(res.statusCode).toEqual(404);
    });
  });
});
`;
};

export default templateCodeJest;
