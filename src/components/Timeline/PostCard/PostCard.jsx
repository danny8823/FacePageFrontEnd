import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import './PostCard.css'
import PostPage from '../PostPage/PostPage'
import { Button } from '@mui/material'

const PostCard = ({user}) => {
  const [show,setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <div className = 'post-input-body'>
      <div className = 'post-card'>
        <img className = 'post-user-img' src = {user.image} alt = 'user'/>
        <button onClick={handleShow}>Whats on your mind, {user.username}?</button>
      </div>
      <Modal show = {show}>
        <Modal.Header>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostPage user = {user}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant = 'contained' onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}

export default PostCard