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

test('a blog has key id', async ()=> {
    const response = await api.get('/api/blogs')
    const testobject = response.body[0]
    const keyName = Object.keys(testobject)[0]
    assert.strictEqual(keyName, "id")
    if (testobject._id === undefined) {
      assert.ok(true)
    } else {
      assert.fail("Blog has an '_id'")
    }
})

//katkaise aina testien jälkeen yhteys tietokantaan 
after(async () => {
  await mongoose.connection.close()
})


test('you can post a blog', async () => {
    await Blog.deleteMany({})
    const oldLength = (await api.get('/api/blogs')).body.length
    console.log(oldLength, "vanha pituus")
    const newBlog = await api.post('/api/blogs').send({
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    })
    const newLength = (await api.get('/api/blogs')).body.length
    console.log(newLength, "uusi pituus")
    assert.strictEqual(newLength, oldLength + 1)
    assert.strictEqual(newBlog.body.title, "React patterns")
})


test('when likes are not posted, then likes are set to beign 0', async () => {
    const newBlog = await api.post('/api/blogs').send({
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: undefined
    })
    const response = (await api.get('/api/blogs'))
    const latestBlog = response.body[response.body.length -1]
    assert.strictEqual(latestBlog.likes,0)
    console.log(latestBlog.likes, "testiä taas")
})

