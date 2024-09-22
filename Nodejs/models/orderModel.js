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

// Create a new order in the database
async function createOrder(orderData) {
  const { fullname, email, mobile, address, itemlist } = orderData;
  const itemListJson = JSON.stringify(itemlist); // Convert itemlist array to JSON
  const sql = 'INSERT INTO orders (fullname, email, mobile, address, itemlist) VALUES (?, ?, ?, ?, ?)';
  
  try {
    const results = await db.query(sql, [fullname, email, mobile, address, itemListJson]);
    return { id: results.insertId, ...orderData };
  } catch (err) {
    throw err;
  }
}

// Update an existing order in the database
async function updateOrder(orderId, orderData) {
  const { fullname, email, mobile, address, itemlist } = orderData;
  const itemListJson = JSON.stringify(itemlist); // Convert itemlist array to JSON
  const sql = 'UPDATE orders SET fullname = ?, email = ?, mobile = ?, address = ?, itemlist = ? WHERE id = ?';

  try {
    const results = await db.query(sql, [fullname, email, mobile, address, itemListJson, orderId]);
    return results.affectedRows > 0 ? { id: orderId, ...orderData } : null;
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
  createOrder,
  updateOrder,
  deleteOrder,
};