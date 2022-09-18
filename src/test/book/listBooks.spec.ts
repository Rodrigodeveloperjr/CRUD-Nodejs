import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"
import { userCreate, loginCreate } from "../mocks"


describe("Test for GET method in /book", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Should list all registered books", async () => {

        const token = await request(app).post("/login").send(loginCreate)

        const response = await request(app).get("/book").set("Authorization", `Bearer ${ token.body.token }`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("map")
    })
})
