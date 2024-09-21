
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Mylogin from './login';
import MyHome from "./Home";
import Mycart from "./cart";
import UserLogin from "./UserLogin";
import UserSignup from "./userSignUp";
const UserApp = () => {

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
                                <Link className="nav-link active" to="/cart"> <i className="fa fa-cart"></i> Mycart </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/login"> <i className="fa fa-user-tie"></i> Seller Login </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/signup"> <i className="fa fa-user-plus"></i> Sign Up </Link>
                            </li>
                            <li className="nav-item me-4">
                                <Link className="nav-link active" to="/userLogin"> <i className="fa fa-user-plus"></i> UserLogin </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Routes>
                <Route exact path="/" element={<MyHome />} />
                <Route exact path="/cart" element={<Mycart />} />
                <Route exact path="/login" element={<UserLogin />} />
                <Route exact path="/signup" element={<UserSignup />} />
                <Route exact path="/userLogin" element={<UserLogin />} />
            </Routes>
            <footer className="bg-info text-white p-5 mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <h1 className="text-white">About Us</h1>
                            <p>
                                In this code, I've wrapped the card components inside div elements with the class col-md-4, which means that on medium-sized devices and above, each card will take up 4 out of 12 columns, effectively creating a responsive grid layout. You can adjust the column size as needed for your layout requirements.
                            </p>
                        </div>
                        <div className="col-lg-4">
                            <h4> Contact to support </h4>
                            <p>Mobile no. 9365919622</p>
                            <p> E-mail: sarifkhanngn02@gmail.com </p>
                        </div>
                        <div className="col-lg-4">
                            <h4> Follow us in social media </h4>
                            <p>  <i className="fab fa-facebook fa-lg"></i> www.facebook.com </p>
                            <p>  <i className="fab fa-instagram fa-lg"></i> www.instagram.com </p>
                            <p>  <i className="fab fa-twitter fa-lg"></i> www.twitter.com </p>
                            <p>  <i className="fab fa-linkedin fa-lg"></i> www.linkedin.com </p>

                        </div>
                    </div>

                </div>

            </footer>
        </HashRouter>
    )
}

export default UserApp;