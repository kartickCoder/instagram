import "./login.css";
import socialDesktop from "./images/social-desktop.PNG";
import socialMobile from "./images/social-mobile.PNG";
import logo from "./images/logo.PNG"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import swal from 'sweetalert2'
import { API_BASE_URL } from "./config";
import { json } from "react-router-dom";
import { useSelector } from "react-redux";


const Bootstrap = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    console.log(user)
    const login = async (event) => {
        event.preventDefault()
        setLoading(true)
        const requestData = { email, password }
        await axios.post(`${API_BASE_URL}/login`, requestData)
            .then((data) => {
                console.log(data)
                if (data) {
                    setLoading(false)
                    localStorage.setItem("token", data.data.mydata.token)
                    localStorage.setItem("user", JSON.stringify(data.data.mydata.userInfo))
                    dispatch({ type: "LOGIN_SUCCESS", payload: data.data.mydata.userInfo })
                    setLoading(false)
                    navigate("/profile")
                    swal.fire({
                        icon: 'success',
                        title: 'user successfully logged in'
                    })
                }
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                swal.fire({
                    icon: 'error',
                    title: error.response.data
                })
            })
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" href="#"><img src={logo} /></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="http://localhost:3000/contactus">Contact Us</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <i className="fa-solid fa-magnifying-glass fa-2x me-5 mt-1"></i>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container login-container">
                <div className="row">
                    <div className="col-md-7 col-xs-12 col-sm-12 d-flex justify-content-center align-items-center">
                        <img src={socialDesktop} className="img-h" />
                        <img src={socialMobile} className="img-s" />
                    </div>
                    <div className="col-md-5 col-xs-12 col-sm-12 mt-5">
                        <div className="card shadow">
                            {loading ? <div className="spinner-border text-primary mx-auto" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : ''}
                            <div className="card-body">
                                <h4 className="card-title text-center fw-bold mt-3">Login</h4>
                            </div>
                            <form className="m-md-4 m-xs-0 m-sm-0" onSubmit={(e) => login(e)}>
                                <div className="col-xs-12 col-sm-12">
                                    <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control input-bg form1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email Id or Mobile No" />
                                </div>
                                <div className="col-xs-12 col-sm-12 form2">
                                    <input type="password" onChange={(event) => setPassword(event.target.value)} style={{ display: "block", width: "100%" }} className="form-control input-bg form2" id="exampleInputPassword1" placeholder="password" />
                                </div>
                                <div className="d-grid mt-2"><button type="submit" className="btn-custom btn-lg">Log In</button></div>
                            </form>
                            <hr className="text-muted"></hr>
                            <h5 className="text-center">OR</h5>
                            <hr className="text-muted"></hr>
                            <button className="btn-white pb-3"><span className="text-center">Dont have an account <a className="text-info fw-bold fs-0.75 uline" href="http://localhost:3000/signup">Sign Up</a></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Bootstrap;