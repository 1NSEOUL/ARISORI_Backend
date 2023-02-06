import express from 'express'
import CheckUserInfo from './checkUserInfo'
import Login from './Login'
const router = express.Router()

router.post('/', Login)
router.get('/user', CheckUserInfo)

export default router
