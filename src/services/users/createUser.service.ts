import { AppDataSource } from "../../data-source"
import { IUserCreate } from "../../interfaces/users"
import { User } from "../../entities/users"
import * as bcrypt from "bcrypt"
import { appError } from "../../errors/appError"


const createUserService = async ({ name, email, password, phone }: IUserCreate) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    const hashPassword = bcrypt.hashSync(password, 10)

    if(user) {

        throw new appError(409, "Email already registered")
    }

    const Newuser = new User()
    Newuser.name = name
    Newuser.email = email
    Newuser.password = password
    Newuser.phone = phone
    Newuser.created_at = new Date()
    Newuser.updated_at = new Date()

    userRepository.create(Newuser)
    await userRepository.save(Newuser)

    return Newuser
}

export default createUserService
