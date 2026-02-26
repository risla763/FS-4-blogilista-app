import express from 'express'
import blogMongo from '../models/blogMongo.js'

const router = express.Router()

//hakee blogit (api/blogs HUOM!)
router.get('/', async (request, response) => {
  const blogs = await blogMongo.find({})
  response.json(blogs)
})

router.post('/', async (request, response) => {
  const blogObject = new blogMongo(request.body)
  if (blogObject.likes === undefined){
    blogObject.likes = 0
  }
  if (!blogObject.title || !blogObject.url) {
    return response.status(400).end()
  }
  const savedBlog = await blogObject.save()
  response.status(201).json(savedBlog)
})

router.delete('/:id',async (request, response) => {
  const blog = await blogMongo.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

export default router