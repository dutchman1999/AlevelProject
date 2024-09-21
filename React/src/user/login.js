
import { useState } from "react";
import swal from "sweetalert";

const Mylogin = () =>{
    let[email, pickEmail] = useState("");
    let[password, pickPassword] = useState("");

    const gologin = () =>{
        if( email=="" || password =="" ){
            swal("Invalid Input", "Empty e-Mail Or Password", "warning");
        }else{
            let url = "http://localhost:1234/account?email="+email+"&password="+password;
            fetch(url)
            .then(response=>response.json())
            .then(credentials=>{
                if (credentials.length > 0) {
                    localStorage.setItem("sellerid", credentials[0].id);
                    localStorage.setItem("sellername", credentials[0].fullname);
                    window.location.reload();
                } else {
                    swal("Invalid","Invalid or not exist", "warning");
                }
            })
        }
    }

    return(
        <div className="container mt-4">
            <div className="row">
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                    <div className="card border-0 shadow-lg">
                        <div className="card-header bg-primary text-white"> Login </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label> e-Mail Id </label>
                                <input type="email" className="form-control"  onChange={obj=>{pickEmail(obj.target.value)}} />
                            </div>
                            <div className="mb-3">
                                <label> Password </label>
                                <input type="password" className="form-control" onChange={obj=>{pickPassword(obj.target.value)}} />
                            </div>
                        </div>
                        <div className="card-footer text-center">
                            <button className="btn btn-danger" onClick={gologin}> 
                                Login <i className="fa fa-arrow-right"></i> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}

export default Mylogin;
