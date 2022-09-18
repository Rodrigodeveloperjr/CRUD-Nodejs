import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import sessionService from "../../../services/sessions/session.service"
import createUserService from "../../../services/users/createUser.service"
import { loginCreate, loginInvalid, userCreate } from "../../mocks"


describe("Test unit for POST method in /login", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))

        await createUserService(userCreate)
    })

    afterAll(async () => await connection.destroy())

    test("Trying to login to /login route test unit", async () => {

        const result = await sessionService(loginCreate)

        expect(result).toHaveProperty("token")
    })

    test("Trying to login to a non-existent user test unit", async () => {

        expect(async () => await sessionService(loginInvalid)).rejects.toThrow("User not found")
    })
})
