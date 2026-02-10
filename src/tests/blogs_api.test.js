import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import app from '../app.js'
import mongoose from 'mongoose'
import supertest from 'supertest'
import Blog from '../models/blogMongo.js'

const initialBlogs = [
  {
    "_id": "6981f7992aeed0666ca3bd89",
    "__v": 0
  },
  {
    "_id": "698b59475160ca0c6912fc48",
    "__v": 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

const api = supertest(app)


test('return all the blogs', async () => {
  const response = await api.get('/api/blogs')
    console.log(response.body)
  assert.strictEqual(response.body.length, 2)
})

//katkaise aina testien jälkeen yhteys tietokantaan 
after(async () => {
  await mongoose.connection.close()
})