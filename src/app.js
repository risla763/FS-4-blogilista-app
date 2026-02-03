import express from 'express'
import config from './utils/config.js'
import blogs from './controllers/blogs.js'

const app = express()

app.use(express.json())

app.use('/api/blogs', blogs)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

export default app