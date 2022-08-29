import { Express } from "express"
import userRoutes from "./users/users.routes"
import bookRoutes from "./book/book.routes"


export const appRoutes = (app: Express) => {

    app.use("/users", userRoutes())
    app.use("/book", bookRoutes())
}
