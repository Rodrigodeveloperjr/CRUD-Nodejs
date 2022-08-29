import { Router } from "express"

import createBookController from "../../controllers/book/createBook.controller"
import listBooksController from "../../controllers/book/listBooks.controller"
import updateBookController from "../../controllers/book/updateBook.controller"
import deleteBookController from "../../controllers/book/deleteBook.controller"

import verifyTokenMiddleware from "../../middlewares/verifyToken.middleware"


const routes = Router()

const bookRoutes = () => {

    routes.post("/", verifyTokenMiddleware, createBookController)

    routes.get("/", verifyTokenMiddleware, listBooksController)

    routes.patch("/:id", verifyTokenMiddleware, updateBookController)

    routes.delete("/:id", verifyTokenMiddleware, deleteBookController)
    
    return routes
}

export default bookRoutes
