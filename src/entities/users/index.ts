import { Entity, Column, JoinTable, ManyToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { v4 as uuid } from "uuid"
import { Book } from "../book"


@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    phone: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
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
