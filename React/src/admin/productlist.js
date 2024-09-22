import { useState, useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import Slider from "react-slick"; // Import the slider
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ProductList = () => {
    let [allproduct, updateProduct] = useState([]);

    const getProduct = () => {
        let url = "https://alevelproject.onrender.com/api/items/";
        fetch(url)
            .then(response => response.json())
            .then(productArray => {
                updateProduct(productArray.reverse());
            });
    };

    useEffect(() => {
        getProduct();
    }, []);

    let [keyword, updateKeyword] = useState("");
    const PER_PAGE = 6;

    const [currentPage, setCurrentPage] = useState(0);

    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage);
    }

    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allproduct.length / PER_PAGE);

    // Slider settings for react-slick
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h2 className="text-center text-primary">
                        Available Products in Stock: {allproduct.length}
                    </h2>
                </div>
                <div className="col-lg-4">
                    <i> Search... </i>
                    <input type="text" className="form-control"
                        onChange={obj => updateKeyword(obj.target.value)} />
                </div>
                {
                    allproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                        // Match keyword with name or price
                        if (product.name.toLowerCase().match(keyword.toLowerCase()) || product.price.toString().match(keyword)) {
                            // Collect the images (pic1, pic2, pic3, pic4) into an array
                            const images = [product.pic1, product.pic2, product.pic3, product.pic4].filter(Boolean);

                            return (
                                <div className="card col-lg-3 m-1" key={index}>
                                    <h5 className="text-info text-center"> {product.name} </h5>

                                    {/* Slider for product images */}
                                    <div className="image-gallery">
                                        {images.length > 0 ? (
                                            <Slider {...settings}>
                                                {images.map((image, imgIndex) => (
                                                    <div key={imgIndex}>
                                                        <img src={image} height="200" width="100%" alt={`Product ${imgIndex + 1}`} />
                                                    </div>
                                                ))}
                                            </Slider>
                                        ) : (
                                            <img src="default-image-url" height="200" width="100%" alt="Product" />
                                        )}
                                    </div>

                                    <p className="mt-3 text-danger"> Rs.{product.price} </p>
                                    <p> {product.description} </p>
                                    <p>Offer: Rs.{product.discount} Available: {product.qty}</p>
                                </div>
                            );
                        }
                    })
                }
            </div>

            {/* Pagination */}
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

export default ProductList;