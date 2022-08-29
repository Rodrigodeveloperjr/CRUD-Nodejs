import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import listBooksService from "../../services/book/listBooks.service"


const listBooksController = async (req: Request, res: Response) => {

    try {

        const books = await listBooksService()

        return res.status(200).json(books)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default listBooksController
