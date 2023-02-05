import { DataSource } from 'typeorm'
import { User } from '@database/entity/User'
import { Chat } from '@database/entity/chat'
import process from 'process'
import dotenv from 'dotenv'
dotenv.config()

const AppDataSource = new DataSource({
	type: 'mysql',
	host: 'localhost',
	port: 8085,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	entities: [User, Chat],
	synchronize: true,
	logging: ['info', 'error'],
})

const DatabaseStart = () => {
	AppDataSource.initialize()
		.then(() => {
			const user = new User()
			user.id = -1
			user.name = '익명'
			AppDataSource.manager.save(user)
		})
		.catch((error) => console.log(error))
}

export { DatabaseStart, AppDataSource }
