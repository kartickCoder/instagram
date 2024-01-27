import './contact_us.css'
import logo from "./images/logo.PNG"
const Contact_us = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" href="#"><img src={logo} width="150vh"/></a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/login">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="http://localhost:3000/contactus">Contact Us</a>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <i className="fa-solid fa-magnifying-glass fa-2x me-5 mt-1"></i>
                        </form>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="card m-3 col-sm-12">
                        <div className="card-body d-flex justify-content-center">
                            <h5 className="card-title">Contact Us</h5>
                        </div>
                        <form>
                            <div className="mb-3 m-3">
                                <label className="form-label">Full Name</label>
                                <input type="text" className="form-control" required />
                            </div>
                            <div className="mb-3 m-3">
                                <label className="form-label">Contact No</label>
                                <input type="text" className="form-control" required />
                            </div>
                            <div className="mb-3 m-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3 m-3">
                                <label className="form-label">When Can We Reach You?</label>
                                <div className="mb-3">
                                    <select className="form-select form-select-md">
                                        <option selected>The best time to reach</option>
                                        <option>Any time to reach</option>
                                        <option>Only at day time</option>
                                        <option>Only at night time</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 m-3">
                                <label className="form-label mb-3">Enter your query below</label>
                                <textarea className="button mb-3 col-lg-12 col-xs-12"></textarea>
                            </div>
                            <div className="d-flex justify-content-center mb-3"><button type="submit" className="button btn btn-primary col-lg-12 col-xs-12">Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact_us;