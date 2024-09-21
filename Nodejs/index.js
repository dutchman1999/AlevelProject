const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');
const app = express();
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');


// Middleware
app.use(cors()); // Use the cors middleware to enable CORS
app.use(bodyParser.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong.' });
});

// Routes
// user Routes
app.use('/user', userRoutes );

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
  console.log(`
   http://localhost:3000/api/items/

  for post call:
  url: http://localhost:3000/api/items/
  json:
  {
    "name": "Updated Product Name",
    "description": "Updated product description",
    "title": "Updated Product Title",
    "extra_info": "Updated extra info",
    "metadata": "",
    "qty": 10,
    "price": 29.99,
    "discount": 5,
    "pic1": "https://example.com/updated-pic1.jpg",
    "pic2": "https://example.com/updated-pic2.jpg",
    "pic3": "https://example.com/updated-pic3.jpg",
    "pic4": "https://example.com/updated-pic4.jpg"
  }
  
   http://localhost:3000/user/register/

   {
    "username": "adam",
    "password": "adam123",
    "phoneNumber": 12345
  }

   http://localhost:3000/user/login/
   {
    "password": "adam123",
    "phoneNumber": 12345
    }
  `);
});
