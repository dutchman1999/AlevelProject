const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get all items in the cart
router.get('/cart', cartController.getCartItems);

// Get a specific item in the cart by ID
router.get('/cart/:id', cartController.getCartItemById);  // <-- Add this line

// Add an item to the cart
router.post('/cart', cartController.addItemToCart);

// Update an item in the cart
router.put('/cart/:id', cartController.updateCartItem);

// Delete an item from the cart
router.delete('/cart/:id', cartController.deleteCartItem);

module.exports = router;