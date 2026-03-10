import express from 'express'
import blogs from './controllers/blogs.js'
import users from './controllers/users.js'
import login from './controllers/login.js'

const app = express()

app.use(express.json())
app.use('/api/login', login)
app.use('/api/blogs', blogs)
app.use('/api/users', users)

export default app




