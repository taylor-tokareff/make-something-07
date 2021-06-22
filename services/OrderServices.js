import Order from '../lib/models/Order.js';
import { sendSms } from '../lib/utils/twilio.js';
import pool from '../lib/utils/pool.js';


export default class OrderServices {
  static async create(orderObject) {
    const order = await Order.insert(orderObject);

    await sendSms(
      //   process.env.ORDER_HANDLER_NUMBER,
      `New order received for ${order.quantity}`);
    return order;
  }

  static async insert({ quantity }) {
    const { rows } = await pool.query(
      'INSERT INTO orders (quantity) VALUES ($1) RETURNING *', [quantity]
    );

    return new Order(rows[0]);

  }
}
