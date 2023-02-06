import { ChatRepository } from '../../database/repository/Repository'
import { InternalServerException } from '../../global/exception/exception'
import { GlobalResponseDTO } from '../../global/res/DTO/GlobalResponseDTO'
import { GlobalService } from '../../global/res/GlobalService'
import { NextFunction, Request, Response } from 'express'

const getChat = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const AllPost = await ChatRepository.find()
		const Dto = new GlobalResponseDTO(200, 'get chatting success', AllPost)
		GlobalService(res, Dto)
	} catch (e) {
		return next(new InternalServerException())
	}
}

export default getChat
