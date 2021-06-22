import { Router } from 'express';
import OrderServices from '../../services/OrderServices.js';
import Order from '../models/Order.js';

export default Router()
  .post('/api/v1/orders', async (req, res) => {
    try {
      //when passing a key value it need req.body
      //if you are passing it a param like id then it needs req.params.id
      const order = await OrderServices.create(req.body);
      res.send(order);
    }
    catch (err) {
      res.status(500).send({ error: err.message });

    }

  })

  .get('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      res.send(order);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/orders', async (req, res) => {
    try {
      const order = await Order.findAll();
      res.send(order);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.delete(req.params.id);
      res.send(order);
    }
    catch (err) {
      res.send(500).send({ error: err.message });
    }
  })

  .put('/api/v1/orders/:id', async (req, res) => {
    try {
      const order = await Order.put(req.body.quantity, req.params.id);
      res.send(order);
    }
    catch (err) {
      res.status(500).send({ error: err.message });
    }

  });






