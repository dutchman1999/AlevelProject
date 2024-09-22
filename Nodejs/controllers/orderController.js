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

// Create a new order
async function createOrder(req, res) {
  const { fullname, email, mobile, address, itemlist } = req.body;
  try {
    const newOrder = await orderModel.createOrder({ fullname, email, mobile, address, itemlist });
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: 'Error creating the order.' });
  }
}

// Update an order
async function updateOrder(req, res) {
  const orderId = req.params.id;
  const { fullname, email, mobile, address, itemlist } = req.body;
  try {
    const updatedOrder = await orderModel.updateOrder(orderId, { fullname, email, mobile, address, itemlist });
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Error updating the order.' });
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
  createOrder,
  updateOrder,
  deleteOrder,
};