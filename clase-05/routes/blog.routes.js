const { getAllBlogs, createBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blog.controller')
const { validateBlogData } = require('../middlewares/blog.middlewares')
const { validateMongoId } = require('../middlewares/common.middleware')

const blogRouter = require('express').Router()

blogRouter.get('/', getAllBlogs)
blogRouter.post('/', validateBlogData, createBlog)

blogRouter.get('/:id', validateMongoId, getBlogById)
blogRouter.patch('/:id', validateMongoId, updateBlog)
blogRouter.delete('/:id', validateMongoId, deleteBlog)

module.exports = blogRouter