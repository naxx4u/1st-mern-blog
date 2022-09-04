import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { checkIsAuth, logout } from "../redux/features/auth/authSlice"
import { toast } from "react-toastify"


export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth)
  const dispatch = useDispatch()

  const activeStyles = {
    color: "white",
  }

  const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem("token")
    toast("Ви вийшли з акаунта")
  }

  return (
    <div className="flex py-4 justify-between sm:flex-wrap items-center px-2">
      {/* ПОШУК */}
      <div className="flex justify-between ">
       
      </div>

      {isAuth && (
        <ul className="flex gap-8 ">
          <li>
            <NavLink
              to={"/"}
              href="/"
              className="xl:text-sm sm:text-xs text-gray-400 hover:text-white  "
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Головна
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              href="/"
              className="xl:text-sm sm:text-xs text-gray-400 hover:text-white "
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мої публікації
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/new"}
              href="/"
              className="xl:text-sm sm:text-xs text-gray-400 hover:text-white "
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Додати публікацію
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center  items-center bg-gray-600 text-xs  text-white rounded-sm xl:px-4 xl:py-2 sm:px-1 sm:py-1 sm:ml-auto xl:m-0">
        {isAuth ? (
          <button onClick={logoutHandler}>Вийти</button>
        ) : (
          <Link to={"/login"}> Увійти </Link>
        )}
      </div>
    </div>
  )
}
