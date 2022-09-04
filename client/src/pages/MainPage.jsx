import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { PopularPosts } from "../components/PopularPosts"
import { PostItem } from "../components/PostItem"
import { getAllPosts } from "../redux/features/post/postSlice"
import { TbHandClick } from "react-icons/tb"
import { Search } from "../components/Search"

export const MainPage = () => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector((state) => state.post)
  const [showPopular, setShowPopular] = useState(false)

  const [value, setValue] = useState("")

  const filteredPosts = posts.filter((post) => {
    return post.title.toLowerCase().includes(value.toLowerCase())
  })

  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        Публікацій не існує
      </div>
    )
  }

  return (
    <div className="max-w-[900px] mx-auto xl:py-10 sm:py-5">
      {/* ПОШУК */}
      <Search setValue={setValue} />
      {/* Популярні публікації */}
      <button
        onClick={() => setShowPopular(!showPopular)}
        className="xl:flex sm:flex justify-between gap-2 text-xs py-2 px-2 sm:mx-auto mb-4  text-center uppercase text-white border-double border   rounded-xl xl:hover:border-blue-300 xl:hover:text-blue-300	"
      >
        Популярні публікації
        <TbHandClick className="text-[15px]" />
      </button>

      {showPopular ? (
        <div className="xl:flex sm:flex sm:justify-center sm:flex-col sm:flex-1 sm:flex-wrap  sm:mx-auto sm:mb-2  sm:w-1/2 ">
          {popularPosts?.map((post, idx) => (
            <PopularPosts key={idx} post={post} />
          ))}
        </div>
      ) : (
        false
      )}

      {/* ПОСТИ */}
      <div className="flex justify-between sm:justify-center  gap-8">
        <div className="flex flex-col gap-10 basis-2/3">
          {filteredPosts.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>

      </div>
    </div>
  )
}
