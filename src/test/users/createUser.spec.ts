import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"


describe("Teste para o metodo POST em /users", () => {

    let connection: DataSource

    let testUser = {
        name: "rodrigo",
        email: "rodrigo@gmail.com",
        phone: "11995324335"
    }

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Should insert the information of the new user in the database", async () => {

        const response = await request(app).post("/users").send(testUser)

        expect(response.status).toBe(201)

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
})
