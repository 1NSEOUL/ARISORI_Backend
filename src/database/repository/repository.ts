import { AppDataSource } from '../Database'
import { Chat } from '../entity/Chat'
import { User } from '../entity/User'

const ChatRepository = AppDataSource.getRepository(Chat)
const UserRepository = AppDataSource.getRepository(User)

export { ChatRepository, UserRepository }
