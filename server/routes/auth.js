import { Router } from "express";
import {register, login, getMe} from '../controlers/auth.js'
import { checkAuth } from "../utills/checkAuth.js";

const router = new Router()
 
//Register http://46.63.13.13:3001/api/auth/register
router.post('/register',register)

//Login http://46.63.13.13:3001/api/auth/login
router.post('/login',login)

//Get Me http://46.63.13.13:3001/api/auth/me
router.get('/me', checkAuth, getMe)

export default router