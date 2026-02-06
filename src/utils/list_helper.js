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


module.exports = {
  dummy,
  totalLikes
}