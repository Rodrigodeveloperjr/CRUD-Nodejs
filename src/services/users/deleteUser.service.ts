import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"
import { appError } from "../../errors/appError"


const deleteUserService = async (id: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const user = users.find(u => u.id == id)

    if(!user) {

        throw new appError(404, "User not found")
    }

    await userRepository.delete(user!.id)

    return { message: "User deleted with sucess!" }
}

export default deleteUserService
