import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Server } from "./Server";
import { Message } from "./Message";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2, 20)
    name: string

    @ManyToOne(() => Server, server => server.channels)
    server: Server

    @OneToMany(() => Message, message => message.channel)
    messages: Message[]
}