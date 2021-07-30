import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { Length } from "class-validator";
import { User } from "./User";

@Entity()
export class Server {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2, 20)
    name: string

    @ManyToMany(() => User, user => user.servers)
    users: User[]
}