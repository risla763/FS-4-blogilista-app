import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/CreateBlogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //uutta
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')
  //const [newAuth, setNewAuth] = useState('')
  //const [newBlog, setNewBlog] = useState('')
  //const [newUrl, setNewUrl] = useState('')
  const [AddMessage, setAddMessage] = useState('')
  const [createVisible, setCreateVisible] = useState(false)
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
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong username or password')
      console.log("mitä tapahtuu")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }



  const handleCreate = ( blogObject ) => {
    setBlogs(blogs.concat(blogObject))
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
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




  const ListBlogsForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }






  const LogOutForm = ({ username }) => (

    <form onSubmit={HandleLogOut}>
      <h2>{username} is logged in</h2>
      <button type="submit">logout</button>
    </form>

  )

  return (

    <div>
      {!user && LoginForm()}
      {user && ListBlogsForm()}
      {user && <BlogForm createVisible={createVisible}
        setCreateVisible={setCreateVisible}
        handleCreate={handleCreate}
      />}
      {user && <LogOutForm username={user.username} />}
    </div>
  )
}

export default App