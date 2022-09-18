import { Router } from "express"

import createUserController from "../../controllers/users/createUser.controller"
import listUsersController from "../../controllers/users/listUsers.controller"
import updateUserController from "../../controllers/users/updateUser.controller"
import deleteUserController from "../../controllers/users/deleteUser.controller"


const routes = Router()

const userRoutes = () => {
    
    routes.post("/", createUserController)

    routes.get("/", listUsersController)

    routes.patch("/:id", updateUserController)

    routes.delete("/:id", deleteUserController)

    return routes
}

export default userRoutes
