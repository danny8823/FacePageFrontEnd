import axios from 'axios'
import { getUserFromStorage } from '../utils/getUserFromStorage'
import { BASE_URL } from '../utils/url'

const token = getUserFromStorage()
console.log('this is token', token)
export const loginAPI = async({email,password}) => {
    const response = await axios.post(`${BASE_URL}/users/login`,{
        email,password
    })
    console.log('loginAPI', response.data)
    return response.data
}

export const registerAPI = async({
    username,
    password,
    email
}) => {
    const response = await axios.post(`${BASE_URL}/users/register`,{
        username,
        password,
        email
    })
    return response.data
}

export const updateProfileAPI = async({email,image,username}) => {
    console.log('update api fired',email,image,username)
    const response = await axios.put(`${BASE_URL}/users/update-profile`, {
        email,
        image,
        username
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data
}

export const updatePasswordAPI = async(password) => {
    console.log('new pass', password)
    const response = await axios.put(`${BASE_URL}/users/change-password`,{
        newPassword: password
    },{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}