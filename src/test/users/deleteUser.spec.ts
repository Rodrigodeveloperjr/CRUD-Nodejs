import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"
import { userDeleted } from "../mocks"


describe("Test for DELETE method in /users", () => {

    let connection: DataSource

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        response1 = await request(app).post("/users").send(userDeleted)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete a user", async () => {

        const response = await request(app).delete(`/users/${response1.body.id}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
    })

    test("Trying to delete a non-existent user", async () => {

        const response = await request(app).delete("/users/12")

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
