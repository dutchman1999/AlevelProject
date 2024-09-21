const db = require('../db');

// Retrieve all items from the database
async function getAllItems() {
  try {
    const results = await db.query('SELECT * FROM items');
    return results[0];
  } catch (err) {
    throw err;
  }
}

// Create a new item in the database
async function createItem(item) {
  try {
    const { name, description, title, extra_info, metadata, qty, price, discount, pic1, pic2, pic3, pic4 } = item;
    const sql = `
      INSERT INTO items (name, description, title, extra_info, metadata, qty, price, discount, pic1, pic2, pic3, pic4)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [name, description, title, extra_info, metadata, qty, price, discount, pic1, pic2, pic3, pic4];
    const results = await db.query(sql, values);
    return results.insertId;
  } catch (err) {
    throw err;
  }
}

// Retrieve a specific item by ID from the database
async function getItemById(itemId) {
  try {
    const results = await db.query('SELECT * FROM items WHERE id = ?', [itemId]);
    if (results.length === 0) {
      throw new Error('Item not found');
    }
    return results[0];
  } catch (err) {
    throw err;
  }
}

// Update an item in the database
async function updateItem(itemId, item) {
  try {
    const { name, description, title, extra_info, metadata, qty, price, discount, pic1, pic2, pic3, pic4 } = item;
    const sql = `
      UPDATE items 
      SET name = ?, description = ?, title = ?, extra_info = ?, metadata = ?, qty = ?, price = ?, discount = ?, 
          pic1 = ?, pic2 = ?, pic3 = ?, pic4 = ? 
      WHERE id = ?
    `;
    const values = [name, description, title, extra_info, metadata, qty, price, discount, pic1, pic2, pic3, pic4, itemId];
    const results = await db.query(sql, values);
    return results.affectedRows > 0;
  } catch (err) {
    throw err;
  }
}

// Delete an item from the database
async function deleteItem(itemId) {
  try {
    const results = await db.query('DELETE FROM items WHERE id = ?', [itemId]);
    return results.affectedRows > 0;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
};
