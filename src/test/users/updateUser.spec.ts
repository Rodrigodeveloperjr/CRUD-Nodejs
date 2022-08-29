import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo PATCH em /users", () => {

    let connection: DataSource

    let testUser = {
        name: "rodrigo",
        email: "rodrigo@gmail.com",
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

    test("Tentando atualizar um user", async () => {

        const response = await request(app).patch(`/users/${response1.body.id}`)

        expect(response.status).toEqual(200)
        expect(response.body).toHaveProperty("message")

        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                name: testUser.name,
                email: testUser.email,
                phone: testUser.phone,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at
            })
        )
    })
    
    test("Tentando atualizar um user inexistente", async () => {

        const response = await request(app).patch("/users/12")

        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
    })
})
