import express from 'express'
import blogMongo from '../models/blogMongo.js'
//import { use } from 'react'
import userMongo from '../models/userMongo.js'
// OIKEIN
import { userExtractor } from '../utils/middleware.js'

const router = express.Router()


router.get('/', async (request, response) => {
  const blogs = await blogMongo.find({}).populate(
    'user', {username: 1, name: 1, _id: 1}
  )
  return response.json(blogs)
})

router.post('/', userExtractor,  async (request, response) => {
  const blogObject = new blogMongo(request.body)

 const user = request.user
  blogObject.user = user.id
  if (blogObject.likes === undefined){
    blogObject.likes = 0
  }
  if (!blogObject.title || !blogObject.url) {
    return response.status(400).end()
  }
  const savedBlog = await blogObject.save()

  const populatedResult = await blogMongo.findById(blogObject.id).populate('user', { username: 1, name: 1 })


  user.blogs = user.blogs.concat(savedBlog.id)

  console.log("saved blog?", savedBlog)
  console.log(process.env.MONGODB_URI, "?")
  await user.save()
  console.log("ONKO USERRR", savedBlog)
  response.status(201).json(populatedResult)
})

router.delete('/:id', userExtractor, async (request, response) => {
  console.log("Delete testi", request.params.id)
  const user = request.user



  console.log("Delete testi", request.params.id)
  console.log("Delete kaikki userin blogit", user.blogs)
  const blog = await blogMongo.findById(request.params.id)
  if (blog.user.toString() === user.id.toString()) {
    await blog.deleteOne()
  }
  else {
    return response.status(400).json({error: 'Blog not found'})
  }

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