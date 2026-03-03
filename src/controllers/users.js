import express from 'express'
import UserMongo from '../models/userMongo.js'
import bcrypt from 'bcrypt'

const router = express.Router()


router.post('/', async (request, response) => {
  const newUser = request.body
  if (!newUser.username || !newUser.name || !newUser.password) {
    return response.status(400).end()
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
    const users = await UserMongo.find({}, { username: 1, name: 1 , id: 1})
    response.json(users)
})
export default router