import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { User } from '../../database/entity/User'
import { UserRepository } from '../../database/repository/Repository'
import { GlobalResponseDTO } from '../../global/res/DTO/GlobalResponseDTO'
import jwt from 'jsonwebtoken'
import { BadRequestException, ForbiddenException, InternalServerException } from '../../global/exception/exception'
import BsmOauth, { BsmOauthError, BsmOauthErrorType, StudentResource, TeacherResource } from 'bsm-oauth'
import { GlobalService } from '../../global/res/GlobalService'

dotenv.config()

const BSM_AUTH_CLIENT_ID = process.env.CLIENT_ID || ''
const BSM_AUTH_CLIENT_SECRET = process.env.CLIENT_SECRET || ''
const secretKey = process.env.SECRET_KEY || ''
const bsmOauth: BsmOauth = new BsmOauth(BSM_AUTH_CLIENT_ID, BSM_AUTH_CLIENT_SECRET)

const Login = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const authCode = req.query.code || ''
		if (!authCode) next(new BadRequestException())
		const token: string = await bsmOauth.getToken(authCode.toString())
		const resource: StudentResource | TeacherResource = await bsmOauth.getResource(token)
		const id = resource.userCode
		if ('student' in resource) {
			const { name } = resource.student
			const user = new User()
			user.id = id
			user.name = name
			await UserRepository.upsert(user, { conflictPaths: ['id'] })
		} else next(new ForbiddenException())
		const jwtToken = jwt.sign({ id }, secretKey, { expiresIn: '1h' })
		const ResponseDTO = new GlobalResponseDTO(200, 'Login Success', jwtToken)
		GlobalService(res, ResponseDTO)
	} catch (error) {
		console.log(error)
		if (error instanceof BsmOauthError) {
			switch (error.type) {
				case BsmOauthErrorType.INVALID_CLIENT: {
					next(new InternalServerException())
					break
				}
				case BsmOauthErrorType.AUTH_CODE_NOT_FOUND: {
					next(new BadRequestException())
					break
				}
				case BsmOauthErrorType.TOKEN_NOT_FOUND: {
					next(new InternalServerException())
					break
				}
			}
		} else {
			next(new InternalServerException())
		}
	}
}

export default Login
