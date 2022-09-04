import { Router } from "express";
import {
    createPost,
    getAll,
    getById,
    getMyPosts,
    removePost,
    updatePost,
    getPostComments
} from "../controlers/posts.js";
import { checkAuth } from "../utills/checkAuth.js";

const router = new Router()

// Create post
// http://46.63.13.13:3001/api/posts
router.post('/', checkAuth, createPost)

// Get all posts
// http://46.63.13.13:3001/api/posts
router.get('/', getAll)

// Get Post by ID
// http://46.63.13.13:3001/api/posts:id
router.get('/:id', getById)

// Get My Posts
// http://46.63.13.13:3001/api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)


// Delete Post 
// http://46.63.13.13:3001/api/posts/:id
router.delete('/:id', checkAuth, removePost)

// Update Post
// http://46.63.13.13:3001/api/posts/:id
router.put('/:id',checkAuth, updatePost)

// Get Post Comments
// http://46.63.13.13:3001/api/posts/comments/:id
router.get('/comments/:id', getPostComments)





export default router