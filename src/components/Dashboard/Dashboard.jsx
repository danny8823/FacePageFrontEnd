import React, { useState } from 'react'
import Navbar from '../Timeline/Navbar/Navbar'
import './Dashboard.css'
import { Button, Card, Modal } from 'react-bootstrap'
import { useQuery } from '@tanstack/react-query'
import { deletePostAPI, getPostsByAuthorAPI } from '../../services/postServices'
import { useDispatch, useSelector } from 'react-redux'
import UpdateProfile from './UpdateProfile.jsx/UpdateProfile'
import UpdatePassword from './UpdatePassword/UpdatePassword'

const Dashboard = () => {
    const [show,setShow] = useState(false)
    const [show1, setShow1] = useState(false)

    const handleClose = () => setShow(false)
    const handleOpen = () => setShow(true)

    const handleClose1 = () => setShow1(false)
    const handleOpen1 = () => setShow1(true)

    const {user} = useSelector((state) => state?.auth?.user)
    const {data: post, isError, isLoading, error} = useQuery({
        queryFn: () => getPostsByAuthorAPI(user._id),
        queryKey: ['post', user._id]
    })

    const deleteButtonHandler = (id) => {
        deletePostAPI(id)
        window.location.reload()
    }
    
    return (
    <div>
        <Navbar/>
        <div className = 'dashboard-body'>
            <div className = 'profile-card'>
                <img src = {user?.image} alt ='profile'/>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>                
                <Button variant = 'outline-secondary' onClick = {handleOpen}>Update/Edit Profile</Button>
                <Modal show = {show}>
                    <Modal.Header>
                        <Modal.Title>Edit Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateProfile/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'contained' onClick={handleClose}>Close</Button>
                    </Modal.Footer>  
                </Modal>
                <Button variant = 'outline-secondary' onClick = {handleOpen1}>Change Password</Button>
                <Modal show = {show1}>
                    <Modal.Header>
                        <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdatePassword/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant = 'contained' onClick={handleClose1}>Close</Button>
                    </Modal.Footer>  
                </Modal>
                
            </div>
            <div className = 'user-posts-container'>
            {post?.length > 0 ? (
                post.map((item) => (
                    <Card key={item._id} className='dashboard-post-card'>
                        <Card.Title className='card-title-container'>
                            <span>{item.title}</span>
                            <span className='post-date'>{new Date(item.createdAt).toLocaleString()}</span>
                        </Card.Title>
                        <Card.Body className = 'dashboard-post-content'>
                            {item.content}
                        </Card.Body>
                        <Card.Footer>
                            <Button className = 'dash-button' variant='outline-primary' onClick={() => deleteButtonHandler(item._id)}>Delete</Button>
                        </Card.Footer>
                    </Card>
                ))
                ) : (
                <div className = 'user-posts-container'>
                    <h1>No posts....yet</h1>
                </div>
                )}
                {/* {post?.map((item) => (
                    <Card key = {item._id} className = 'dashboard-post-card'>
                        <Card.Title className = 'card-title-container'>
                            <span>
                                {item.title} 
                            </span>
                            <span className = 'post-date'>{new Date(item.createdAt).toLocaleString()}</span>
                        </Card.Title>
                        <Card.Body>
                            {item.content}
                        </Card.Body>
                        <Card.Footer>
                            <Button variant='outline-primary' onClick={()=>deleteButtonHandler(item._id)}>Delete</Button>
                        </Card.Footer>
                    </Card>
               ))} */}
            </div>
        </div>
    </div>
  )
}

export default Dashboard