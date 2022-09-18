import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"


const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const token = req.headers.authorization?.split(" ")[1]

        jwt.verify(token as string, process.env.JWT_SECRET as string, (err: any, decoded: any) => {

                if(err) {

                    return res.status(401).json({ message: "Invalid Token" })
                }
            
                next()
        })
    
    } catch(err) {

        return res.status(401).json({ message: "Missing authorization token" })
    }
}

export default verifyTokenMiddleware
