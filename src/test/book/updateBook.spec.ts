import { AppDataSource } from "../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../app"
import { userCreate, loginCreate, bookUpdated } from "../mocks"


describe("Test for PATCH method in /book", () => {

    let connection: DataSource

    let response1: any

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.log("Error during Data Source initialization", err))

        await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a book", async () => {

        const token = await request(app).post("/login").send(loginCreate)

        response1 = await request(app).post("/book").send(bookUpdated).set("Authorization", `Bearer ${ token.body.token }`)

        const response = await request(app).patch(`/book/${response1.body.id}`).set("Authorization", `Bearer ${ token.body.token }`)

        expect(response.status).toBe(200)

        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                name: bookUpdated.name,
                author: bookUpdated.author,
                pages: bookUpdated.pages,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at
            })
        )
    })

    test("Trying to update a non-existent book", async () => {

        const token = await request(app).post("/login").send(loginCreate)

        const response = await request(app).patch("/book/12").set("Authorization", `Bearer ${ token.body.token }`)

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("message")
    })
})
