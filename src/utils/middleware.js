const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer '))
    {
    request.tok = authorization.replace('Bearer ', '')
    }
    else {
    return null
    }

    next()
}


export default tokenExtractor
