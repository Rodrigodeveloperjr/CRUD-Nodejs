import { AppDataSource } from "../../data-source"
import { User } from "../../entities/users"
import { IUserLogin } from "../../interfaces/users"
import jwt from "jsonwebtoken"
import { appError } from "../../errors/appError"
import * as bcrypt from "bcrypt"


const sessionService = async ({ email, password }: IUserLogin) => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
        where: {
            email: email
        }
    })

    if(!user) {

        throw new appError(404, "User not found")
    }

    if(bcrypt.compareSync(password, user.password)) {

        throw new appError(403, "Wrong email or password")
    }

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string, { expiresIn: "2h" })

    return { token: token }
}

export default sessionService
