import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm"
import { v4 as uuid } from "uuid"
import { User } from "../users"


@Entity()
export class Book {

    @PrimaryColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    author: string

    @Column()
    pages: number

    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @OneToMany(type => User, user => user.books)
    user: User

    constructor() {

        if(!this.id) {

            this.id = uuid()
        }
    }
}
