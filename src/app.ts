import dotenv from 'dotenv'
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import { DatabaseStart } from './database/Database'
import controller from './controller'
import { HttpError } from './global/exception/exception'
import { GlobalResponseDTO } from './global/res/DTO/GlobalResponseDTO'
import { GlobalService } from './global/res/GlobalService'

dotenv.config()

const app = express()

DatabaseStart()

app.use(
	helmet({
		contentSecurityPolicy: false,
	})
)
app.use(helmet.dnsPrefetchControl())
app.use(helmet.expectCt())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.permittedCrossDomainPolicies())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())

app.use(cookieParser())
app.use(cors())
app.use(express.json())

app.use('/api', controller)

app.use(((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	const { httpCode, message } = err
	const response = new GlobalResponseDTO(httpCode ?? 500, message ?? 'Internal Server Error', null)
	GlobalService(res as Response, response)
}) as ErrorRequestHandler)

app.listen(8085)
