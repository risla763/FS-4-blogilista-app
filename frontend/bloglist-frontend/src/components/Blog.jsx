import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {

  const [blogVisible, setBlogvisible] = useState(true)

  const hideVisible = { display: blogVisible ? 'none' : '' }

  const toggleVisibility = () => {
    setBlogvisible(!blogVisible)
  }  
  const handleWindow = (event) => {

    //if (blog.user.id === )
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {

      handleDelete(blog.id)
    } else {
      return
    }

  }

  return (
    <div key={blog.id} style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        {blog.title} {blog.author}
          <div style={hideVisible}>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={() => handleLike(blog.id)}>like</button> </p>
            {blog.user.username}<br></br>
            {blog.user.id === user.id && (<button onClick={handleWindow}>Remove</button>)}
            <pre id="log"></pre>
          </div>

      </div>
      <button onClick={toggleVisibility}>view</button>
    </div>

  )
}
export default Blog