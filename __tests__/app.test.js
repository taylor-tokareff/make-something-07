import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  test('create an order via Post route', async () => {
    const res = await request(app)
      .post('/api/v1/orders')
      .send({ quantity: 420 });
    expect(res.body).toEqual({ id: '1', quantity: 420 });
  }
  );

});
