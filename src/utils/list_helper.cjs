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

const mostLikes = (blogs) => {
  let apulista = {}
  let listOfAuthors = []
  let listofLikes = []
  let max = 0
  let author = ""
  for (let i = 0; i < blogs.length; i++){
    listOfAuthors.push(blogs[i].author)
    listofLikes.push(blogs[i].likes)
  }
  console.log(listOfAuthors, listofLikes)
  //tehdään tuple lista
  let tupleList = []
  for (let i = 0; i < blogs.length; i++) {
    console.log("moi", i, tupleList, listOfAuthors[i], listofLikes[i])
    const existing = tupleList.find(t => t[0] === listOfAuthors[i])
    console.log(existing,"testi")
    console.log(existing, listOfAuthors[i], listofLikes[i])

    if (existing) {
      existing[1] += listofLikes[i]
      console.log("on jo listalla")

    } else {
      tupleList.push([listOfAuthors[i], listofLikes[i]])
      console.log("ei ole listalla, lisätään", listOfAuthors[i], listofLikes[i])
    }
  for (let i =0; i < tupleList.length; i++){
    if (tupleList[i][1] > max) {
      max = tupleList[i][1]
      author = tupleList[i][0]
    }
  }
  }
  console.log(author,max)
  return { author: author, likes: max }
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}