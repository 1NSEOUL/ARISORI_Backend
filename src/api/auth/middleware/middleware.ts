import jwt, { Secret } from 'jsonwebtoken'
import { UserRepository } from '../../../database/repository/Repository'
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY: Secret | undefined = process.env.SECRET_KEY

const isLogin = async (token: string) => {
	try {
		if (!SECRET_KEY) throw new Error('SECRET_KEY NOT FOUND')
		const decodejwt = JSON.parse(JSON.stringify(<string>jwt.verify(token, SECRET_KEY)))
		const code: number = decodejwt.code
		return await UserRepository.findOneBy({ id: code })
	} catch (e) {
		return null
	}
}

export { isLogin }
