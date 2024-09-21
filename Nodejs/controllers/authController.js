//authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const authController = {};

authController.register = async (req, res) => {
    try {
        const { username, password, phoneNumber } = req.body;

        if (!username || !password || !phoneNumber) {
            return res.status(400).json({ error: 'Please provide username, password, and phone number' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertId = await User.createNewUser({
            username,
            password: hashedPassword,
            phone_number: phoneNumber,
        });
        res.json({ insertId, message : 'User Created successfully'});

        // const token = jwt.sign({ userId: insertId }, 'your_secret_key', { expiresIn: '1h' });
        // res.json({ token });
    } catch (error) {
        console.error('Error during registration:', error);
        if (error.code == 'ER_DUP_ENTRY') {
            res.status(502).json({ error: 'Username or phone number already exists' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

authController.login = async (req, res) => {
    try {
        const { phoneNumber, password } = req.body;

        if (!phoneNumber || !password) {
            return res.status(400).json({ error: 'Please provide phone number and password' });
        }

        const user = await User.login({ phoneNumber: { phoneNumber } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid phone number or password' });
        }

        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        res.json({ token, userId: user.id }); // Include user ID in the response
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = authController;
