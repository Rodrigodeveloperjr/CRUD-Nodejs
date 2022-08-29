import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"
import { appError } from "../../errors/appError"


const updateUserService = async (id: string, name: string, email: string, password: string, phone: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const user = users.find(u => u.id == id)

    if(!user) {

        throw new appError(404, "User not found")
    }

    await userRepository.update(user!.id, { name: name, email: email, password: password, phone: phone })

    return user
}

export default updateUserService
