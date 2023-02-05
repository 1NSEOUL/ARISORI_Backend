import dotenv from 'dotenv'
import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'

dotenv.config()

const app = express()

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

import controller from './controller'
import { HttpError } from './global/exception/exception'
import { GlobalResponseDTO } from './global/res/DTO/GlobalResponseDTO'
import { GlobalResponseService } from './global/res/GlobalService'

app.use('/', controller)

app.use(((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	const { httpCode, message } = err
	const response = new GlobalResponseDTO(httpCode ?? 500, message ?? 'Internal Server Error', null)
	GlobalResponseService(res as Response, response)
}) as ErrorRequestHandler)

app.listen(8085)
