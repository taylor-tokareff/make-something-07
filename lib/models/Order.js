import pool from '../utils/pool.js';

class Order {
  id;
  quantity;

  constructor(row) {
    this.id = row.id;
    this.quantity = row.quantity;
  }
  static async insert({ quantity }) {
    const { rows } = await pool.query(`
  INSERT INTO orders (quantity)
  VALUES ($1) 
  RETURNING *
`, [quantity]);
    return new Order(rows[0]);

  }





}

export default Order;
