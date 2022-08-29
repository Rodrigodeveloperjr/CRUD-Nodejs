import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import deleteUserService from "../../services/users/deleteUser.service"


const deleteUserController = async (req: Request, res: Response) => {

    try {

        const { id } = req.params

        const deletedUser = await deleteUserService(id)

        return res.status(200).json(deletedUser)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default deleteUserController
