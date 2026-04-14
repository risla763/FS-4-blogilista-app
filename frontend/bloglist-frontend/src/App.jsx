import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //uutta
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  //

  const HandleLogOut = async (event) => {
    window.localStorage.clear()
  }

  const handleLogin = async (event) => {
    //alempi koodi tekee sen että dataa voi käsitellä ilman että sivu päivittyy
    event.preventDefault()
    console.log(username, password, "username ja password")
    try {
      //tämä menee login.js
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
     // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      console.log("mitä tapahtuu")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //noteService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs( blogs )
      console.log("onko blogit,", blogs)
    }
    )  
  }, [])
 
    
  const LoginForm = () => (
      <div>
        <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>


        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )




  const BlogForm = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <form onSubmit={HandleLogOut}>
        <button type="Log Out">logout</button>
        </form>

    </div>
  )
  return (

    <div>
      {!user && LoginForm()}
      {user && BlogForm()}
    </div>
  )
}

export default App