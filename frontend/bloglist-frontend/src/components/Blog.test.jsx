import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'



  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 50,
    user: {
        username: 'test name',
        id: '333'
    }
  }


  const user2 = {
    name: 'test user',
    id: "1234"}


test('renders content', () => {
  const user = userEvent.setup()
  render(<Blog blog={blog} user={user}/>)
  console.log("eka testi", blog.title)

  const element = screen.getByText('test title test author')
  expect(element).toBeDefined()



})

test('url, likes and user show when cliked view button', async () => {

  render(<Blog blog={blog} user={user2} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)


  console.log("eka testi", blog.title)


  const element = screen.getByText('test url')
  expect(screen.getByText(/likes\s*50/i)).toBeDefined()
  expect(element).toBeDefined()
  const element2 = screen.getByText(/test name/i)

    
})
