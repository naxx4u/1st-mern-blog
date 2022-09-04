import React from 'react'

import { BiSearchAlt } from "react-icons/bi"


export const Search = ({ setValue}) => {
 
  return (
    <div className="flex xl:w-full xl:justify-center sm:w-80 mx-auto mb-4">
         
    <form >
      <input
        onChange={e => setValue(e.target.value)}
        type="text"
        placeholder="Пошук..."
        className="xl:px-auto xl:w-64  sm:w-[315px] h-5 pl-2 outline-none rounded-sm  text-sm 
    text-white placeholder:text-gray-700 bg-gray-400 focus:bg-blue-300
    focus:border-2 focus:border-gray-400 ease-in duration-100  text-center placeholder:text-center "
      />
    </form>
  
  
  <button
    
    className="text-xl outline-none xl:hover:text-2xl  text-gray-400 ease-in duration-200 xl:z-0 sm:z-10 sm:opacity-100"
  >
    <BiSearchAlt />
  </button>
</div>
  )
}
