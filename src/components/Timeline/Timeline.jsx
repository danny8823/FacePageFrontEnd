import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import './Timeline.css'
import { getPostsApi } from '../../services/postServices'
import {useQuery} from '@tanstack/react-query'
import Navbar from './Navbar/Navbar'
import PostCard from './PostCard/PostCard'
import {Card,Badge} from 'react-bootstrap'
import { Button } from '@mui/material'

const Timeline = () => {
  const {user} = useSelector((state) => state?.auth?.user)
  const navigate = useNavigate();

  const {data:posts, isError, isLoading, error} = useQuery({
    queryFn: ()=> getPostsApi(),
    queryKey: ['list-posts']
  })

  const goToComment = (_id) => {
    navigate(`/post/${_id}`)
  }

  return (
    <>
    <Navbar/>
      <div className = 'body'>
        <div className = 'left-bar'>
          <Link><img className = 'user-img' src = {user.image} alt = 'face-image'/>{user && user.username ? user.username : 'guest'}</Link>
        </div>
        <div className = 'timeline'>
          {isLoading && <p>Loading posts....</p>}
          {isError && <p>{error.message}</p>}
          <PostCard user = {user}/>
            {posts?.map((post) => (
              <Card key = {post._id} className = 'post'>
                <Card.Header className = 'timeline-card-header'>
                  <div>
                    <img className = 'user-img' src = {user.image} alt = 'face-image'/>
                    <span className = 'user-name'>{post.author.username}</span>
                  </div>
                  <div>
                    <span className = 'post-date'>Created at: {new Date(post.createdAt).toLocaleString()}</span>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Card.Title className = 'post-title'>
                    {post.title}
                  </Card.Title>
                  <Card.Text className = 'post-content'>
                    {post.image && <img className = 'post-image' src = {post.image} alt = 'post'/>}
                    {post.content}
                  </Card.Text>
                  <Card.Text>
                    <Button onClick={()=>{goToComment(post._id)}}>Comment<Badge bg='seconday'>{post.comments}</Badge></Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
        <div className = 'right-bar'>
        </div>
      </div>
    </>
  )
}

export default Timeline