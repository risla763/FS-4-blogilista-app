import mongoose from 'mongoose'
import config from '../utils/config.js'

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

//malli User, jolla referoidaan tietokantaan ns. työkalu jolla 
//..lisätä tai poistaa
const User = mongoose.model('User', userSchema)

mongoose.connect(config.MONGODB_URI)

export default User