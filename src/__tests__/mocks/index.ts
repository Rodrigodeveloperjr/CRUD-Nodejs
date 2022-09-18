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

export const userCreate: IUserCreate = {
    name: "example",
    email: "example@org.com.br",
    password: "example",
    phone: "99 99999-9999"
}

export const userUpdated: IUserCreate = {
    name: "rodrigo",
    email: "rodrigonohype@gmail.com",
    password: "52640894854",
    phone: "11995324335"
}

export const loginCreate: IUserLogin = {
    email: "example@org.com.br",
    password: "example"
}

export const loginInvalid: IUserLogin = {
    email: "rodrigo@org.com.br",
    password: "example.org"
}
