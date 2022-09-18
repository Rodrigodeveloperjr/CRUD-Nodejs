import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import updateBookService from "../../services/book/updateBook.service"


const updateBookController = async (req: Request, res: Response) => {

    try {

        const { id } = req.params
        const { name, author, pages } = req.body

        const updatedBook = await updateBookService(id, name, author, pages)

        return res.status(200).json(updatedBook)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default updateBookController
