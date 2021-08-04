import {Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Channel } from "./Channel";

@Entity()
export class Server {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2, 20)
    name: string

    @OneToMany(() => Channel, channel => channel.server)
    channels: Channel[]

    @ManyToMany(() => User, user => user.servers)
    users: User[]
}