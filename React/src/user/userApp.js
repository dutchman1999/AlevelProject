import { HashRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Mylogin from './login';
import MyHome from "./Home";
import Mycart from "./cart";
import UserLogin from "./UserLogin";
import UserSignup from "./userSignUp";
import swal from "sweetalert";

const UserApp = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check login status based on sessionStorage
    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        setIsLoggedIn(!!userId); // If userId exists, user is logged in
    }, []);

    // Logout function
    const handleLogout = () => {
        sessionStorage.removeItem("userId"); // Remove user ID from sessionStorage
        setIsLoggedIn(false); // Update the login state
        swal("Logged out", "You have successfully logged out", "success");
    };

    return (
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3 sticky-top">
                <div className="container">
                    <a className="navbar-brand">
                        <i className="fa fa-shopping-bag fa-lg"></i> Shop Now
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/"> <i className="fa fa-home"></i> Home </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/cart"> <i className="fa fa-cart"></i> My Cart </Link>
                            </li>

                            {isLoggedIn ? (
                                <>
                                    <li className="nav-item me-4">
                                        <LogoutButton handleLogout={handleLogout} />
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item me-4">
                                        <Link className="nav-link active" to="/login"> <i className="fa fa-user-tie"></i> Seller Login </Link>
                                    </li>
                                    <li className="nav-item me-4">
                                        <Link className="nav-link active" to="/signup"> <i className="fa fa-user-plus"></i> Sign Up </Link>
                                    </li>
                                    <li className="nav-item me-4">
                                        <Link className="nav-link active" to="/userLogin"> <i className="fa fa-user"></i> User Login </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<MyHome />} />
                <Route exact path="/cart" element={<Mycart />} />
                <Route exact path="/login" element={<Mylogin />} />
                <Route exact path="/signup" element={<UserSignup />} />
                <Route exact path="/userLogin" element={<UserLogin />} />
            </Routes>

            <footer className="bg-info text-white p-5 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h1 className="text-white">About Us</h1>
                            <p>
                                In this code, I've wrapped the card components inside div elements with the class col-md-4, which means that on medium-sized devices and above, each card will take up 4 out of 12 columns, effectively creating a responsive grid layout.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <h4> Contact Support </h4>
                            <p>Mobile no. 9365919622</p>
                            <p>Email: sarifkhanngn02@gmail.com </p>
                        </div>
                        <div className="col-lg-4">
                            <h4> Follow us on social media </h4>
                            <p><i className="fab fa-facebook fa-lg"></i> www.facebook.com </p>
                            <p><i className="fab fa-instagram fa-lg"></i> www.instagram.com </p>
                            <p><i className="fab fa-twitter fa-lg"></i> www.twitter.com </p>
                            <p><i className="fab fa-linkedin fa-lg"></i> www.linkedin.com </p>
                        </div>
                    </div>
                </div>
            </footer>
        </HashRouter>
    );
};

// Separate component for the Logout Button
const LogoutButton = ({ handleLogout }) => {
    const navigate = useNavigate();

    const onLogoutClick = () => {
        handleLogout(); // Call the passed logout function
        navigate("/"); // Redirect to the home page
    };

    return (
        <button className="btn btn-danger" onClick={onLogoutClick}>
            <i className="fa fa-sign-out-alt"></i> Logout
        </button>
    );
};

export default UserApp;