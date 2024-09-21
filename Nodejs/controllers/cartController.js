const cartModel = require('../models/cartModel');

// Get all items in the cart
async function getCartItems(req, res) {
  try {
    const items = await cartModel.getCartItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving cart items.' });
  }
}

// Get a cart item by ID
async function getCartItemById(req, res) {
  try {
      const { id } = req.params; // Extract the ID from the request params
      const cartItem = await cartModel.getCartItemById(id); // Find the item by ID

      if (!cartItem) {
          return res.status(404).json({ message: "Cart item not found" });
      }

      res.json(cartItem); // Return the cart item
  } catch (error) {
      console.error("Error fetching cart item:", error);
      res.status(500).json({ message: "Failed to retrieve cart item" });
  }
};

// Add an item to the cart
async function addItemToCart(req, res) {
  const { body } = req;
  try {
    // Ensure userId is present in the request body
    if (!body.userId) {
      return res.status(400).json({ error: 'User ID is required.' });
    }
    const itemId = await cartModel.addItemToCart(body);
    res.json({ id: itemId, ...body });
  } catch (err) {
    res.status(500).json({ error: 'Error adding item to cart.' });
  }
}

// Update an item in the cart
async function updateCartItem(req, res) {
  const itemId = req.params.id;
  const updatedItem = req.body;
  try {
    const success = await cartModel.updateCartItem(itemId, updatedItem);
    if (success) {
      return res.status(202).json({ error: 'Data updated from cart' });
    }
    res.json({ id: itemId, ...updatedItem });
  } catch (err) {
    res.status(500).json({ error: 'Error updating cart item.' });
  }
}

// Delete an item from the cart
async function deleteCartItem(req, res) {
  const itemId = req.params.id;
  try {
    const success = await cartModel.deleteCartItem(itemId);
    if (success) {
      return res.status(200).json({ error: 'Item deleted from cart.' });
    }
    res.json({ message: 'Item deleted from cart successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting item from cart.' });
  }
}

module.exports = {
  getCartItems,
  getCartItemById,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
};