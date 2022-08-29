import express, { Request, Response } from "express"
import { appRoutes } from "./routes"
import { errorMiddleware } from "./middlewares/error.middleware"
import SwaggerUi from "swagger-ui-express"
import SwaggerDocs from "./swagger.json"


const app = express()

app.use(express.json())

appRoutes(app)

app.use(errorMiddleware)

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(SwaggerDocs))

app.get("/terms", (req: Request, res: Response) => res.json({ message: "Terms and Services" }))

export default app
