import dotenv from 'dotenv';
dotenv.config();
import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Order from '../lib/models/Order.js';

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

  test('find an order by id via Get route', async () => {
    const order = await Order.insert({
      quantity: 420
    });

    const res = await request(app).get(`/api/v1/orders/${order.id}`);

    expect(res.body).toEqual(order);

  }
  );

});
