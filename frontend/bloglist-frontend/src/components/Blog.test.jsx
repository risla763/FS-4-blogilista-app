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
  expect(element2).toBeDefined()

    
})

test('like button adds likes', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} user={user2} handleLike={mockHandler} />) 
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const button2 = screen.getByText('like')
  await user.click(button2)

  await user.click(button2)
  expect(mockHandler.mock.calls).toHaveLength(2)


})

//Tee testi, joka varmistaa, että jos komponentin like-nappia painetaan kahdesti, 
//komponentin propsina saamaa tapahtumankäsittelijäfunktiota
 //kutsutaan kaksi kertaa.