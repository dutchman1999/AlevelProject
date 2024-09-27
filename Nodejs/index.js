//index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware


const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Middleware
const app = express();
app.use(cors()); // Use the cors middleware to enable CORS
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

// Routes
// user Routes
app.use('/user', userRoutes);
// order routes
app.use('/api', orderRoutes);
// item routes
app.use('/api', itemRoutes);
// cart routes
app.use('/api', cartRoutes);
// order routes
app.use('/api', orderRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port http://localhost:${PORT}`);
  console.log(` http://localhost:3000/api/items/`);
});
