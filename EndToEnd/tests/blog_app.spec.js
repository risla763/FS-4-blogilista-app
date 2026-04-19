

const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/users/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Maija',
        username: 'Maija2',
        password: 'salasana123'
      }
    })

    await page.goto('http://localhost:5173')
  })


  test('Login form is shown', async ({ page }) => {
    const locator = page.getByText('Log in to application')
    await expect(locator).toBeVisible()




    
  })

describe('Login', () => {
  test('succeeds with correct credentials', async ({ page }) => {

    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('textbox').first().fill('Maija2')
    await page.getByRole('textbox').last().fill('salasana123')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Maija2 is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()

    await page.getByRole('textbox').first().fill('Wrong')
    await page.getByRole('textbox').last().fill('wrong')
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('Log in to application')).toBeVisible()
    })

  })
})

//korjaaa like ui
//muista että tässä backendin pitää olla testaus moodissa
//vanhojen testien blogikannan alustus onko ok?...blogs api test (ei käyttäjää...)