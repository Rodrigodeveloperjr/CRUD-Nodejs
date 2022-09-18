import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"
import { appError } from "../../errors/appError"


const updateUserService = async (id: string, name: string, email: string, password: string, phone: string) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            id: id
        }
    })

    if(!user) {

        throw new appError(404, "User not found")
    }

    await userRepository.update(user!.id, { name: name, email: email, password: password, phone: phone, updated_at: new Date() })

    return user
}

export default updateUserService
