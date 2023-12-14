const Blog = require('../models/Blog')
const User = require('../models/User')

const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find({})

        res.json({ data: blogs, error: [] })
    } catch (err) {
        next(err)
    }
}
const getBlogById = async (req, res, next) => {
    try {
        const { id } = req.params
        const blog = await Blog.findById(id)

        if (!blog) return res.status(404).json({ data: [], error: ['Blog was not found'] })

        res.json({ data: blog, error: [] })
    } catch (err) {
        next(err)
    }
}
const createBlog = async (req, res, next) => {
    try {
        const { userId, title, content } = req.body

        const owner = await User.findById(userId)

        if (!owner) return res.status(400).json({ data: [], error: ['User doesn\'t exist'] })

        const blog = new Blog({ title, content })
        await blog.save()

        owner.blogs.push(userId)
        await owner.save()

        res.status(201).json({ data: blog, error: [] })
    } catch (err) {
        next(err)
    }
}
const updateBlog = (req, res, next) => { }

const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params
        const blog = await Blog.findByIdAndDelete(id)

        if (!blog) return res.status(400).json({ data: [], error: ['Blog was not found'] })

        res.json({ data: blog, error: [] })
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
}