import { Response } from 'express'
import { GlobalResponseDTO } from './DTO/GlobalResponseDTO'

const GlobalService = (res: Response, ResDto: GlobalResponseDTO) => {
	res.status(ResDto.status).json(ResDto)
}
export { GlobalService }
