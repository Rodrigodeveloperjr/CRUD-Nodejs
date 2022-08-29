import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo POST em /book", () => {

    let connection: DataSource

    let bookData = {
        name: "HTML and CSS: Design and Build Websites",
        author: "Jon Duckett",
        pages: 512
    }

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Should insert the information of the new book in the database", async () => {

        const response = await request(app).post("/book").send(bookData)

        expect(response.status).toBe(201)

        expect(response.body).toEqual(
            expect.objectContaining({
                name: bookData.name,
                author: bookData.author,
                pages: bookData.pages
            })
        )
    })
})
