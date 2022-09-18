import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"
import { userCreate } from "../mocks"


describe("Test for POST method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Should insert the information of the new user in the database", async () => {

        const response = await request(app).post("/users").send(userCreate)

        expect(response.status).toBe(201)

        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                name: userCreate.name,
                email: userCreate.email,
                password: userCreate.password,
                phone: userCreate.phone,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at
            })
        )
    })
})
