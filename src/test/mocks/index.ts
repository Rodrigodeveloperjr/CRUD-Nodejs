import { IBookCreate } from "../../interfaces/book"
import { IUserCreate, IUserLogin } from "../../interfaces/users"


export const bookCreate: IBookCreate = {
    name: "HTML and CSS: Design and Build Websites",
    author: "Jon Duckett",
    pages: 512
}

export const bookUpdated: IBookCreate = {
    name: "PHP & MySQL: Server-Side Web Development",
    author: "Jon Duckett",
    pages: 672
}

export const bookDeleted: IBookCreate = {
    name: "JavaScript and Jquery: Interactive Front-End Web Development",
    author: "Jon Duckett",
    pages: 640
}

export const userCreate: IUserCreate = {
    name: "rodrigo",
    email: "rodrigo@gmail.com",
    password: "52640894854",
    phone: "11995324335"
}

export const userUpdated: IUserCreate = {
    name: "rodrigo",
    email: "rodrigonohype@gmail.com",
    password: "52640894854",
    phone: "11995324335"
}

export const userDeleted: IUserCreate = {
    name: "rodrigo",
    email: "rodrigojsdeveloper@gmail.com",
    password: "52640894854",
    phone: "11995324335"
}

export const loginCreate: IUserLogin = {
    email: "rodrigo@gmail.com",
    password: "52640894854"
}

export const loginInvalid: IUserLogin = {
    email: "example@org.com",
    password: "123example"
}
