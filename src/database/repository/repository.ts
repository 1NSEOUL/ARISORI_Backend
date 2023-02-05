import { AppDataSource } from '@database/Database'
import { Chat } from '@database/entity/Chat'
import { User } from '@database/entity/User'

const PostRepository = AppDataSource.getRepository(Chat)
const UserRepository = AppDataSource.getRepository(User)

export { PostRepository, UserRepository }
