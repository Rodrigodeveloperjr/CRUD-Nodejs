import { AppDataSource } from "../../../data-source"
import { DataSource } from "typeorm"
import request from "supertest"
import app from "../../../app"
import { bookCreate, userCreate, loginCreate } from "../../mocks"


describe("Test for POST method in /book", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        await request(app).post("/users").send(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create a new book", async () => {

        const token = await request(app).post("/login").send(loginCreate)

        const response = await request(app).post("/book").set("Authorization", `Bearer ${ token.body.token }`).send(bookCreate)

        expect(response.status).toBe(201)
        expect(response.body).toEqual(
            expect.objectContaining({
                id: response.body.id,
                name: bookCreate.name,
                author: bookCreate.author,
                pages: bookCreate.pages,
                created_at: response.body.created_at,
                updated_at: response.body.updated_at
            })
        )
    })
})
