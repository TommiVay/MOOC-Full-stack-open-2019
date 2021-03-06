const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1})
    .populate('comments', {content:1, id:1})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const token = request.token

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (body.url === undefined || body.title === undefined) {
      response.status(400).end()
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id,
        comments: body.comments
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog.toJSON())
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)

  const token = request.token

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if (blog.user.toString() != user.id.toString()) {
      return response.status(401).json({ error: 'Unauthorized' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  try {
    if (body.content === undefined) {
      response.status(400).end()
    } else {
      const blogToComment = await Blog.findById(request.params.id)
      console.log(body.content)
      const newComment = new Comment({
        content: body.content,
        blog: blogToComment._id
      })
      
      
      const comment = await newComment.save()
      blogToComment.comments = blogToComment.comments.concat(comment._id)
      await blogToComment.save()
      response.json(blogToComment.toJSON())
    }
  } catch (exception) {
    next(exception)
  }
})



module.exports = blogsRouter