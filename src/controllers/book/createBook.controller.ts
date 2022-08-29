import { Request, Response } from "express"
import { appError, handleError } from "../../errors/appError"
import createBookService from "../../services/book/createBook.service"


const createBookController = async (req: Request, res: Response) => {

    try {

        const { name, author, pages } = req.body

        const newBook = await createBookService({ name, author, pages })

        return res.status(201).json(newBook)

    } catch(err) {

        if(err instanceof appError) {

            handleError(err, res)
        }
    }
}

export default createBookController
