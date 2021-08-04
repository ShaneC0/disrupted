import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { Length } from "class-validator";
import {Server} from './Server'
import { Message } from "./Message";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2, 20)
    username: string

    @Column()
    @Length(5)
    password: string;

    @OneToMany(() => Message, message => message.user)
    messages: Message[]

    @ManyToMany(() => Server, server => server.users)
    @JoinTable()
    servers: Server[]
}