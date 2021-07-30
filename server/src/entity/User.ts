import {Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm";
import { Length } from "class-validator";
import {Server} from './Server'

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

    @ManyToMany(() => Server, server => server.users)
    @JoinTable()
    servers: Server[]
}