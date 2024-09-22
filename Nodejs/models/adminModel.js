//usersModel.js
const db = require('../db'); // Make sure to import your database connection

async function createNewAdmin(admin) {
  try {
    const sql = 'INSERT INTO Admin (username, password, phone_number) VALUES (?, ?, ?)';
    const values = [admin.username, admin.password, admin.phone_number];

    const result = await db.query(sql, values);
    const insertId = result[0].insertId;

    console.log('Admin created successfully with ID:', insertId);
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

async function updateAdmin(username, name, email, password, profile_photo, address, phone_number) {
  try {
    const sql = 'INSERT INTO Admin (username, name, email, password, profile_photo, address, phone_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [username, name, email, password, profile_photo, address, phone_number];

    await db.query(sql, values);

    console.log('Admin inserted successfully');
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
}

async function loginAdmin(admin) {
  try {
    const sql = 'SELECT * FROM Admin WHERE phone_number = ? AND isVerified = 1';
    const values = [admin.phoneNumber.phoneNumber];

    const result = await db.query(sql, values);
    return userdata = result[0][0];
  } catch (error) {
    console.error('Error creating Admin:', error);
    throw error;
  }
}


module.exports = {
    createNewAdmin,
    updateAdmin,
    loginAdmin
};
