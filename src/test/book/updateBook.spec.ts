import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo PATCH em /book", () => {

    let connection: DataSource

    let testBook = {
        name: "JavaScript and Jquery: Interactive Front-End Web Development",
        author: "Jon Duckett",
        pages: 640
    }

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.log("Error during Data Source initialization", err))

        response1 = await request(app).post("/book").send(testBook)
    })

    afterAll(async () => await connection.destroy())

    test("Tentando atualizar um book", async () => {

        const response = await request(app).patch(`/book/${response1.body.id}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")

        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                name: testBook.name,
                author: testBook.author,
                pages: testBook.pages,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at
            })
        )
    })

    test("Tentando atualizar um book inexistente", async () => {

        const response = await request(app).patch("/book/12")

        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
    })
})
