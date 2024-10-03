import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { postCommentsAPI } from '../../../services/commentServices'
import { Alert, Button } from 'react-bootstrap'
import './PostComments.css'

const PostComments = ({authorId,postId}) => {

    const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
        mutationFn: postCommentsAPI,
        mutationKey: ['post-comment']
    })

    const formik = useFormik({
        initialValues: {
            comment: "",
            authorId,
            postId
        },
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data) => {
                    console.log('comment posted', data)
                    window.location.reload()
                })
                .catch((error) => {
                    console.log('this is an error',error)
                })
        }
    })
    
    return (
    <div className = 'comment-form-container'>
        <form 
            className = 'comment-form' 
            onSubmit={formik.handleSubmit}
        >
            <label>Comment:</label>
            <textarea
                className = 'comment-input'
                type='text'
                name = 'comment'
                onChange={formik.handleChange}
                value = {formik.values.comment}
            />
            <Button type='submit'>Submit</Button>
            {isPending && <Alert variant='info'>Posting comment....</Alert>}
            {isSuccess && <Alert variant='success'>Commented successfully</Alert>}
            {isError && <Alert variant='danger'>Error posting comment{error.message}</Alert>}
        </form>
    </div>
    )
}

export default PostComments