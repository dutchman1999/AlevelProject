
import { HashRouter, Routes, Route,Link } from "react-router-dom";
import MyDashboard from "./dashboard";
import NewProduct from "./newproduct";
import ProductList from "./productlist";
import OrderList from "./orders";

const AdminApp = () =>{

    return(
        <HashRouter>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-3">
                <div className="container">
                    <a className="navbar-brand">
                        <i className="fa fa-shopping-bag fa-lg"></i> Seller CRM
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item me-4">
                            <Link className="nav-link active" to="/adminLogin"> <i className="fa fa-dashboard"></i> Dashboard </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link active" to="/newproduct"> <i className="fa fa-plus"></i> New Product </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link active" to="/productlist"> <i className="fa fa-suitcase"></i> Product List </Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link active" to="/orderlist"> <i className="fa fa-headset"></i> Order List </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-warning"  onClick={logout}> Welcome {localStorage.getItem("sellername")} <i className="fa fa-power-off"></i> Logout </Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav> 

            <Routes>
                <Route exact path="/adminLogin" element={ <MyDashboard/> }/>
                <Route exact path="/newproduct" element={ <NewProduct/> }/>
                <Route exact path="/productlist" element={ <ProductList/> }/>
                <Route exact path="/orderlist" element={ <OrderList/> }/>
            </Routes>
        </HashRouter>
    )
}

export default AdminApp;

const logout = ()=>{
    localStorage.clear();
    window.location.reload();
    window.location.href = '/';
}