import mongoose from 'mongoose'
import config from '../utils/config.js'

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

//malli Blog, jolla referoidaan tietokantaan ns. työkalu jolla 
//..lisätä tai poistaa
const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(config.MONGODB_URI)

export default Blog