const db = require('../db');

// Retrieve all items in the cart
async function getCartItems() {
  try {
    const results = await db.query('SELECT * FROM cart');
    return results[0];
  } catch (err) {
    throw err;
  }
}

// Retrieve a specific cart item by ID
async function getCartItemById(itemId) {
  try {
    const results = await db.query('SELECT * FROM cart WHERE userId = ?', [itemId]);
    return results[0][0]; // Assuming `results[0]` contains an array of items, and we return the first match
  } catch (err) {
    throw err;
  }
}

// Add an item to the cart
async function addItemToCart(item) {
  try {
    const { name, description, title, qty, price, discount, pic1, pic2, pic3, pic4, userId } = item;
    const sql = `
      INSERT INTO cart (name, description, title, qty, price, discount, pic1, pic2, pic3, pic4, userId)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, description, title, qty, price, discount, pic1, pic2, pic3, pic4, userId];
    const results = await db.query(sql, values);
    return results.insertId;
  } catch (err) {
    throw err;
  }
}

// Update an item in the cart
async function updateCartItem(itemId, item) {
  try {
    const sql = `
      UPDATE cart SET qty = ? WHERE id = ?
    `;
    const values = [item.qty, itemId];
    const results = await db.query(sql, values);
    return results.affectedRows > 0;
  } catch (err) {
    throw err;
  }
}

// Delete an item from the cart
async function deleteCartItem(itemId) {
  try {
    const results = await db.query('DELETE FROM cart WHERE id = ?', [itemId]);
    return results.affectedRows > 0;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getCartItems,
  getCartItemById, // <-- Export the new function
  addItemToCart,
  updateCartItem,
  deleteCartItem,
};