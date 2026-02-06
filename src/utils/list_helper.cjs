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

//most blogs? funktio joka saa parametriksi taulukollinen blogeja
//millä kirjoittajalla on eniten blogeja? palauttaa objektin muodossa {author: "Edsger W. Dijkstra", blogs: 2}
const mostBlogs = (blogs) => {
  let listOfAuthors = []
  for (let i = 0; i < blogs.length; i++)
    listOfAuthors.push(blogs[i].author)
  let max = 0
  let author = ""
  const apulista = {}
  for (let i = 0; i < listOfAuthors.length; i++) {
    apulista[listOfAuthors[i]] = (apulista[listOfAuthors[i]] || 0) + 1
    if (apulista[listOfAuthors[i]] > max) {
      max = apulista[listOfAuthors[i]]
      author = listOfAuthors[i]
    }
  }
  return { author: author, blogs: max }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}