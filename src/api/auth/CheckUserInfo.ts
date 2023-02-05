import { UnAuthorizedException } from '@src/global/exception/exception'
import { GlobalResponseDTO } from '@src/global/res/DTO/GlobalResponseDTO'
import { GlobalService } from '@src/global/res/GlobalService'
import { NextFunction, Request, Response } from 'express'
import { isLogin } from './middleware/middleware'

const CheckUserInfo = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user = await isLogin(req.headers.authorization!)
		if (!user) return next(new UnAuthorizedException())
		GlobalService(res, new GlobalResponseDTO(200, 'Success', user))
	} catch (error) {
		next(error)
	}
}

export default CheckUserInfo
