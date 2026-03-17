import jsonwebtoken from 'jsonwebtoken'
import userMongo from '../models/userMongo.js'
export const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer '))
    {
    request.tok = authorization.replace('Bearer ', '')
    }
    next()
}

//tähän se, joka selvittää pyynnön:
export const userExtractor = async (request, response, next) => {
  if (!request.tok){
    return response.status(401).json({error: 'token invalid'})
  }
    //pyyntöön liittyvä käyttäjä?
  const decodedToken = jsonwebtoken.verify(request.tok, process.env.SECRET)

  if (!decodedToken.id){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await userMongo.findById(decodedToken.id)

  if (user){
    request.user = user
  }
  else {
    return response.status(400).json({error: 'UserId missing or not valid'

    })
  }
  next()
}



