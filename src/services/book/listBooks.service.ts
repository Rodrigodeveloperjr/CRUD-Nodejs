import { AppDataSource } from "../../data-source"
import { Book } from "../../entities/book"


const listBooksService = async () => {

    const bookRepository = AppDataSource.getRepository(Book)

    const users = await bookRepository.find()

    return users
}

export default listBooksService
