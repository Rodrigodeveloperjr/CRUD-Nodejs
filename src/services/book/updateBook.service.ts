import { AppDataSource } from "../../data-source"
import { Book } from "../../entities/book"
import { appError } from "../../errors/appError"


const updateBookService = async (id: string, name: string, author: string, pages: number) => {

    const bookRepository = AppDataSource.getRepository(Book)

    const books = await bookRepository.find()

    const book = books.find(u => u.id == id)

    if(!book) {

        throw new appError(404, "Book not found")
    }

    await bookRepository.update(book!.id, { name: name, author: author, pages: pages })

    return book
}

export default updateBookService
