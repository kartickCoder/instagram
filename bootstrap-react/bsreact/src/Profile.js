import React, { useEffect } from 'react'
import "./card.css"
import Bootstrap from './Bootstrap';
import logo from "./images/logo.PNG"
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2';
import { API_BASE_URL } from "./config";
import { useDispatch, useSelector } from 'react-redux';
const Profile = () => {
  const user = useSelector(state => state.userReducer)
  const [show, setShow] = useState(false);
  const [caption, setCaption] = useState("")
  const [location, setLocation] = useState("")
  const [image, setImage] = useState({ preview: "", data: "" })
  const [postDetail,setPostDetail]= useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [loading, setLoading] = useState(false)
  const [showPost, setShowPost] = useState(false);
  const [myallposts, setMyAllPosts] = useState([])

  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    dispatch({ type: "LOGIN_ERROR" })
    navigate("/login")
  }
  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }
  const showDetail = (post)=>{
    setPostDetail(post)
  }
  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setImage(img)
  }
  const handleImgUpload = async () => {
    const formData = new FormData()
    formData.append("file", image.data)
    const response = await axios.post(`${API_BASE_URL}/uploadpost`, formData)
    return response
  }
  const addPost = async () => {
    try {
      if (image.preview === "") {
        Swal.fire({
          icon: 'error',
          title: "Add the post"
        })
      }
      else if (caption === '') {
        Swal.fire({
          icon: 'error',
          title: "Add the caption"
        })
      }
      else if (location === '') {
        Swal.fire({
          icon: 'error',
          title: "Add the location"
        })
      }
      else {
        setLoading(true)
        const imgRes = await handleImgUpload()
        console.log(imgRes.data)
        const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }
        const postResponse = await axios.post(`${API_BASE_URL}/createPost`, request, CONFIG_OBJ)
        setLoading(false)
        console.log(myallposts[0].likes.length)
        console.log(postResponse.status)
        if (postResponse.status == 200) {
          navigate("/card")
        }
        else {
          Swal.fire({
            icon: "error",
            title: "some error occurred"
          })
        }
      }
    } catch (error) {
      console.log(error)
    }

  }
  const deletePost = async(_id)=>{
    const deleted = await axios.delete(`${API_BASE_URL}/deletepost/${_id}`,CONFIG_OBJ)
    console.log(deleted.status)
    if(deleted.status==200){
        Swal.fire({
            icon: "warning",
            title: "the post is deleted"
        })
        getAllPost()
        handleClose()
        console.log("deleted")
    }
  }
  const getAllPost = async () => {
    const response = await axios.get(`${API_BASE_URL}/myposts`, CONFIG_OBJ)
    console.log(response)
    if (response.status === 200) {
      setMyAllPosts(response.data)
      console.log(myallposts)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "some error occurred"
      })
    }
  }
  useEffect(() => { getAllPost() }, [])
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-lg-5 col-sm-12 pb-3">
        <div className="container-fluid">
          <a className="navbar-brand ms-lg-5" href="/login"><img src={logo} width="150vh" /></a>
          <form className="d-flex">
            <input className="form-control1 form-control me-5" type="search" placeholder="Search" aria-label="Search" />
            <span className='d-flex'>
              <i className="fa-solid fa-magnifying-glass fa-2x me-4 glass"></i>
              <NavLink style={{ color: "black" }} to="/card"><i className="fa-solid fa-house fa-2x me-4"></i></NavLink>
              <i className="fa-regular fa-heart fa-2x me-4"></i>
              <div className="dropdown">
                <a className="myprofile" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false"><img className="profile-picture me-5" src='https://images.unsplash.com/photo-1693307815317-f457f9b9d1fb?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' /></a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><Link to="/card" className="dropdown-item" type="button">profile</Link></li>
                  <li><Link to="/login" onClick={() => logout()} className="dropdown-item" type="button">logout</Link></li>
                </ul>
              </div>
            </span>
          </form>
        </div>
      </nav>
      <div className="container shadow">
        <div className='row'>
          <div className='col-lg-6 col-12 d-flex flex-column'>
            <img className="profile-image img-fluid p-4" src='https://images.unsplash.com/photo-1693307815317-f457f9b9d1fb?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
            <p className='fw-bold mx-3 fs-5'>{user.user.email}</p>
            <p className='mx-3 fs-5'>UI/UX designer <a href='#' className="profile">@john</a> | follow me <a href='#' className="profile">@john_doe</a></p>
            <p className='mx-3 fs-5'>here is my portfolio page:</p>
            <p className='mx-3 fs-5'><a href='#' className="profile">www.portfolio.com/john</a></p>
          </div>
          <div className='col-lg-6 col-6 d-flex flex-column justify-content-between'>
            <div className="d-flex justify-content-equal">
              <div className="post px-3">
                <h3 className='text-center'>{myallposts.length}</h3>
                <p className='fw-bold fs-3'>Posts</p>
              </div>
              <div className="post px-3">
                <h3 className='text-center'>10</h3>
                <p className='fw-bold fs-3'>Followers</p>
              </div>
              <div className='px-3'>
                <h3 className='text-center'>10</h3>
                <p className='fw-bold fs-3'>Following</p>
              </div>
            </div>
            <div className='row'>
              <div className='d-flex my-3 mybutton'>
                <button className='btn btn-lg col-lg-4 btn-outline-dark btn-block mx-2 col-12 fs-5'>Edit Profile</button>
                <button className='btn btn-lg col-lg-4 btn-outline-dark btn-block col-12 fs-5' onClick={handlePostShow}>Upload Post</button>
              </div>
            </div>
          </div>
        </div>
        <div className='mb-5'>
          <hr />
        </div>
      </div>
      <div className='container shadow'>
        <div className='row'>
          <div className='col col-12 col-lg-4 my-2'>
            {myallposts.map((post) => {
              console.log(post)
              return (
                <div className="card mb-2" onClick={handleShow}>
                  <img className="card-img-top" onClick={()=>showDetail(post)} src= {post.image}/>
                </div>
              )
            })}
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="lg"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className="col-lg-6">
                <div id="carouselExampleIndicators" className="carousel slide">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={postDetail.image} className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="https://images.unsplash.com/photo-1471899236350-e3016bf1e69e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." />
                    </div>
                    <div className="carousel-item">
                      <img src="https://plus.unsplash.com/premium_photo-1675807480763-4ae9d850657d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100" alt="..." />
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="col-lg-6">
                <div className='container-fluid'>
                  <div className='row'>
                    <div className='col-6 d-flex'>
                      <img className="profile-pic p-2" src='https://images.unsplash.com/photo-1693307815317-f457f9b9d1fb?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                      <div className='mt-2'>
                        <p className='fs-6 fw-bold'>{postDetail.location}</p>
                        <p className='location'>{postDetail.description}</p>
                      </div>
                      <div className="dropdown">
                        <button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <span className='p-5'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwuhg04Uq8TvPb8E2GtRtmfbHIPjGYpQZJA&usqp=CAU" className='moreicon1' /></span>
                        </button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#"><i className="fa-regular fa-pen-to-square p-2"></i>Edit Post</a></li>
                          <li><a className="dropdown-item" onClick={()=>deletePost(postDetail._id)} href="#"><i className="fa-solid fa-trash p-2"></i>Delete Post</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className='row ms-2 pt-1'>
                      <p>2 hours ago</p>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-12 ms-3'>
                      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                    </div>
                  </div>
                  <div className='row pe-3 pb-2'>
                    <div className='col-6 d-flex'>
                      <i className="fa-regular fa-heart ms-3 fa-2x mx-2"></i>
                      <i className="fa-regular fa-comment fa-2x mx-2"></i>
                      <i className="fa-solid fa-location-arrow fa-2x mx-2"></i>

                    </div>
                    <div className='col-12 ms-3 pt-3'>
                      <b>{} likes</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

        </Modal>

        <Modal
          show={showPost}
          onHide={handlePostClose}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <span className='fs-5 fw-bold'>Upload Post</span>
          </Modal.Header>
          <Modal.Body>
            <div className='row'>
              <div className='col col-md-6 col-sm-12'>
                <div className='rect-box d-flex justify-content-center'>
                  <div className="dropZoneContainer">
                    <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                    <div className="dropZoneOverlay"><i className="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer</div>
                    {/* if image.preview exists then place the img tag */}
                    {image.preview && <img src={image.preview} width='100' height='100' />}
                  </div>
                </div>
              </div>
              <div className='col col-md-6 col-sm-12 d-flex flex-column justify-content-between'>
                <div className='row'>
                  <div className='col col-12'>
                    <textarea onChange={(event) => setCaption(event.target.value)} className="form-control pad" placeholder="Add Caption" id="floatingTextarea"></textarea>
                  </div>
                  <div className='col col-12'>
                    <div className="form-floating mt-3">
                      <input type="email" onChange={(event) => setLocation(event.target.value)} className="form-control" id="floatingInput" placeholder="name@example.com" />
                      <label for="floatingInput"><i className="fa-solid fa-location-dot mx-2"></i>Location</label>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col col-12 mb-2 me-2'>
                    {loading ? <div className="spinner-border text-primary mx-auto" role="status">
                      <span className="sr-only">Loading...</span>
                    </div> : ''}
                    <button onClick={() => addPost()} className='btn btn-custom-pink float-end'>Post</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

        </Modal>
      </div>
    </>
  )
}

export default Profile;