import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { useFormik } from 'formik';
import {useMutation} from '@tanstack/react-query'
import { loginAPI } from '../../services/userServices';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button  } from '@mui/material';
import {Modal} from 'react-bootstrap'
import CheckIcon from '@mui/icons-material/Check';
import { loginAction } from '../../redux/slice/authSlice';
import './Home.css'
import logo from '../../assets/fp-logo.png'
import Register from '../Register/Register';
import Footer from '../Footer/Footer';

const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [show,setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
    mutationFn: loginAPI,
    mutationKey: ['login']
  })

  const formik = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    onSubmit: (values) => {
        mutateAsync(values)
            .then((data)=>{
                dispatch(loginAction(data))
                localStorage.setItem('userInfo', JSON.stringify(data))
                navigate('/timeline')
            })
            .catch((error)=>{
                console.log(error)
            })
    }
  })

  return (
    <>
    <Modal 
            aria-labelledby="contained-modal-title-vcenter"
            show = {show} 
        >
            <Modal.Header>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Register/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant = 'contained' onClick={handleClose}> Close</Button>
            </Modal.Footer>
        </Modal>
    <div className = 'home-container'>
        <div className = 'home-welcome-card'>
            <h1>FacePage</h1>
            <img src = {logo} alt = 'logo' className = 'logo'/>
            <p>Welcome Back</p>
            <p>A safe place to social media</p>
        </div>
        <div className = 'home-login-card'>
            <form onSubmit={formik.handleSubmit}>
                <input 
                    className = 'form-input'
                    type = 'email'
                    name = 'email'
                    onChange = {formik.handleChange}
                    value = {formik.values.email}
                    placeholder='email'
                /><br/><br/>
                <input 
                    className = 'form-input'
                    type = 'password'
                    name = 'password'
                    onChange = {formik.handleChange}
                    value = {formik.values.password}
                    placeholder='password'
                /><br/><br/>
                <Button variant='contained' type = 'submit'>Log In</Button>
            </form>
            <br/>
            <Button 
                variant = 'contained' 
                color = 'secondary'
                onClick={handleShow}
                >Sign Up</Button>
            <br/>
            <div>
                {isSuccess && <Alert icon={<CheckIcon fontSize = 'inhereit'/>} severity='success'>Login Successful!</Alert>}
                {isPending && <Alert severity='info'>Loading...</Alert>}
                {isError && <Alert severity='error'>{error.message}</Alert>}
            </div>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default Home