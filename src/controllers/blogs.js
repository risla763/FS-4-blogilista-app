import express from 'express'
import blogMongo from '../models/blogMongo.js'
//import { use } from 'react'
import userMongo from '../models/userMongo.js'
import jsonwebtoken from 'jsonwebtoken'

const router = express.Router()


router.get('/', async (request, response) => {
  const blogs = await blogMongo.find({}).populate(
    'user', {username: 1, name: 1, _id: 1}
  )
  return response.json(blogs)
})

router.post('/', async (request, response) => {
  const blogObject = new blogMongo(request.body)
  console.log('request token on', request.tok)
  const decodedToken = jsonwebtoken.verify(request.tok, process.env.SECRET)
  if (!decodedToken.id){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await userMongo.findById(decodedToken.id)

  if (!user){
    return response.status(400).json({error: 'UserId missing or not valid'

    })
  }
  blogObject.user = user.id
  if (blogObject.likes === undefined){
    blogObject.likes = 0
  }
  if (!blogObject.title || !blogObject.url) {
    return response.status(400).end()
  }
  const savedBlog = await blogObject.save()

  console.log(savedBlog._id, "blogin id")
  user.blogs = user.blogs.concat(savedBlog.id)
  console.log(user.blogs, "käyttäjän blogit")
  await user.save()

  response.status(201).json(savedBlog)
})

router.delete('/:id',async (request, response) => {
  const blog = await blogMongo.findByIdAndDelete(request.params.id)
  response.status(204).end()
})


router.put('/:id', async (request, response) => {
  const body = request.body
  const blog = await blogMongo.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }
  blog.title = body.title
  blog.author = body.author
  blog.url = body.url
  blog.likes = body.likes
  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})




export default router