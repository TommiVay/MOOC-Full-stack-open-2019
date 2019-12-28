var fp = require('lodash/fp');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) =>
        sum + blog.likes, 0)

}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return null
    }
    return blogs.reduce((max, newo) =>
        (max.likes >= newo.likes) ? max : newo)
}


const mostBlogs = (blogs) => {
    let authors = blogs.map(b => b.author)
    authors = [...new Set(authors)]

    const maxBlogs = {
        author: "",
        blogs: 0
    }

    for(let i = 0; i<authors.length; i++){
        let authorsBlogs = blogs.filter( b => b.author === authors[i])
        if(authorsBlogs.length > maxBlogs.blogs){
            
            maxBlogs.author = authors[i]
            maxBlogs.blogs = authorsBlogs.length
        }
    }
    
    return maxBlogs
}

const mostLikes = (blogs) => {
    let authors = blogs.map(b => b.author)
    authors = [...new Set(authors)]
    let mostLiked = {
        author: "",
        likes: 0
    }
    
    for(let i = 0; i<authors.length; i++){
        let authorsBlogs = blogs.filter( b => b.author === authors[i])
        let likesArray = authorsBlogs.map(b=> b.likes)
        let likesCount = likesArray.reduce((a,b) => a+b, 0)

        if(likesCount > mostLiked.likes){
            mostLiked.author = authors[i]
            mostLiked.likes = likesCount
        }
    }
    return mostLiked
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}