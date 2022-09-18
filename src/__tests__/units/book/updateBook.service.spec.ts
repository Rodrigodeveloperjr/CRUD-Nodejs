import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import createBookService from "../../../services/book/createBook.service"
import updateBookService from "../../../services/book/updateBook.service"
import { bookCreate } from "../../mocks"


describe("Test unit for PATCH method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a book unit test", async () => {

        const book = await createBookService(bookCreate)

        const result = await updateBookService(book.id, book.name, book.author, book.pages)

        expect(result).toHaveProperty("id")
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("author")
        expect(result).toHaveProperty("pages")
    })
    
    test("Trying to update a non-existent book unit test", async () => {

        expect(async () => await updateBookService("1", "PHP & MySQL: Server-Side Web Development", "Jon Duckett", 672)).rejects.toThrow("Book not found")
    })
})
