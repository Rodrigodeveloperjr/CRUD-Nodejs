import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo DELETE em /users", () => {

    let connection: DataSource

    interface User {
        name: string
        email: string
        password: string
        phone: string
    }

    let testUser: User = {
        name: "rodrigo",
        email: "rodrigonohype@gmail.com",
        password: "52640894854",
        phone: "11995324335"
    }

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        response1 = await request(app).post("/users").send(testUser)
    })

    afterAll(async () => await connection.destroy())

    test("Tentando deletar um user", async () => {

        const response = await request(app).delete(`/users/${response1.body.id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
    })

    test("Tentando deletar um user inexistente", async () => {

        const response = await request(app).delete("/users/12")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
