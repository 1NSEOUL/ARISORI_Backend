import express from 'express'
const router = express.Router()
import authController from '@src/api/auth/auth.controller'
import chatController from '@src/api/chat/chat.controller'

router.use('/oauth', authController)
router.use('/chat', chatController)

export default router
