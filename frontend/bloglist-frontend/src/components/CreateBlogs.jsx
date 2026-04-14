import { useState } from 'react' //uus
import blogService from '../services/blogs'

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
            const AddBlog = await blogService.create({ title: newBlog, author: newAuth, url: newUrl })
            handleCreate(AddBlog)
            setAddMessage(`a new blog ${newBlog} by ${newAuth} added!`)
            setTimeout(() => {
                setAddMessage(null)}, 5000)
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

        <div>
            {AddMessage && <div className="addNotification">{AddMessage}</div>}
            {ErrorMessage && <div className="errorNotification">{ErrorMessage}</div>}
            <h2>Create new</h2>
            <div style={hideWhenVisible}>
                <button onClick={() => setCreateVisible(true)}>create</button>
            </div>
            <form style={showWhenVisible} onSubmit={handleCreateService}>
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
                <button type="button" onClick={() => setCreateVisible(false) }>cancel</button>
            </form>
        </div>

    )
}
//......

export default BlogForm