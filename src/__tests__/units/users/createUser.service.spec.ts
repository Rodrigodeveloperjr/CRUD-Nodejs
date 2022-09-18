import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import createUserService from "../../../services/users/createUser.service"
import { userCreate } from "../../mocks"


describe("Test unit for POST method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to create a new user unit", async () => {

        const result = await createUserService(userCreate)

        expect(result).toHaveProperty("id")
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("email")
        expect(result).toHaveProperty("phone")
        expect(result.password).not.toBe("password")
    })
})
