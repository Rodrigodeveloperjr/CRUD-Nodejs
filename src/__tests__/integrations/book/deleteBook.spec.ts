import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../../app"
import { userCreate, loginCreate, bookCreate } from "../../mocks"


describe("Test for DELETE method in /book", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete a book", async () => {

        const token = await request(app).post("/login").send(loginCreate)
        
        const book = await request(app).post("/book").send(bookCreate).set("Authorization", `Bearer ${ token.body.token }`)

        const response = await request(app).delete(`/book/${ book.body.id }`).set("Authorization", `Bearer ${ token.body.token }`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("message")
    })
    
    test("Trying to delete a non-existent book", async () => {

        const token = await request(app).post("/login").send(loginCreate)

        const response = await request(app).delete("/book/21").set("Authorization", `Bearer ${ token.body.token }`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
