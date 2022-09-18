import { Router } from "express"

import sessionController from "../../controllers/session/session.controller"


const routes = Router()

const sessionsRoutes = () => {

    routes.post("/", sessionController)

    return routes
}

export default sessionsRoutes
