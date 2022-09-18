import { AppDataSource } from "../../data-source"
import { Book } from "../../entities/book"
import { appError } from "../../errors/appError"


const updateBookService = async (id: string, name: string, author: string, pages: number) => {

    const bookRepository = AppDataSource.getRepository(Book)

    const book = await bookRepository.findOne({
        where: {
            id: id
        }
    })

    if(!book) {

        throw new appError(404, "Book not found")
    }

    await bookRepository.update(book!.id, { name: name, author: author, pages: pages, updated_at: new Date() })

    return book
}

export default updateBookService
