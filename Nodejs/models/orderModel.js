const db = require('../db');

// Retrieve all orders from the database
async function getAllOrders() {
  try {
    const results = await db.query('SELECT * FROM orders');
    return results[0];
  } catch (err) {
    throw err;
  }
}

// Retrieve a specific order by ID from the database
async function getOrderById(orderId) {
  try {
    const results = await db.query('SELECT * FROM orders WHERE id = ?', [orderId]);
    if (results.length === 0) {
      throw new Error('Order not found');
    }
    return results[0];
  } catch (err) {
    throw err;
  }
}

// Delete an order from the database
async function deleteOrder(orderId) {
  try {
    const results = await db.query('DELETE FROM orders WHERE id = ?', [orderId]);
    return results.affectedRows > 0;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  deleteOrder,
};