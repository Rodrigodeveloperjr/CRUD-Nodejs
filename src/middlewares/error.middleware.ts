import { Request, Response, NextFunction } from "express"
import { appError } from "../errors/appError"


export const errorMiddleware = (err: any, req: Request, res: Response, _: NextFunction) => {

    if(err instanceof appError) {

        return res.status(err.statusCode).json({

            status: "error",
            code: err.statusCode,
            message: err.message
        })
    }

    console.error(err)

    return res.status(500).json({
        status: "error",
        code: 500,
        message: "Internal server error"
    })
}
