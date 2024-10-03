import React from 'react'
import { useFormik } from 'formik'
import { useMutation } from '@tanstack/react-query'
import { registerAPI } from '../../services/userServices'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { Alert, Button } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import './Register.css'

const Register = () => {
    const navigate = useNavigate()

    const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
        mutationFn: registerAPI,
        mutationKey: ['register']
    })

    const validationSchema = Yup.object({
        username: Yup.string().required('username is required'),
        email: Yup.string()
            .email("invalid email")
            .required("email is required"),
        password: Yup.string()
            .min(5, "password must be minimum of 5 characters long")
            .required("password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"),null], "Password must match")
            .required("confirming your password is required")
    })

    const regFormik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword:'',
            username:''
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values)
                .then((data)=>{
                    console.log('data', data)
                    navigate('/dashboard')
                })
                .catch((error)=>{
                    console.log(error)
                })
        }
    })


  return (
    <div>
        <form onSubmit = {regFormik.handleSubmit}>
            <label>Email</label>
            <input
                className = 'form-input'
                type='email'
                name = 'email'
                onChange={regFormik.handleChange}
                value = {regFormik.values.email}
            />
            {regFormik.touched.email && regFormik.errors.email &&(
                <span className = 'form-error-message'>{regFormik.errors.email}</span>
            )}
            <label>Username</label>
            <input
                className = 'form-input'
                type='username'
                name = 'username'
                onChange={regFormik.handleChange}
                value = {regFormik.values.username}
            />
            {regFormik.touched.username && regFormik.errors.username &&(
                <span className = 'form-error-message'>{regFormik.errors.username}</span>
            )}
            <label>Password</label>
            <input
                className = 'form-input'
                type='password'
                name = 'password'
                onChange={regFormik.handleChange}
                value = {regFormik.values.password}
            />
            {regFormik.touched.password && regFormik.errors.password && (
                <span className = 'form-error-message'>{regFormik.errors.password}</span>
            )}
            <label>Confirm Password</label>
            <input
                className = 'form-input'
                type='password'
                name = 'confirmPassword'
                onChange={regFormik.handleChange}
                value = {regFormik.values.confirmPassword}
            />
            {regFormik.touched.confirmPassword && regFormik.errors.confirmPassword && (
                <span className = 'form-error-message'>{regFormik.errors.confirmPassword}</span>
             )}
            <Button type = 'submit'>Register</Button>
        </form>
        {isSuccess && <Alert icon={<CheckIcon fontsize = 'inhereit'/>} severity='success'>Register Successful</Alert>}
        {isPending && <Alert severity='info'>Loading...</Alert>}
        {isError && <Alert severity='error'>{error.message}</Alert>}
    </div>
  )
}

export default Register