import express from 'express'
import config from './utils/config.js'
import blogs from './controllers/blogs.js'

const app = express()

app.use(express.json())

app.use('/api/blogs', blogs)

const favouriteBlog = (blogs) => {
  const favourite = blogs[0].likes
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favourite)
      favourite = blogs[i].likes
  }
  return favourite
}

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})

export default app