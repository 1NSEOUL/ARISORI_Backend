import { Chat } from '../../database/entity/Chat'
import { ChatRepository } from '../../database/repository/Repository'
import { InternalServerException, UnAuthorizedException } from '../../global/exception/exception'
import { GlobalResponseDTO } from '../../global/res/DTO/GlobalResponseDTO'
import { GlobalService } from '../../global/res/GlobalService'
import { NextFunction, Request, Response } from 'express'
import { isLogin } from '../auth/middleware/middleware'

const sendChat = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { contents } = req.body
		const User = await isLogin(req.headers.authorization!).catch((e) => {
			return next(new UnAuthorizedException())
		})
		if (!User) return next(new UnAuthorizedException())
		const chat = new Chat()
		chat.contents = contents

		chat.user = User!
		await ChatRepository.save(chat)
		const DTO = new GlobalResponseDTO(200, 'send chatting success', chat)
		GlobalService(res, DTO)
	} catch (e) {
		console.log(e)
		return next(new InternalServerException())
	}
}

export default sendChat
