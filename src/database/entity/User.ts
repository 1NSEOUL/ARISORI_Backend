import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'
import { Chat } from './Chat'

@Entity()
export class User {
	@PrimaryColumn()
	id!: number

	@Column()
	name!: string

	@OneToMany(() => Chat, (Chat) => Chat.user)
	chats!: Chat[]
}
