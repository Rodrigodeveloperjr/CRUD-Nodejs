import { AppDataSource } from "../../data-source"
import { Book } from "../../entities/book"
import { appError } from "../../errors/appError"


const deleteBookService = async (id: string) => {

    const bookRepository = AppDataSource.getRepository(Book)

    const books = await bookRepository.find()

    const book = books.find(u => u.id == id)

    if(!book) {

        throw new appError(404, "Book not found")
    }

    await bookRepository.delete(book!.id)

    return { message: "Book deleted with sucess!" }
}

export default deleteBookService
