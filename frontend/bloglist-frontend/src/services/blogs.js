import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  console.log(token, "TOKEN")
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}


const create = async newObject => {
  console.log("create funktion sisällä", newObject)
  const config = {
    headers: { Authorization: token }
  }
  console.log('mikä config', config)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

//? put
const putBlog = async updatedObject => {
  console.log("put funktio", updatedObject.id)
  const config = {
    headers: { Authorization: token }
  }
  console.log('mikä config', config)
  const db = getAll()
  console.log('onko blogit', db)
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)


  return response.data
}

const deleteBlog = async blogId => {
  console.log("menee delereen", blogId)
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  console.log(response, "MITÄÄÄ RESPONSE DELETEESSSÄÄÄÄÄ?")
  const newList = getAll()
  return newList


}


export default { getAll, create, setToken, putBlog, deleteBlog }