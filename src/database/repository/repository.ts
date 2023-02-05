import { AppDataSource } from '@database/Database'
import { Chat } from '@database/entity/Chat'
import { User } from '@database/entity/User'

const ChatRepository = AppDataSource.getRepository(Chat)
const UserRepository = AppDataSource.getRepository(User)

export { ChatRepository, UserRepository }
