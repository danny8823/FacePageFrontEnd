import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { postPostAPI } from '../../../services/postServices'
import './PostPage.css'
import { Alert, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const PostPage = ({user}) => {
    const navigate = useNavigate()

    const {mutateAsync,isPending,isError,error,isSuccess} = useMutation({
        mutationFn: postPostAPI,
        mutationKey: ['post']
    })

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            dateTime: new Date(),
            image: '',
            author: user._id
        },
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data)=>{
                    console.log('this is post data', data)
                    window.location.reload()
                })
                .catch((error) => {
                    console.log('this is error', error)
                })
        }
    })
  return (
    <div>
        <form onSubmit = {formik.handleSubmit}>
            <label>Title</label>
            <input
                className = 'post-title-input'
                type = 'text'
                name = 'title'
                onChange={formik.handleChange}
                value = {formik.values.title}/>
            <label>Whats on your mind?</label>
            <textArea
                className = 'post-content-input'
                type = 'text'
                name = 'content'
                onChange= {formik.handleChange}
                value = {formik.values.content}
            />
            <label>Image-URL</label>
            <input
                className = 'post-image-input'
                type='url'
                name = 'image'
                onChange={formik.handleChange}
                value = {formik.values.image}
                />
            <p>Image preview</p>
            {formik.values.image && <img src = {formik.values.image} alt = 'preview'/>}
            
                <Button 
                    variant='contained'
                    color = 'secondary'
                    type = 'submit'>Post</Button>
        </form>
        {isSuccess && <Alert severity='success'>Post Successfully Posted</Alert>}
        {isPending && <Alert severity='info'>Posting......</Alert>}
        {isError && <Alert severity='error'>{error.message}</Alert>}
    </div>
  )
}

export default PostPage