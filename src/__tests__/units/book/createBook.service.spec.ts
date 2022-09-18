import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import createBookService from "../../../services/book/createBook.service"
import { bookCreate } from "../../mocks"


describe("Test unit for POST method in /book", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create a new book unit", async () => {

        const result = await createBookService(bookCreate)

        expect(result).toHaveProperty("id")
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("author")
        expect(result).toHaveProperty("pages")
    })
})
