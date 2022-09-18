import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import createUserService from "../../../services/users/createUser.service"
import updateUserService from "../../../services/users/updateUser.service"
import { userCreate } from "../../mocks"


describe("Test unit for PATCH method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to update a user unit test", async () => {

        const user = await createUserService(userCreate)

        const result = await updateUserService(user.id, user.name, user.email, user.password, user.phone)

        expect(result).toHaveProperty("id")
        expect(result.password).not.toBe("password")
    })
    
    test("Trying to update a non-existent user unit test", async () => {

        expect(async () => await updateUserService("1", "example", "example@gmail.com", "123", "99 99999-9999")).rejects.toThrow("User not found")
    })
})
