import express from 'express'
import UserMongo from '../models/userMongo.js'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


const router = express.Router()

router.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await UserMongo.findOne({ username })

  
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.password)

  if (!(user && passwordCorrect)) {
    console.log("väärin")
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  else {
    console.log("salsana oikein")
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jsonwebtoken.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

export default router
