import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function Login() {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    

    let navigate = useNavigate();

    function handleSubmit() {
        if (user === "admin" && pass === "admin") {     
            localStorage.setItem("user", user);
            localStorage.setItem("pass", pass);
            toast.success("login successfully")
            navigate('/dashboard');
        } else {
            toast.error('Invalid username or password');
        }
    }

    useEffect(() => {
        const x = localStorage.getItem("user");
        if (x === "admin") {
            navigate("/dashboard");
        }
    }, [navigate]);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-lg-3 col-md-6 mt-4 mt-lg-0 ">
                        <div className="card shadow login">
                            <div className="card-header">
                                <h2 className="text-center login-title">Login</h2>
                                <div className="form-floating mt-5">
                                    <input
                                        type="text"
                                        placeholder="Enter User Name"
                                        className="form-control shadow"
                                        id="user"
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                    <label className="form-label login-label">USERNAME</label>
                                </div>
                                <br />
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        placeholder="Enter Password"
                                        className="form-control shadow"
                                        id="pass"
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <label className="form-label login-label">PASSWORD</label>
                                </div>
                                <center>
                                    <div className="mt-4 mb-5 ">
                                        <button className="btn btn-danger w-100" onClick={handleSubmit}>SUBMIT</button>
                                    </div>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
