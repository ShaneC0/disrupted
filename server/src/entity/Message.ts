import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(1, 255)
    text: string

    @ManyToOne(() => Channel, channel => channel.messages)
    channel: Channel

    @ManyToOne(() => User, user => user.messages)
    user: User
}