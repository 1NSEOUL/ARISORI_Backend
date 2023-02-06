import express from 'express'
const router = express.Router()
import authController from './api/auth/auth.controller'
import chatController from './api/chat/chat.controller'

router.use('/oauth', authController)
router.use('/chat', chatController)

export default router
