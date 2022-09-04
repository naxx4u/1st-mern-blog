import React, { useCallback, useEffect, useState } from "react";
import {
  AiFillEye,
  AiTwotoneEdit,
  AiFillDelete,
  AiOutlineMessage
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { useParams, Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { removePost } from "../redux/features/post/postSlice";
import axios from "../utils/axios";
import { createComment, getPostComments } from "../redux/features/comment/commentSlice";
import { CommentItem } from "../components/CommentItem";


export const PostPage = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');




  const { user } = useSelector((state) => state.auth);
  const { comments } = useSelector((state) => state.comment)

  const navigate = useNavigate()
  const params = useParams();
  const dispatch = useDispatch();

  const removePostHandler = () => {
    try {
      
      dispatch(removePost(params.id))
      toast('Публікація видалена')
      navigate('/posts')
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = () => {
    try {
      const postId = params.id
      dispatch(createComment({postId, comment}))
      setComment('')
      
    } catch (error) {
      console.log(error);
    }
  }

  const fetchComments = useCallback(async () => {
    try {

      dispatch(getPostComments(params.id))
      
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);
    setPost(data);
  }, [params.id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        Завантаження...
      </div>
    );
  }

  return (
    <div>
      <button className="flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm xl:py-2 xl:px-4 sm:py-1 sm:px-2 xl:m-0  sm:ml-1">
        <Link to={"/"}>Назад</Link>
      </button>
    {/* Сама публікація*/}
      <div className="flex sm:flex-col xl:flex-row gap-10 py-8">
        <div className="xl:w-2/3 sm:w-4/5 sm:mx-auto">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={
                post?.imgUrl ? "flex rounded-sm h-100" : " flex rounded-sm"
              }
            >
              {post?.imgUrl && (
                <img
                  src={`http://46.63.13.13:3001/${post.imgUrl}`}
                  alt="img"
                  className="object-cover w-full"
                />
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs text-white opacity-50">{post.username}</div>
            <div className="text-xs text-white opacity-50">
              <Moment date={post.createdAt} format="D MMM YYYY" />
            </div>
          </div>

          <div className="text-white text-xl">{post.title}</div>
          <p className="text-white opacity-60 text-xs pt-4 whitespace-pre-line">{post.text}</p>

          <div className="flex gap-3 items-center mt-2 justify-between">
            <div className="flex gap-3 mt-4">
              <button className="flex items-center justify-center opacity-50 text-white ">
                <AiFillEye />
                <span>{post.views}</span>
              </button>

              <button className="flex items-center justify-center opacity-50 text-white ">
                <AiOutlineMessage />
                <span>{post.comments?.lenght || 0}</span>
              </button>
            </div>

            {user?._id === post.author && (
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center opacity-50 text-white">
                  <Link to={`/${params.id}/edit`}>
                  <AiTwotoneEdit />
                  </Link>
                </button>

                <button 
                onClick={removePostHandler}
                className="flex items-center justify-center opacity-50 text-rose-600 text-xl">
                  <AiFillDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Комент до публікації */}
        <div className=" xl:w-1/3 sm:w-4/5 sm:mx-auto p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">

              <form
               className="flex gap-2 " onSubmit={e => e.preventDefault()}>
                  <input
                   type="text"
                   value={comment}
                   onChange={e => setComment(e.target.value)}
                   placeholder="Введіть коментар..."
                   className="text-black xl:w-full sm:w-3/4 rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
                    />
                   <button
                   type="submit"
                   onClick={handleSubmit}
                   className="flex justify-center items-center sm:w-1/4 bg-gray-600 text-[10px] text-white rounded-sm py-2 px-4"
                   >
                    Відправити
                  </button> 
              </form>

              {
                comments?.map((cmt) => ( cmt ?
                  <CommentItem  key={cmt._id} cmt={cmt} /> : null
                )) 
              }

        </div>
      </div>
    </div>
  );
};
