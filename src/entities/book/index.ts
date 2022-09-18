import { Entity, Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { User } from "../users"


@Entity("book")
export class Book {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    author: string

    @Column()
    pages: number

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @OneToMany(type => User, user => user.books)
    user: User

    constructor() {

        if(!this.id) {

            this.id = uuid()
        }
    }
}
