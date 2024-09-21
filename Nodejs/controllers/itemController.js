//item controller
const itemModel = require('../models/itemModel');

// Get all items
async function getAllItems(req, res) {
  try {
    const items = await itemModel.getAllItems();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving items from the database.' });
  }
}


// Create a new item
async function createItem(req, res) {
  const { body } = req;
  const newItem = {
    name: body.name ? body.name.trim() : '',
    description: body.description ? body.description.trim() : '',
    title: body.title ? body.title.trim() : '',
    extra_info: body.extra_info ? body.extra_info.trim() : '',
    metadata: ((body || {}).metadata || ''), // Parse metadata as JSON
    qty: body.qty ? parseInt(body.qty, 10) : 0, // Convert qty to integer
    price: body.price ? parseFloat(body.price) : 0, // Convert price to float
    discount: body.discount ? parseFloat(body.discount) : 0, // Convert discount to float
    pic1: body.pic1 ? body.pic1.trim() : '',
    pic2: body.pic2 ? body.pic2.trim() : '',
    pic3: body.pic3 ? body.pic3.trim() : '',
    pic4: body.pic4 ? body.pic4.trim() : ''
  };

  // Check if essential fields are missing or blank
  if (!newItem.name || !newItem.description || !newItem.title) {
    return res.status(400).json({ error: 'Name, description, and title are required fields.' });
  }

  try {
    const itemId = await itemModel.createItem(newItem);
    res.json({ id: itemId, ...newItem }); // Return the ID and details of the newly created item
  } catch (err) {
    console.error('Error creating the item:', err);
    res.status(500).json({ error: 'Error creating the item.' });
  }
}



// Get a specific item by ID
async function getItemById(req, res) {
  const itemId = req.params.id;
  try {
    const item = await itemModel.getItemById(itemId);
    res.json(item);
  } catch (err) {
    res.status(404).json({ error: 'Item not found.' });
  }
}

// Update an item
async function updateItem(req, res) {
  const itemId = req.params.id;
  const updatedItem = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    const success = await itemModel.updateItem(itemId, updatedItem);
    if (!success) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json({ id: itemId, ...updatedItem });
  } catch (err) {
    res.status(500).json({ error: 'Error updating the item.' });
  }
}

// Delete an item
async function deleteItem(req, res) {
  const itemId = req.params.id;
  try {
    const success = await itemModel.deleteItem(itemId);
    if (!success) {
      return res.status(404).json({ error: 'Item not found.' });
    }
    res.json({ message: 'Item deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting the item.' });
  }
}

module.exports = {
  getAllItems,
  createItem,
  getItemById,
  updateItem,
  deleteItem,
};
