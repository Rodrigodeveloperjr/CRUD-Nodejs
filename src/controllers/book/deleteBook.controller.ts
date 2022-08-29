import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import deleteBookService from "../../services/book/deleteBook.service"


const deleteBookController = async (req: Request, res: Response) => {

    try {

        const { id } = req.params

        const deletedBook = await deleteBookService(id)

        return res.status(200).json(deletedBook)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default deleteBookController
