//usersModel.js
const db = require('../db'); // Make sure to import your database connection

async function createNewUser(user) {
  try {
    const sql = 'INSERT INTO users (username, password, phone_number) VALUES (?, ?, ?)';
    const values = [user.username, user.password, user.phone_number];

    const result = await db.query(sql, values);
    const insertId = result[0].insertId;

    console.log('User created successfully with ID:', insertId);
    return insertId;
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      console.error('Username or phone number already exists');
      throw error;
    } else {
      console.error('Error creating user:', error);
      throw error;
    }
  }
}

async function updateUser(username, name, email, password, profile_photo, address, phone_number) {
  try {
    const sql = 'INSERT INTO users (username, name, email, password, profile_photo, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [username, name, email, password, profile_photo, address, phone_number];

    await db.query(sql, values);

    console.log('User inserted successfully');
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

async function login(user) {
  try {
    const sql = 'SELECT * FROM users WHERE phone_number = ?';
    const values = [user.phoneNumber.phoneNumber];

    const result = await db.query(sql, values);
    return userdata = result[0][0];
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}


module.exports = {
  createNewUser,
  updateUser,
  login
};
