const dummy = (blogs) => {
  console.log(blogs)
  return 1
}

const totalLikes = (blogs) => {
  let likes = 0

  blogs.forEach(blog => {
    likes = likes + blog.likes
  })
  return likes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = {
    title: "",
    author: "",
    likes: 0
  }

  blogs.forEach(blog => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  })

  return favoriteBlog

}

// EJ 4.6, TODO
// const mostBlogs = (blogs) => {
//   let authorMostBlogs = ""

//   return authorMostBlogs
// }

//EJ 4.7, TODO, ahora funciona para un solo blog, tengo que sumar los likes de todos los blogs de una persona!!
const mostLikes = (blogs) => {
  let mostLikes = {
    author: "",
    likes: 0
  }

  blogs.forEach(blog => {
    if (blog.likes > mostLikes.likes) {
      mostLikes = blog
    }
  })

  return {
    author: mostLikes.author,
    likes: mostLikes.likes
  }
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  //mostBlogs
}