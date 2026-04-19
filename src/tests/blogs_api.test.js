import { test, after, beforeEach } from 'node:test'
import assert from 'node:assert'
import app from '../app.js'
import mongoose from 'mongoose'
import supertest from 'supertest'
import Blog from '../models/blogMongo.js'
import { get } from 'node:http'
import User from '../models/userMongo.js'

const initialBlogs = [
{
  "_id": {
    "$oid": "69e3dc58f2c2f9fee3cc6e6e"
  },
  "title": "Blog 2",
  "author": "Auth 2",
  "url": "url 2",
  "user": {
    "$oid": "69b0913c84cd584ebf980ebf"
  },
  "likes": 27,
  "__v": 0
},
{
  "_id": {
    "$oid": "69e4da97f1a7f9cdaae6bc88"
  },
  "title": "toimiiko",
  "author": "testii",
  "url": "resri",
  "user": {
    "$oid": "69b57fcaaec46fb901b401f1"
  },
  "likes": 4,
  "__v": 0
}
]
test('make TestUser in the database with token', async() => {
    const newUser = await api.post('/api/users').send({
      username: "isotestiusername",
      name: "Testinimii123456789",
      password: "moiiii67"
    })
    assert.strictEqual(newUser.status, 201)
})


let token
test('login with a test user', async() => {
    const loginStuff = await api.post('/api/login').send({
      username: "isotestiusername",
      password: "moiiii67"
    })
    const response = await api.get('/api/users')
    const userAdded = response.body.find(user => user.username === "isotestiusername" )
    console.log(loginStuff.body.token, "toi on se token")
    assert.strictEqual(response.status, 200)
    assert(loginStuff.body.token)
    token = loginStuff.body.token
})

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
  assert.strictEqual(response.body.length, 2)
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



test('you can post a blog', async () => {
    await Blog.deleteMany({})
    const oldLength = (await api.get('/api/blogs')).body.length
    console.log(oldLength, "vanha pituus")

    const newBlog = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
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

test('you cannot post a blog whitout token', async () => {
    await Blog.deleteMany({})
    const oldLength = (await api.get('/api/blogs')).body.length
    console.log(oldLength, "vanha pituus")

    const newBlog = await api.post('/api/blogs')
    .send({
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    })
    assert.strictEqual(newBlog.status, 401)

})


test('when likes are not posted, then likes are set to beign 0', async () => {
    const newBlog = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
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


test('if thete are no title and/or url ', async () => {
    const newBlog = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`)
    .send({
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7
    })
    assert.strictEqual(newBlog.status, 400)
    const otherBlog = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: "React patterns",
      author: "Michael Chan", 
      likes: 2
    })
    assert.strictEqual(otherBlog.status, 400)        
    
})

test('can delete an one blog at a time', async () => {
    const newBlog = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: "testiblogi",
      author: "testikäyttäjä",
      url: "https://testi.com",
      likes: 0
    })
    const oldLength = (await api.get('/api/blogs')).body.length
    const deletedBlog = await api.delete('/api/blogs/' + newBlog.body.id).set('Authorization', `Bearer ${token}`)
    assert.strictEqual(deletedBlog.status, 204)
    const newLength = (await api.get('/api/blogs')).body.length
    assert.strictEqual(newLength, oldLength - 1)
})

test('blog can be updated', async () => {
    const newBlog = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send({
    title: "testiblogi",
    author: "testikäyttäjä",
    url: "https://testi.com",
    likes: 0
    })
    const update = await api.put(`/api/blogs/${newBlog.body.id}`).send({
      title: "Päivitetty",
      author: "Uusi",
      url: "https://uusi.com",
      likes: 67
    })
    const testi = await api.get(`/api/blogs/`)
    const testiBlog = testi.body.find(blog => blog.id === newBlog.body.id)
    assert.strictEqual(testiBlog.title, "Päivitetty")
    assert.strictEqual(testiBlog.author, "Uusi")
    assert.strictEqual(testiBlog.url, "https://uusi.com")
    assert.strictEqual(testiBlog.likes, 67)
    assert.strictEqual(testiBlog.id, newBlog.body.id)
})

test('user cannot be created without name, username or password', async () => {
    const newUser = await api.post('/api/users').send({
      username: "testikäyttäjä",
      name: "Testinimii",
      password: undefined
    })
    assert.strictEqual(newUser.status, 400)
    const otherUser = await api.post('/api/users').send({
      username: "testikäyttäjä",
      name: undefined,
      password: "salasana"
    })
    assert.strictEqual(otherUser.status, 400)
    const thirdUser = await api.post('/api/users').send({
      username: undefined,
      name: "Testinimii",
      password: "moimoi"
    })
    assert.strictEqual(thirdUser.status, 400)
})

test('username and password needs to be 3 or more marks long', async () => {
    const newUser = await api.post('/api/users').send({
      username: "oo",
      name: "Testinimii",
      password: "moiiii67"
    })
    assert.strictEqual(newUser.status, 400)

    const newUser2 = await api.post('/api/users').send({
      username: "testikäyttäjä",
      name: "Testinimii",
      password: "oo"
    })
    assert.strictEqual(newUser2.status, 400)
})

test('username needs to be unique', async () =>{
    await User.deleteMany({})
    const newUser = await api.post('/api/users').send({
      username: "moikkamoii",
      name: "Testinimii",
      password: "moiiii67"
    })
    assert.strictEqual(newUser.status, 201)
    const newUser2 = await api.post('/api/users').send({
      username: "moikkamoii",
      name: "Testinimii2",
      password: "moiiii67"
    })
    assert.strictEqual(newUser2.status, 400)
})


after(async () => {
  await mongoose.connection.close()
})