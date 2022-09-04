import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


//Create post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.ObjectId)



        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

            const newPostWithImage = new Post({
                username: user.username,
                title,
                text,
                imgUrl: fileName,
                author: req.ObjectId
            })

            await newPostWithImage.save()
            await User.findByIdAndUpdate(req.ObjectId, {
                $push: { posts: newPostWithImage },
            })

            return res.json(newPostWithImage)
        }

        const newPostWithoutImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.ObjectId
        })

        await newPostWithoutImage.save()
        await User.findByIdAndUpdate(req.ObjectId, {
            $push: { posts: newPostWithoutImage },

        })

        return res.json(newPostWithoutImage)

    } catch (error) {
        res.json({ message: "Щось пішло не так" })

    }
}


//Get all posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')


        if (!posts) {
            return res.json({ message: 'Публікації немає' })
        }
        return res.json({ posts, popularPosts })
    } catch (error) {
        res.json({ message: 'Щось пішло не так' })
    }
}

//Get  posts by ID
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 }
        })

        return res.json(post)
    } catch (error) {
        res.json({ message: 'Щось пішло не так' })
    }
}


//Get My posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.ObjectId)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            })
        )
        res.json(list)

    } catch (error) {
        res.json({ message: 'Щось пішло не так' })
    }
}

//Delete Post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.json({ message: 'Такої публікації не існує' })

        await User.findByIdAndUpdate(req.ObjectId, {
            $pull: { posts: req.params.id }
        })


        res.json({ message: 'Публікація була видалена' })

    } catch (error) {
        res.json({ message: 'Щось пішло не так' })
    }
}

//Update Post 
export const updatePost = async (req, res) => {
    try {
    
        const {title, text, id} = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()

        res.json({post})
    } catch (error) {
        res.json({ message: 'Щось пішло не так' })
    }
}

//Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments?.map((comment) => {
                
                return Comment.findById(comment)
                
            })
        )
        
        

        res.json(list)

    } catch (error) {
        res.json({ message: 'Щось пішло не так (з коментом)' })
    }
}