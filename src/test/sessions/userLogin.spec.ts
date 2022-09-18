import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../app"
import { AppDataSource } from "../../data-source"
import { userCreate, loginCreate, loginInvalid } from "../mocks"


describe("Test for POST method in /login", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to login to /login route", async () => {

        const response = await request(app).post("/login").send(loginCreate)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
    })
    
    test("Trying to login to a non-existent user", async () => {
        
        const response = await request(app).post("/login").send(loginInvalid)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
