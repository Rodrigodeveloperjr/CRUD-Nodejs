import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import sessionService from "../../services/sessions/session.service"


const sessionController = async (req: Request, res: Response) => {

    try {

        const { email, password } = req.body

        const session = await sessionService({ email, password })

        return res.status(200).json(session)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default sessionController
