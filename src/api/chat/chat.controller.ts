import express from 'express'
const router = express.Router()
import sendChat from '@src/api/chat/sendChat'
import getChat from './getChat'

router.get('/', getChat)
router.post('/send', sendChat)

export default router
