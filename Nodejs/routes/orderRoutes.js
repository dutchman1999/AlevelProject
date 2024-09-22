const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders
router.get('/orders', orderController.getAllOrders);

// Get a specific order by ID
router.get('/orders/:id', orderController.getOrderById);

// Create a new order
router.post('/orders', orderController.createOrder);

// Update an order
router.put('/orders/:id', orderController.updateOrder);

// Delete an order
router.delete('/orders/:id', orderController.deleteOrder);

module.exports = router;