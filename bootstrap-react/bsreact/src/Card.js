import React, { useEffect, useState } from 'react'
import './card.css'
import axios from 'axios'
import { Link, NavLink, redirect, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from './config'
import Swal from 'sweetalert2';
const Card = (props) => {
    let like_var = false
    const [likes, setLikes] = useState(false)
    const [comment, setComment] = useState("")
    const [showcomment,setShowcomment] = useState([])
    const [submit, setSubmit] = useState(false)
    const [dislikes, setDislikes] = useState(false)
    const [commentbox, setCommentbox] = useState(false)
    const [MyAllPosts, setMyAllPosts] = useState([])
    const navigate = useNavigate()
    const CONFIG_OBJ = {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }
    const mycomment = async (_id) => {
        const comnt = {_id, comment}
        const cmts = await axios.put(`${API_BASE_URL}/comment`, comnt, CONFIG_OBJ)
        setShowcomment([...showcomment,cmts])
        console.log(showcomment)
        setCommentbox(false)
        getAllPost()
        return setSubmit(true)
    }
    const unlike = async (_id) => {
        const postid = { _id: _id }
        const disliked = await axios.put(`${API_BASE_URL}/unlike`, postid, CONFIG_OBJ)
        if (disliked.status == 200) {
            await getAllPost()
            console.log("disliked")
            setDislikes(true)
            console.log(disliked)
        }
    }
    const like = async (_id) => {
        const postid = { _id: _id }
        const liked = await axios.put(`${API_BASE_URL}/like`, postid, CONFIG_OBJ)
        if (liked.status == 200) {
            await getAllPost()                                                          //8927638599 --  9475244332
            console.log("liked")
            setLikes(true)
            console.log(likes)
        }
    }
    const deletePost = async (_id) => {
        const deleted = await axios.delete(`${API_BASE_URL}/deletepost/${_id}`, CONFIG_OBJ)
        console.log("deleted")
        if (deleted.status == 200) {
            Swal.fire({
                icon: "warning",
                title: "the post is deleted"
            })
            getAllPost()
        }
    }
    const getAllPost = async () => {
        const response = await axios.get(`${API_BASE_URL}/allposts`, CONFIG_OBJ)
        console.log(response)
        if (response.status === 200) {
            setMyAllPosts(response.data)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "some error occurred"
            })
        }
    }
    const submitComment = (e) => {
        e.preventDefault()
        mycomment(props.postData._id)
        const scb = setCommentbox(false)
        const sbmt = setSubmit(true)
        return {scb,sbmt}
    }
    const commentSection = (e) =>{
        setCommentbox(true)
        console.log(props.postData)
    }
    return (
        <>
            <div className='card shadow m-2 container-fluid'>
                <div className='row'>
                    <div className='col-6 d-flex'>
                        <img className="profile-pic p-2" src='https://images.unsplash.com/photo-1693307815317-f457f9b9d1fb?q=80&w=1433&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                        <div className='mt-2'>
                            <p className='fs-6 fw-bold'>{props.postData.author.name}</p>
                            <p className='location'>{props.postData.description}</p>
                        </div>
                    </div>
                    {props.postData.author._id == JSON.parse(localStorage.getItem("user"))._id ? <div className='col-6'>
                        <span className='float-end mt-3 mx-2'><img onClick={() => deletePost(props.postData._id)} className='moreicon' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJwuhg04Uq8TvPb8E2GtRtmfbHIPjGYpQZJA&usqp=CAU" /></span>
                    </div> : ""}
                </div>
                <div className='row'>
                    <div className='col-12'>
                        <img className='img-fluid p-2 image-style' src={props.postData.image} />
                    </div>
                </div>
                <div className='row pe-3 pb-2'>
                    <div className='col-6 d-flex'>
                        <a onClick={() => like(props.postData._id)}>{!likes ? <i className="fa-regular fa-heart ms-3 fa-2x mx-2"></i> : <i className="fa-solid fa-heart  ms-3 fa-2x mx-2" style={{ color: "#c10101" }}></i>}</a>
                        <a onClick={()=>commentSection()}><i className="fa-regular fa-comment fa-2x mx-2"></i></a>
                        <a onClick={() => unlike(props.postData._id)}>{!dislikes ? <i class="fa-regular fa-thumbs-down fa-2x mx-2"></i> : <i className="fa-solid fa-thumbs-down fa-2x ms-3 mx-2" style={{ color: "#013693" }}></i>}</a>
                        <i className="fa-solid fa-location-arrow fa-2x mx-2"></i>
                    </div>
                    <div className='col-6'>
                        <span className='fs-5 float-end'><b>{props.postData.likes.length} likes</b></span>
                    </div>
                </div>
                <div className='row ms-2 pt-1'>
                    <span>2 hours ago</span>
                </div>
                {(commentbox) ? <div className='row'>
                            <div className='col-9'>
                                <textarea onChange={(e) => setComment(e.target.value)}></textarea>
                            </div>
                            <div className='col-3'>
                                <button onClick={(e)=>submitComment(e)} className='btn btn-primary'>Submit</button>
                            </div>
                </div> : ""}
                {props.postData.comments.map((com)=>{
                    return(
                        <div className='row'>
                            <div className='col-12'>
                                <span>
                                    <p>{com.commenttext}</p>
                                    <b>{com.Fname}</b>
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Card;