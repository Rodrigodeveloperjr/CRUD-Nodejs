import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import createUserService from "../../services/users/createUser.service"


const createUserController = async (req: Request, res: Response) => {

    try {

        const { name, email, password, phone } = req.body

        const newUser = await createUserService({ name, email, password, phone })

        return res.status(201).json(newUser)
    
    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        } 
    }
}

export default createUserController
