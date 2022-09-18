import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import createBookService from "../../../services/book/createBook.service"
import deleteBookService from "../../../services/book/deleteBook.service"
import { bookCreate } from "../../mocks"


describe("Test unit for DELETE method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete a book unit test", async () => {

        const book = await createBookService(bookCreate)

        const result = await deleteBookService(book.id)

        expect(result).toHaveProperty("message")
    })
    
    test("Trying to delete a non-existent book unit test", async () => {

        expect(async () => await deleteBookService("1")).rejects.toThrow("Book not found")
    })
})
