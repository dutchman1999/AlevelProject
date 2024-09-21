import { useState, useEffect } from "react";
import swal from "sweetalert";

const MyCart = () => {
    const [allProduct, setAllProduct] = useState([]);
    const usersId = sessionStorage.getItem("userId");
    // Fetch all cart items
    const getProduct = () => {
        let url = `https://tiffinbreak-main-2.onrender.com/api/cart?userId=${usersId}`;
        fetch(url)
            .then(response => response.json())
            .then(productArray => {
                setAllProduct(productArray.reverse()); // Reverse to show newest items first
            })
            .catch(error => {
                console.error("Error fetching cart items:", error);
                swal("Error", "Failed to load cart items", "error");
            });
    };

    useEffect(() => {
        getProduct();
    }, []);

    // Delete a product from the cart
    const deleteCart = (pid) => {
        let url = `http://localhost:3000/api/cart/${pid}`;
        console.log(url);
        fetch(url, { method: "DELETE" })
            .then(response => {
                if (response.status === 404) {
                    throw new Error("Item not found");
                }
                if (!response.ok) {
                    throw new Error("Failed to delete item");
                }
                return response.json();
            })
            .then(() => {
                setAllProduct(prevProducts => prevProducts.filter(product => product.id !== pid));
                swal("Deleted", "Item removed from cart", "success");
            })
            .catch(error => {
                console.error("Error deleting cart item:", error);
                swal("Error", "Failed to remove item from cart", "error");
            });
    };

    // Update quantity of a product in the cart
    const updateQty = async (product, action) => {
        console.log("Updating product with ID:", product.id); // Log the product ID

        const url = `http://localhost:3000/api/cart/${product.id}`;
        console.log(url);
        
        const updatedQty = action === "A" ? product.qty + 1 : product.qty - 1;

        if (updatedQty < 1) {
            swal("Warning", "Quantity cannot be less than 1", "warning");
            return;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qty: updatedQty }),
            });

            if (response.status === 404) {
                throw new Error("Product not found");
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const updatedProduct = await response.json();
            setAllProduct(prevProducts => prevProducts.map(p => p.id === product.id ? { ...p, qty: updatedQty } : p));
        } catch (error) {
            console.error("Error updating product:", error);
            swal("Error", "Failed to update quantity", "error");
        }
    };

    // Handle placing an order
    const [fullname, setFullname] = useState("");
    const [mobileno, setMobileno] = useState("");
    const [emailid, setEmailid] = useState("");
    const [address, setAddress] = useState("");

    const save = () => {
        let orderData = { fullname, email: emailid, mobile: mobileno, address, itemlist: allProduct };
        let url = "http://localhost:3000/api/orders/";

        fetch(url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to place order");
            }
            return response.json();
        })
        .then(() => {
            swal("Order Received", "We have received your order", "success", { timer: 1300 });
            setAllProduct([]); // Clear the cart after successful order
        })
        .catch(error => {
            console.error("Error placing order:", error);
            swal("Error", "Failed to place order", "error");
        });
    };

    return (
        <div className="container mt-4">
            <div className="row">
                {/* Customer Details */}
                <div className="col-lg-3 col-md-6">
                    <div className="card mb-3">
                        <div className="card-header bg-info text-white">Customer Details</div>
                        <div className="card-body">
                            <div className="mb-4">
                                <label>Customer Name</label>
                                <input type="text" className="form-control" onChange={e => setFullname(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label>Customer Mobile No</label>
                                <input type="number" className="form-control" onChange={e => setMobileno(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label>Customer e-Mail id</label>
                                <input type="text" className="form-control" onChange={e => setEmailid(e.target.value)} />
                            </div>
                            <div className="mb-4">
                                <label>Customer Address</label>
                                <textarea className="form-control" onChange={e => setAddress(e.target.value)}></textarea>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" onClick={save}>Place Order</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cart Items */}
                <div className="col-lg-9 col-md-6">
                    <h3 className="text-center mb-3">{allProduct.length} : Items in Cart</h3>
                    <div className="row">
                        {allProduct.map((product) => (
                            <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <div className="d-flex flex-wrap">
                                            {[product.pic1, product.pic2, product.pic3, product.pic4]
                                                .filter(Boolean)
                                                .map((pic, imgIndex) => (
                                                    <img
                                                        key={imgIndex}
                                                        src={pic}
                                                        alt={`${product.name} - ${imgIndex + 1}`}
                                                        height="50"
                                                        width="60"
                                                        onError={(e) => e.target.src = 'https://via.placeholder.com/60'}
                                                        className="me-2 mb-2"
                                                    />
                                                ))}
                                        </div>
                                        <p className="card-text">Price: ${product.price}</p>
                                        <p className="card-text">Details: {product.description}</p>
                                        <p className="card-text">Offer: ${product.discount}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <button className="btn btn-warning btn-sm me-2" onClick={() => updateQty(product, "B")}> - </button>
                                                {product.qty}
                                                <button className="btn btn-info btn-sm ms-2" onClick={() => updateQty(product, "A")}> + </button>
                                            </div>
                                            <p className="mb-0">Total: ${(product.price * product.qty).toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className="card-footer text-center">
                                        <button className="btn btn-danger btn-sm" onClick={() => deleteCart(product.id)}>
                                            <i className="fa fa-trash"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCart;