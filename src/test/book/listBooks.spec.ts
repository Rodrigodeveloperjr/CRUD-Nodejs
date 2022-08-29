import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo GET em /book", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Should list all registered books", async () => {

        const response = await request(app).get("/book")

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")
    })
})
