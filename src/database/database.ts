import { DataSource } from 'typeorm'
import { User } from './entity/User'
import process from 'process'
import dotenv from 'dotenv'
dotenv.config()

console.log(__dirname)

const AppDataSource = new DataSource({
	type: 'mysql',
	host: '127.0.0.1',
	port: 3306,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	entities: [__dirname + '/entity/*.ts'],
	synchronize: true,
	logging: ['info', 'error'],
})

const DatabaseStart = () => {
	AppDataSource.initialize()
		.then(() => {
			const user = new User()
			user.id = 0
			user.name = '익명'
			AppDataSource.manager.save(user)
		})
		.catch((error) => console.log(error))
}

export { DatabaseStart, AppDataSource }
