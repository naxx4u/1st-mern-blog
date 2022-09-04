import Comment from '../models/Comment.js'
import Post from '../models/Post.js'
import User from '../models/User.js'



export  const createComment = async (req, res) => {
    try {
        
        const {postId, comment} = req.body
        const user = await User.findById(req.ObjectId)
        
        if(!comment) 
        return res.json({message: 'Коментар не може бути пустим'})


        const newComment = new Comment({comment, username: user.username})
        await newComment.save()
        

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: {comments: newComment._id, }
            })
        } catch (error) {
            console.log(error);
        }

        res.json(newComment)
    } catch (error) {
        res.json({message: 'Щось пішло не так з коментарем'})
    }
}



export  const removeComment = async (req, res) => {
   try {
    
    const  comment = req.params.id
   
   
  
    const commentDelete  =  await Comment.findByIdAndDelete(comment)
    if (!commentDelete) return res.json({ message: 'Такого комента не існує' })

    // try {
    //     await Post.findOneAndUpdate(postId, {
    //         $pull: {comments: req.params.id }
    //     })
    // } catch (error) {
    //     console.log(error);
    // }
  
    
   } catch (error) {
    console.log(error);
   }

}


