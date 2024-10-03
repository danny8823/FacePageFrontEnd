import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import { updateProfileAPI } from '../../../services/userServices'
import { Alert, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import { useSelector } from 'react-redux'
import './UpdateProfile.css'

const UpdateProfile = () => {
    const {user} = useSelector((state) => state?.auth?.user)

    const {mutateAsync, isPending, isError, error,  isSuccess} = useMutation({
        mutationFn: updateProfileAPI,
        mutationKey: ['update']
    })

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(5, "password must be minimum of 5 characters long")
            .required("password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"),null], "Password must match")
            .required("confirming your password is required")
    })

    const formik = useFormik({
        initialValues: {
            username: user.username,
            email: user.email,
            image: user.image
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data)=>{
                    console.log('updated profile data', data)
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })
    
  return (
    <div>
        <form onSubmit = {formik.handleSubmit}>
            <label>Email</label>
            <input 
                className = 'update-profile-input'
                type = 'email'
                name = 'email'
                onChange = {formik.handleChange}
                value = {formik.values.email}
            />
            <label>Username</label>
            <input
                className = 'update-profile-input'
                type = 'string'
                name = 'username'
                onChange={formik.handleChange}
                value = {formik.values.username}
            />
            <label>Image</label>
            <input
                className = 'update-profile-input'
                type = 'url'
                name = 'image'
                onChange={formik.handleChange}
                value = {formik.values.image}
            />
             <img className = 'update-profile-preview-img' src = {formik.values.image} alt = 'preview'/>
             <Button type = 'submit'>Update</Button>
        </form>
        {isSuccess && <Alert icon={<CheckIcon fontsize = 'inhereit'/>} severity='success'>Register Successful</Alert>}
        {isPending && <Alert severity='info'>Loading...</Alert>}
        {isError && <Alert severity='error'>{error.message}</Alert>}
    </div>
  )
}

export default UpdateProfile