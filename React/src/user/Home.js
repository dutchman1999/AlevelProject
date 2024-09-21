import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Slider from "react-slick";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MyHome = () => {
    const [allproduct, updateProduct] = useState([]);
    const [keyword, updateKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const PER_PAGE = 12;
    const navigate = useNavigate();  // Initialize useNavigate for redirection

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = () => {
        fetch("https://alevelproject.onrender.com/api/items")
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            });
    };

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    };

    const addtoCart = (product) => {
        const token = sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("userId");

        // Check if user is logged in (token and userId exist)
        if (token && userId) {
            const cartProduct = { 
                ...product, 
                qty: 1, 
                userId  // Add userId to the product data
            };

            fetch("https://alevelproject.onrender.com/api/cart", {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // Pass token in the headers for authorization
                },
                method: "POST",
                body: JSON.stringify(cartProduct)
            })
            .then(response => response.json())
            .then(() => {
                swal(product.name, "Added to Cart Successfully!", "success", { timer: 1500 });
            })
            .catch(error => {
                console.error('Error adding to cart:', error);
                swal("Error", "Could not add to cart. Please try again.", "error");
            });
        } else {
            // If token or userId is missing, redirect to login page
            swal("Please login!", "You need to log in to add items to your cart.", "warning");
            navigate('/login');  // Redirect to login page
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-12 mb-4">
                    <div className="input-group">
                        <label className="input-group-text"> <i className="fa fa-search"></i> </label>
                        <input 
                            type="text" 
                            className="form-control"
                            onChange={e => updateKeyword(e.target.value)} 
                            placeholder="Search...." 
                        />
                    </div>
                </div>
                {allproduct.slice(offset, offset + PER_PAGE)
                    .filter(product => 
                        product.name.toLowerCase().includes(keyword.toLowerCase()) || 
                        product.price.toString().includes(keyword)
                    )
                    .map((product, index) => {
                        const images = [product.pic1, product.pic2, product.pic3, product.pic4].filter(Boolean);
                        return (
                            <div className="col-lg-3 mb-4 p-4" key={index}>
                                <div className="card p-4">
                                    <h5 className="text-info text-center mb-3">{product.name}</h5>
                                    <div className="image-gallery">
                                        {images.length > 0 ? (
                                            <Slider {...settings}>
                                                {images.map((image, imgIndex) => (
                                                    <div key={imgIndex}>
                                                        <img src={image} height="130" width="100%" alt={`Product ${imgIndex + 1}`} />
                                                    </div>
                                                ))}
                                            </Slider>
                                        ) : (
                                            <img src="default-image-url" height="130" width="100%" alt="Product" />
                                        )}
                                    </div>
                                    <p className="mt-3 text-danger">Rs.{product.price}</p>
                                    <p>{product.description}</p>
                                    <p>Offer: Rs.{product.discount} Available: {product.qty}</p>
                                    <p className="text-center">
                                        <button onClick={() => addtoCart(product)} className="btn btn-primary btn-sm">
                                            <i className="fa fa-plus"></i> Add to Cart
                                        </button>
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>
        </div>
    );
}

export default MyHome;