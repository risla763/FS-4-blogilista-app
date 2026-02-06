const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  let total = 0
  let i = 0
  for (i = 0; i < blogs.length ; i++) {
    total += blogs[i].likes
  }
  return total
}

const favouriteBlog = (blogs) => {
  let favourite = blogs[0].likes
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favourite)
      favourite = blogs[i].likes
  }
  return favourite
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}