import React, { useEffect, useState } from 'react'
import Card from './Card'
import "./card.css"
import logo from "./images/logo.PNG"
import { API_BASE_URL } from "./config";
import axios from 'axios';
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom'
const Postoverview = () => {
    const [allposts,setAllPosts]= useState([])
    const CONFIG_OBJ = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const getAllPost = async() =>{
        console.log("getAllPost")
        const response = await axios.get(`${API_BASE_URL}/allposts`,CONFIG_OBJ)
        if(response.status===200){
            setAllPosts(response.data)
        }
        else{
            Swal.fire({
                icon: "error",
                title: "some error occurred"
            })
        }
    }
    useEffect(()=>{getAllPost()},[])
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow mb-lg-5 col-sm-12 pb-3">
                <div className="container-fluid">
                    <a className="navbar-brand ms-lg-5" href="/login"><img src={logo} width="150vh"/></a>
                    <form className="d-flex">
                        <input className="form-control1 form-control me-5" type="search" placeholder="Search" aria-label="Search" />
                        <span>
                            <i className="fa-solid fa-magnifying-glass fa-2x me-4 glass"></i>
                            <i className="fa-solid fa-house fa-2x me-4"></i>
                            <i className="fa-regular fa-heart fa-2x me-4"></i>
                            <a className="myprofile" href="/profile"><img className="profile-picture mb-3 me-5" src='https://images.unsplash.com/photo-1693307815317-f457f9b9d1fb?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' /></a>
                        </span>
                    </form>
                </div>
            </nav>
            <div className='d-flex row'>
                {allposts.map((post)=>{
                    return(<div className='col-xs-12 col-lg-4'><Card postData={post}/></div>)
                })}
            </div>
        </div>
    );
}

export default Postoverview;