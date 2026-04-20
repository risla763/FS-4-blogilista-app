import { useState } from 'react' //uus
import blogService from '../services/blogs'
import styled from 'styled-components'

const Backround = styled.section`

  background: #9c9f69;
`;

const Button = styled.button`
    background-color: #6a823e;
    border: none;
    border-radius: 50%;
`;

const Label = styled.label`
  color: #8b123aff;
`;

const Input = styled.input`
  background-color: transparent; 
  border: none;
  border-bottom: 2px solid #efd4dd;
  &:focus {
      outline: none;
      box-shadow: none;

    }
}
`

const ButtonCancel = styled.button`
    background-color: #9c9ebcff;
    border: none;
    border-radius: 50%;
`;

const BlogForm = ({
  createVisible,
  setCreateVisible,
  handleCreate

}) => {
  const hideWhenVisible = { display: createVisible ? 'none' : '' }
  const showWhenVisible = { display: createVisible ? '' : 'none' }
  const [ErrorMessage, setErrorMessage] = useState('')
  const [newBlog, setNewBlog] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newAuth, setNewAuth] = useState('')
  const [AddMessage, setAddMessage] = useState('')
  const handleCreateService = async (event) => {
    event.preventDefault()

    try {
      if (!newBlog === ''|| newAuth === ''|| newUrl === ''){
      setErrorMessage('Blog cannot be added, please check title, author and url')
      return
      }
      blogService.create({ title: newBlog, author: newAuth, url: newUrl })
      .then(AddBlog => {
        handleCreate(AddBlog)})

      setAddMessage(`a new blog ${newBlog} by ${newAuth} added!`)
      setTimeout(() => {
        setAddMessage(null)
      }, 5000)
      setNewUrl('')
      setNewBlog('')
      setNewAuth('')
    }
    catch {
      setErrorMessage('Blog cannot be added, please check title, author and url')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
      <Backround>
    <div>
      {AddMessage && <div className="addNotification">{AddMessage}</div>}
      {ErrorMessage && <div className="errorNotification">{ErrorMessage}</div>}
      <h2>Create new</h2>
      <div style={hideWhenVisible}>
        <Button onClick={() => setCreateVisible(true)}>create</Button>
      </div>
      <form style={showWhenVisible} onSubmit={handleCreateService}>
        <div>
          <Label>
            title:
            <Input
              type="text"
              value={newBlog}
              onChange={({ target }) => setNewBlog(target.value)}
            />
          </Label>
        </div>
        <div>
          <Label>
          author:
            <Input
              type="text"
              value={newAuth}
              onChange={({ target }) => setNewAuth(target.value)}
            />
          </Label>
        </div>
        <div>
          <Label>
                  url:
            <Input
              type="text"
              value={newUrl}
              onChange={({ target }) => setNewUrl(target.value)}
            />
          </Label>
        </div>
        <Button type="submit">Create</Button>
        <ButtonCancel type="button" onClick={() => setCreateVisible(false)}>cancel</ButtonCancel>
      </form>
    </div>
    </Backround>

  )
}
//......

export default BlogForm