import express from 'express'
import UserMongo from '../models/userMongo.js'
import BlogMongo from '../models/userMongo.js'
import bcrypt from 'bcrypt'
import populate from 'dotenv'

const router = express.Router()


router.post('/', async (request, response) => {
  const newUser = request.body
  if (!newUser.username || !newUser.name || !newUser.password) {
    return response.status(400).json({error:'username, name and password all are needed'})
  }
  if (newUser.password.length < 3 || newUser.username.length < 3) {
    return response.status(400).json({error: 'username and password need to be atleast 3 marks long'})
  }
  const users = await UserMongo.find({})
  if (users.find(name => newUser.username == name.username))
  {
    return response.status(400).json({error: 'username already exists'})
  }

  const passwordHash = await bcrypt.hash(newUser.password, 10)
  const user = new UserMongo({
    username: newUser.username,
    name: newUser.name,
    password: passwordHash
  })
  const savedUser = await user.save()
  return response.status(201).json(savedUser)
})

router.get('/', async (request, response) => {
    const users = await UserMongo.find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
})

router.post('/reset', async (request, response) => {
  await UserMongo.deleteMany({})
  await BlogMongo.deleteMany({})
  response.status(204).end()
})

export default router