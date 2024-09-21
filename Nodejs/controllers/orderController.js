const orderModel = require('../models/orderModel');

// Get all orders
async function getAllOrders(req, res) {
  try {
    const orders = await orderModel.getAllOrders();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving orders from the database.' });
  }
}

// Get a specific order by ID
async function getOrderById(req, res) {
  const orderId = req.params.id;
  try {
    const order = await orderModel.getOrderById(orderId);
    res.json(order);
  } catch (err) {
    res.status(404).json({ error: 'Order not found.' });
  }
}

// Delete an order
async function deleteOrder(req, res) {
  const orderId = req.params.id;
  try {
    const success = await orderModel.deleteOrder(orderId);
    if (!success) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the order.' });
  }
}

module.exports = {
  getAllOrders,
  getOrderById,
  deleteOrder,
};