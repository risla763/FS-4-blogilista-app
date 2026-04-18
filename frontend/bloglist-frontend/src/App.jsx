import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import BlogForm from './components/CreateBlogs'


//ENNEN PALAUTUSTA BLOGIN LISÄÄJÄN TIEDOT TOIMIIKO?
const App = () => {
  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [ErrorMessage, setErrorMessage] = useState('')
  const [page, setPage] = useState('')


  const [createVisible, setCreateVisible] = useState(false)


  const toPage = (page) => (event) => {
      event.preventDefault()
      setPage(page)
    }

  useEffect(() => {
    if (page === 'blogs') {
      if (user === ''){
        setUser('?')
      }
      console.log("moi", user)
    }
    else if (page === 'login') {
      setUser('')
    }
  }, [page])

  






  const HandleLogOut = async () => {
    window.localStorage.clear()
  }

  const handleView = (id) => {
    //console.log("viewNappi", id,"kkkkkk", user.id)
    const FalseOrTrue = blogs.find(blog =>
      blog.id === id
    )
    if (FalseOrTrue.visible === true) {
      setBlogs(blogs.map(blog =>
        blog.id === id
          ? { ...blog, visible: false }
          : blog
      ))
    }
    else {
      setBlogs(blogs.map(blog =>
        blog.id === id

          ? { ...blog, visible: true }
          : blog
      ))
    }
  }

  const handleLike = async (id) => {
    const updatedLikes = blogs.map(blog =>
      blog.id === id

        ? {
          ...blog, user: blog.user, likes: blog.likes + 1
        }
        : blog
    )



    const Updatedblog = updatedLikes.find(blog => blog.id === id)

    const updateFinal = await blogService.putBlog(Updatedblog)
    setBlogs(blogs.map(blog =>
      blog.id === id
        ? { ...updateFinal, user: blog.user, visible: true }
        : blog
    ))

  }

  const handleLogin = async (event) => {
    //alempi koodi tekee sen että dataa voi käsitellä ilman että sivu päivittyy
    event.preventDefault()
    //console.log(username, password, "username ja password")
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
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username, password)
  }


  //vaihda alla olevan nimi parempaan (esim. ADDTODATABASE)
  const handleCreate = (blogObject) => {
    setBlogs(blogs.concat(blogObject))
  }

  //KORJAA SE ETTÄ KAIKKI BLOGIT EIVÄT HETI NÄY POISTETTUINA..PITÄÄ PÄIVITTÄÄ SIVU MISKI?
  //create ilman authoria toimii...KORJAAA koska like ei toimi tässä...
  //createn jälkeen kun avaa blogin eikä sivua ole päivitetty käyttäjä, joka loi ei näy
  const handleDelete = async (blogId) => {
    console.log(blogId)
    blogService.deleteBlog(blogId)
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }
  //vielä se viesti window juttu
  //ja joku että delete nappi näkyy vain jos omistat blogin...
  const handleWindow = async (blog) => {

    //if (blog.user.id === )
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      handleDelete(blog.id)
    } else {
      return
    }

  }
  //korjaa-> kun lisää blgoin niin lisääjän nimi näkyy heti

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
    }
    )
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const addView = blogs.map(blog => ({
        ...blog,
        visible: false
      }))
      setBlogs(addView)
      console.log("TÄSSÄ MALLI", addView)
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

        
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>

          <div key={blog.id} style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Blog key={blog.id} blog={blog} visible={blog} />
              {blog.visible &&
                <div>
                  {blog.url} <br></br>
                  likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button> <br></br>
                  {blog.user.username}<br></br>
                  {blog.user.id === user.id && (<button onClick={() => handleWindow(blog)}>Remove</button>)}
                  <pre id="log"></pre>
                </div>
              }
            </div>
            <button onClick={() => handleView(blog.id)}>view</button>
          </div>
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

  const ButtonForm = () => (
      <div>
        <a href="" onClick={toPage('blogs')}>
          blogs
        </a>
      </div>

  )

  const LogInIfNotLogdIn = () => (
    <div>
      <a href="" onClick={toPage('login')} >
        login
      </a>
    </div>
  )

  return (

    <div>
      {!user && LoginForm()}
      {ButtonForm()}
      {(!user || user === '?') && LogInIfNotLogdIn()}
      {user && ListBlogsForm()}
      {user && <BlogForm createVisible={createVisible}
        setCreateVisible={setCreateVisible}
        handleCreate={handleCreate}
      />}
      {user && user !== '?' && <LogOutForm username={user.username} />}
    </div>
  )
}
//blogs kun käyttäjä sisällä vielä näkymään ja reitit
export default App
