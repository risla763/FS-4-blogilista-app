import { useState, useEffect } from 'react'
const BlogForm = ({
      handleCreate,
      newBlog,
      newAuth,
      newUrl,
      createVisible,
      setCreateVisible,
      setNewAuth,
      setNewBlog,
      setNewUrl
    }) => { 
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }
      return (
      <div>
        <h2>Create new</h2>
          <div style={hideWhenVisible}>
          <button onClick={() => setCreateVisible(true)}>create</button>
          </div>
      <form style={showWhenVisible} onSubmit={handleCreate}>
      <div>
        <label>
          title:
          <input
          type="text"
          value={newBlog}
          onChange={({ target }) => setNewBlog(target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          author:
          <input
          type="text"
          value={newAuth}
          onChange={({ target }) => setNewAuth(target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          url:
          <input
          type="text"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
          />
        </label>
        </div>
        <button type="submit">Create</button>
        <button onClick={() => setCreateVisible(false)}>cancel</button>
        </form>
        </div>

      )
    }
  //......

export default BlogForm