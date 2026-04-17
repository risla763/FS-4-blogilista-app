import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'test title',
    author: 'test author'
  }
  render(<Blog blog={blog} />)
  console.log("eka testi", blog.title)

  const element = screen.getByText('test title test author')
  expect(element).toBeDefined()

})
