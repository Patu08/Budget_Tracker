import React from "react";
import { Link, Outlet } from "react-router-dom";
import { toast } from "react-toastify";


export default function Sidebar() {
    

    function logoutt(){
        toast.warning("logout successfully")
        localStorage.removeItem("user");
        localStorage.removeItem("pass");
        
        
    }


    return (
        <><br /><br />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <ul className="list-unstyled">
                           <li className="border-bottom" ><Link to={"/dashboard"}><button className="btn shadow-none "><i className="fa-solid fa-house fa-lg me-3 "></i>Dashboard</button></Link> </li>
                           <li className="border-bottom">  <Link to={"/total"}><button className="btn shadow-none"><i className="fa-solid fa-indian-rupee-sign fa-lg me-3"></i>Total</button></Link></li>
                           <li className="border-bottom"> <Link to={"/addfinance"}><button className="btn shadow-none "><i className="fa-solid fa-chart-line fa-lg me-3"></i>Add Finance</button></Link> </li>
                           <li className="border-bottom"> <Link to={"/"}><button className="btn shadow-none " onClick={() => logoutt()}> <i className="fa-solid fa-right-from-bracket fa-lg me-3"></i>Logout</button></Link> </li>  
                        </ul>
                    </div>
                    <div className="col-lg-10" >
                                <Outlet/>    
                    </div>
                </div>
            </div>
        </>
    )
}