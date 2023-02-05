import { Chat } from '@src/database/entity/Chat'
import { ChatRepository } from '@src/database/repository/Repository'
import { InternalServerException, UnAuthorizedException } from '@src/global/exception/exception'
import { GlobalResponseDTO } from '@src/global/res/DTO/GlobalResponseDTO'
import { GlobalService } from '@src/global/res/GlobalService'
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
		const DTO = new GlobalResponseDTO(200, 'success', chat)
		GlobalService(res, DTO)
	} catch (e) {
		console.log(e)
		return next(new InternalServerException())
	}
}

export default sendChat
