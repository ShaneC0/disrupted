import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";
import { Server } from "./Server";

@Entity()
export class Channel {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2, 20)
    name: string

    @ManyToOne(() => Server, server => server.channels)
    server: Server
}