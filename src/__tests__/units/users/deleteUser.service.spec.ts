import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import createUserService from "../../../services/users/createUser.service"
import deleteUserService from "../../../services/users/deleteUser.service"
import { userCreate } from "../../mocks"


describe("Test unit for DELETE method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to delete a user unit test", async () => {

        const user = await createUserService(userCreate)

        const result = await deleteUserService(user.id)

        expect(result).toHaveProperty("message")
    })
    
    test("Trying to delete a non-existent user unit test", async () => {

        expect(async () => await deleteUserService("1")).rejects.toThrow("User not found")
    })
})
