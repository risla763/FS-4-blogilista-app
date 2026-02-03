import express from 'express'
import blogMongo from '../models/blogMongo.js'

const router = express.Router()

//hakee blogit (api/blogs HUOM!)
router.get('/', (request, response) => {
  blogMongo.Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

router.post('/', (request, response) => {
  const blog = new blogMongo.Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})


export default router