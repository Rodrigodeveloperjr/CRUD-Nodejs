import { AppDataSource } from "../../data-source"
import { IUserCreate } from "../../interfaces/users"
import { User } from "../../entities/users"
import * as bcrypt from "bcrypt"
import { appError } from "../../errors/appError"


const createUserService = async ({ name, email, password, phone }: IUserCreate) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const hashPassword = bcrypt.hashSync(password, 10)

    if(users.find(u => u.email == email)) {

        throw new appError(409, "Email already registered")
    }

    const user = new User()
    user.name = name
    user.email = email
    user.password = hashPassword
    user.phone = phone
    user.created_at = new Date()
    user.updated_at = new Date()

    userRepository.create(user)
    await userRepository.save(user)

    const copyUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        created_at: user.created_at,
        updated_at: user.updated_at
    }

    return copyUser
}

export default createUserService
