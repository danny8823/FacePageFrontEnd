import axios from 'axios'
import { BASE_URL } from '../utils/url'

export const getPostsApi = async() => {
    const response = await axios.get(`${BASE_URL}/post/list-all`)

    return response.data
}

export const getPostAPI = async(_id) => {
    const response = await axios.get(`${BASE_URL}/post/list-one/${_id}`)
    return response.data
}

export const postPostAPI = async({title,content,image,dateTime,author}) => {
    const response = await axios.post(`${BASE_URL}/post/create-post`,{
        title, content, image, dateTime, author
    })

    return response.data
}

export const getPostsByAuthorAPI = async (_id) => {
    const response = await axios.get(`${BASE_URL}/post/list-by-author/${_id}`)
    return response.data
}

export const deletePostAPI = async (_id) => {
    const response = await axios.delete(`${BASE_URL}/post/delete-post/${_id}`)
    return response.data
}