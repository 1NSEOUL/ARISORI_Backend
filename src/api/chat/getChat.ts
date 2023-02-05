import { ChatRepository } from '@src/database/repository/Repository'
import { InternalServerException } from '@src/global/exception/exception'
import { GlobalResponseDTO } from '@src/global/res/DTO/GlobalResponseDTO'
import { GlobalService } from '@src/global/res/GlobalService'
import { NextFunction, Request, Response } from 'express'

const getChat = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const AllPost = await ChatRepository.find()
		const Dto = new GlobalResponseDTO(200, '성공', AllPost)
		GlobalService(res, Dto)
	} catch (e) {
		return next(new InternalServerException())
	}
}

export default getChat
