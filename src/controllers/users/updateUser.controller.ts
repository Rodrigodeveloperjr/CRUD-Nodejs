import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import updateUserService from "../../services/users/updateUser.service"


const updateUserController = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const { name, email, password, phone } = req.body

        const updatedUser = await updateUserService(id, name, email, password, phone)

        return res.status(200).json(updatedUser)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default updateUserController
