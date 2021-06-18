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

  test('finds all orders via GET route', async () => {

    const order1 = await Order.insert({
      quantity: 10
    });
    const order2 = await Order.insert({
      quantity: 5
    });
    const order3 = await Order.insert({
      quantity: 4
    });

    const res = await request(app).get('/api/v1/orders');
    expect(res.body).toEqual([order1, order2, order3]);
  });

  test('deletes cat1', async () => {
    const order1 = await Order.insert({
      quantity: 10
    });

    const res = await request(app).delete(`/api/v1/orders/${order1.id}`);

    expect(res.body).toEqual(order1);

  });

  test('it updates an order', async () => {
    const order1 = await Order.insert({
      quantity: 10
    });
    const order2 = await Order.insert({
      quantity: 5
    });

    const res = await request(app).put(`/api/v1/orders/${order1.id}`).send(order2);
    expect(res.body).toEqual(order2);
  });

});
