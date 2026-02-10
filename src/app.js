import express from 'express'
import blogs from './controllers/blogs.js'

const app = express()

app.use(express.json())

app.use('/api/blogs', blogs)


export default app




