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

  static async findById(id) {
    const { rows } = await pool.query(`
      SELECT *
      FROM orders
      WHERE id = $1
  `, [id]);
    if (!rows[0]) return null;

    return new Order(rows[0]);

  }

  static async findAll() {
    const { rows } = await pool.query(`
      SELECT * from orders
    `);
    return rows.map(row => new Order(row));
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE FROM orders
      WHERE id = $1
      RETURNING *`,
      [id]
    );
    return new Order(rows[0]);
  }



}

export default Order;
