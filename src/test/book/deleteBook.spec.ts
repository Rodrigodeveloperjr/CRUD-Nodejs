import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo DELETE em /book", () => {

    let connection: DataSource

    interface Book {
        name: string
        author: string
        pages: number
    }

    let testBook: Book = {
        name: "PHP & MySQL: Server-Side Web Development",
        author: "Jon Duckett",
        pages: 672
    }

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        response1 = await request(app).post("/book").send(testBook)
    })

    afterAll(async () => await connection.destroy())

    test("Tentando deletar um book", async () => {

        const response = await request(app).delete(`/book/${response1.body.id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
    })
    
    test("Tentando deletar um book inexistente", async () => {
        
        const response = await request(app).delete("/book/21")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
