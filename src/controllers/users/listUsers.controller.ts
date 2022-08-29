import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import listUsersService from "../../services/users/listUsers.service"


const listUsersController = async (req: Request, res: Response) => {

    try {

        const users = await listUsersService()

        return res.status(200).json(users)
    
    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default listUsersController
