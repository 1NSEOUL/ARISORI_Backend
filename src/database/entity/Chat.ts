import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm'
import { User } from '@src/database/entity/User'

@Entity()
export class Chat {
	@PrimaryGeneratedColumn()
	chatCode!: number

	@Column('text')
	contents!: string

	@CreateDateColumn()
	createdAt!: Date

	@ManyToOne(() => User, (user) => user.chats, { eager: true })
	user!: User
}
