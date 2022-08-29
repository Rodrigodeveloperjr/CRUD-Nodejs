import { Entity, PrimaryColumn, Column, JoinTable, ManyToMany } from "typeorm"
import { v4 as uuid } from "uuid"
import { Book } from "../book"


@Entity()

export class User {

    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @ManyToMany(type => Book ,{
        eager: true
    })@JoinTable()
    books: Book[]

    constructor() {

        if(!this.id) {

            this.id = uuid()
        } 
    }
}
