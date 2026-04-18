//5.14: blogilistan testit, step2
//Tee testi, joka varmistaa että myös url, likejen
 //määrä ja käyttäjä näytetään,
 //kun blogin kaikki tiedot näyttävää nappia on painettu.


import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import ListBlogsForm from './App'




test('renders also url and likes', async () => {
  const blog = {
    author: "test auth",
    likes: 50,
    title: 'test title',
    url: 'test url',
    user: {
        name: 'test user',
        username: 'test username'
    }


  }
  render(<ListBlogsForm/>
  )
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)


  console.log("eka testi", blog.title)


  const element = screen.getByText('test url')
  expect(screen.getByText('50')).toBeDefined()
  expect(element).toBeDefined()

})

//kesken
//blog.visible???? miten testaan että näkyy userille
//testaa user._id === blog id kun painaa napista...
