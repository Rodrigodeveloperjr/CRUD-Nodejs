import { DataSource } from "typeorm"
import { AppDataSource } from "../../../data-source"
import listUsersService from "../../../services/users/listUsers.service"


describe("Test unit for GET method in /users", () => {

    let connection: DataSource

    beforeAll(async () => {

        await AppDataSource.initialize()
        .then(res => connection = res)
        .catch(err => console.error("Error during Data Source initialization", err))
    })

    afterAll(async () => await connection.destroy())

    test("Trying to list all the users test unit", async () => {

        const result = await listUsersService()

        expect(result).toHaveProperty("map")
    })
})
