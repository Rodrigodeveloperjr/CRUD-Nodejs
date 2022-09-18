import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import app from "../../../app"
import request from "supertest"


describe("Test for GET method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to list all the users", async () => {

        const response = await request(app).get("/users")

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")
    })
})
