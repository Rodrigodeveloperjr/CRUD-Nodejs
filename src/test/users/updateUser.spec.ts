import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"
import { userUpdated } from "../mocks"


describe("Test for PATCH method in /users", () => {

    let connection: DataSource

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        response1 = await request(app).post("/users").send(userUpdated)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a user", async () => {

        const response = await request(app).patch(`/users/${response1.body.id}`)

        expect(response.status).toBe(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                name: userUpdated.name,
                email: userUpdated.email,
                password: userUpdated.password,
                phone: userUpdated.phone,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at
            })
        )
    })
    
    test("Trying to delete a non-existent user", async () => {

        const response = await request(app).patch("/users/12")

        expect(response.status).toEqual(404)
        expect(response.body).toHaveProperty("message")
    })
})
