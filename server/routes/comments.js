import { Router} from 'express'
const router = new Router()

import { checkAuth } from "../utills/checkAuth.js";
import {createComment, removeComment} from '../controlers/comments.js'

//Create Comment
//http://46.63.13.13:3001/api/comments/:id
router.post('/:id', checkAuth, createComment)


router.delete('/:id', checkAuth, removeComment)

export default router