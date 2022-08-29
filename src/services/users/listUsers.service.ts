import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"


const listUsersService = async () => {

    const usersRepository = AppDataSource.getRepository(User)

    const users = await usersRepository.find()

    return users
}

export default listUsersService
