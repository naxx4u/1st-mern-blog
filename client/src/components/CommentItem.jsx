import React from "react"
import { AiFillDelete } from "react-icons/ai"
import {removeComment} from '../redux/features/comment/commentSlice'
import {useDispatch, } from "react-redux"
import {toast} from 'react-toastify'


export const CommentItem = ({cmt}) => {
  const avatar = cmt.username.slice(0, 1)
  const dispatch = useDispatch()

  const removeCommentHandler = () => {
    try {
     dispatch(removeComment(cmt._id))
    
     toast('Коментар видалений')
    } catch (error) {
     console.log(error);
    }
   }




  return (
    <div className="flex  items-center gap-3 ">
      <div className="flex items-center justify-center shrink-0 w-10 h-10 bg-blue-300 text-sm rounded-full">
        {avatar}
      </div>

      <div className="flex  text-gray-300 text-[10px]">{cmt.comment}</div> 
      
      <div className="text-red-500  text-[18px] hover:text-xl hover:text-red-600  ease-linear cursor-pointer">
      <AiFillDelete
      onClick={removeCommentHandler}
      />
      </div>
    </div> 
  )
}
