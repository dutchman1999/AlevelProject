# tiffinbreak-main-2
 

CREATE TABLE cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    title VARCHAR(255) NOT NULL,
    qty INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    pic1 VARCHAR(255),
    pic2 VARCHAR(255),
    pic3 VARCHAR(255),
    pic4 VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    item_id INT NOT NULL,
    qty INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);



Create two components 
userLogin and userSignup 
After sign up it should redirect to login 
https://tiffinbreak-main-2.onrender.com/user/register/
This is the api for signup with a post call
{
    "username": "John",
    "password": "Sarif@123",
    "phoneNumber": 9365919511
}
After successful signup it returns
{
    "insertId": 5,
    "message": "User Created successfully"
}

Login api
https://tiffinbreak-main-2.onrender.com/user/login/

Post call with 
{
    "password": "Sarif@123",
    "phoneNumber": 9365919511
}

After successful signing Returns 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTcyNjkwODA2NiwiZXhwIjoxNzI2OTExNjY2fQ.hMmVzJxcyXeg63TxDZZb5D8ZUyurs5TaqrQaaZ-Atlk"
}

