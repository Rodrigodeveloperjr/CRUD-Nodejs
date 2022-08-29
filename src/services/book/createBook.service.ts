import { AppDataSource } from "../../data-source"
import { Book } from "../../entities/book"
import { IBookCreate } from "../../interfaces/book"


const createBookService = async ({ name, author, pages }: IBookCreate) => {

    const bookRepository = AppDataSource.getRepository(Book)

    const book = new Book()
    book.name = name
    book.author = author
    book.pages = pages
    book.created_at = new Date()
    book.updated_at = new Date()

    bookRepository.create(book)
    await bookRepository.save(book)

    return book
}

export default createBookService
