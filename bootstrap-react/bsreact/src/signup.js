import "./signup.css";
import socialDesktop from "./images/social-desktop.PNG";
import socialMobile from "./images/social-mobile.PNG";
import logo from "./images/logo.PNG"
import { useState } from "react";
import axios from 'axios'
import swal from 'sweetalert2'
import { API_BASE_URL } from "./config";
const Signup = () => {
    const [Fname, setFname] = useState("")
    const [Lname, setLname] = useState("")
    const [phone,setPhone] = useState(0)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const signup = async(event) => {
        event.preventDefault()
        setLoading(true)
        const requestData = {phone,Fname,Lname,email,password}
        await axios.post(`${API_BASE_URL}/signup`,requestData)
        .then((data)=>{
            console.log(data.data)
            if(data.data!=="this email id already exists"){
                setLoading(false)
                swal.fire({
                    icon: 'success',
                    title: 'user successfully registered'
                })
            }
            else{
                setLoading(false)
                swal.fire({
                    icon: 'error',
                    title: "this email id already exists"
                })
            }
        })
        .catch((error)=>{
            console.log(error)
            setLoading(false)
            swal.fire({
                icon: 'error',
                title: error.response.data.error
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
                                <h4 className="card-title text-center fw-bold mt-3">Sign Up</h4>
                            </div>
                            <form className="m-md-4 m-xs-0 m-sm-0" onSubmit={(e) => signup(e)}>
                                <div>
                                    <input type="number" className="form-control input-bg" onChange={(event)=> setPhone(event.target.value)} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Phone No" />
                                    <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control input-bg" id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Email Id" />
                                    <input type="text" className="form-control input-bg" onChange={(event) => setFname(event.target.value)} id="exampleInputEmail3" aria-describedby="emailHelp" placeholder="First Name" />
                                    <input type="text" className="form-control input-bg" onChange={(event) => setLname(event.target.value)} id="exampleInputEmail4" aria-describedby="emailHelp" placeholder="Last Name" />
                                </div>
                                <div>
                                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control input-bg" id="exampleInputPassword1" placeholder="password" />
                                    <span><input type="checkbox" /><label>Remember the password</label></span>
                                </div>
                                <div className="d-grid mt-2"><button type="submit" className="btn-custom btn-lg">Sign Up</button></div>
                            </form>
                            <hr className="text-muted"></hr>
                            <h5 className="text-center">OR</h5>
                            <hr className="text-muted"></hr>
                            <button className="btn-white pb-3"><span className="text-center">Already have an account <a className="text-info fw-bold fs-0.75 uline" href="http://localhost:3000/login">Log In</a></span></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Signup;