import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import userLoginService from "../../services/users/loginUser.service"


const userLoginController = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body

        const loginUser = await userLoginService({ email, password })

        return res.status(200).json(loginUser)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default userLoginController
