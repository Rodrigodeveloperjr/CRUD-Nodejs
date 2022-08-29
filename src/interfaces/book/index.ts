export interface IBook {
    id: string
    name: string
    author: string
    pages: number
}

export interface IBookCreate {
    name: string
    author: string
    pages: number
}
