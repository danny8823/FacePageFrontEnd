import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import React from 'react'
import { updatePasswordAPI } from '../../../services/userServices'
import * as Yup from 'yup'
import { Button } from 'react-bootstrap'
import { Alert } from '@mui/material'

const UpdatePassword = () => {
    const {mutateAsync, isPending, isError, error, isSuccess} = useMutation({
        mutationFn: updatePasswordAPI,
        mutationKey: ['update-password']
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
            password: ''
        },
        validationSchema,
        onSubmit: (values) => {
            mutateAsync(values.password)
                .then((data)=> {
                    console.log("update password", data)
                })
                .catch((error)=> {
                    console.log(error)
                })
        }
    })

  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
            <label>Password</label>
            <input
                className = 'update-password-input'
                type = 'password'
                name = 'password'
                onChange = {formik.handleChange}
                values = {formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
                <span>{formik.errors.password}</span>
            )}
            <label>Confirm Password</label>
            <input
                className = 'update-password-input'
                type = 'password'
                name = 'confirmPassword'
                onChange={formik.handleChange}
                values = {formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <span>{formik.errors.confirmPassword}</span>
            )}
            <Button type = 'submit'>Update</Button>
        </form>
        {isSuccess && <Alert severity='success'>Password change successful</Alert>}
        {isPending && <Alert severity='info'>Loading...</Alert>}
        {isError && <Alert severity='error'>{error.message}</Alert>}
    </div>
  )
}

export default UpdatePassword