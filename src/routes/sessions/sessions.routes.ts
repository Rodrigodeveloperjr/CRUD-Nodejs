import { Router } from "express"

import userLoginController from "../../controllers/sessions/loginUser.controller"


const routes = Router()

const sessionsRoutes = () => {

    routes.post("/", userLoginController)

    return routes
}

export default sessionsRoutes
