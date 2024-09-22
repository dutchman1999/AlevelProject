import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  // Function to fetch orders from the API
  const getOrders = async () => {
    try {
      const response = await fetch('https://alevelproject.onrender.com/api/orders');
      const orderData = await response.json();
      setOrders(orderData);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrders(); // Fetch the orders when the component mounts
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Order List</h3>
      <div className="row">
        {orders.length === 0 ? (
          <p className="text-center">No orders available.</p>
        ) : (
          orders.map((order) => (
            <div className="col-lg-6 col-md-12 mb-4" key={order.id}>
              <div className="card h-100">
                <div className="card-header bg-info text-white">
                  Order ID: {order.id}
                </div>
                <div className="card-body">
                  <h5 className="card-title">Customer Details</h5>
                  <p><strong>Name:</strong> {order.fullname}</p>
                  <p><strong>Email:</strong> {order.email}</p>
                  <p><strong>Mobile:</strong> {order.mobile}</p>
                  <p><strong>Address:</strong> {order.address}</p>

                  <h5 className="card-title mt-4">Items Ordered</h5>
                  {order.itemlist.map((item) => (
                    <div key={item.id} className="border-bottom pb-3 mb-3">
                      <h6>{item.name}</h6>
                      <div className="d-flex flex-wrap mb-2">
                        {/* Display item images */}
                        {[item.pic1, item.pic2, item.pic3, item.pic4].map((pic, index) => (
                          <img
                            key={index}
                            src={pic}
                            alt={item.name}
                            height="50"
                            width="60"
                            className="me-2 mb-2"
                          />
                        ))}
                      </div>
                      <p><strong>Price:</strong> ${item.price}</p>
                      <p><strong>Description:</strong> {item.description}</p>
                      <p><strong>Title:</strong> {item.title}</p>
                      <p><strong>Discount:</strong> ${item.discount}</p>
                      <p><strong>Quantity:</strong> {item.qty}</p>
                      <p><strong>Total:</strong> ${(item.price - item.discount) * item.qty}</p>
                    </div>
                  ))}
                </div>
                <div className="card-footer text-center">
                  <strong>Total Items: {order.itemlist.length}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderList;