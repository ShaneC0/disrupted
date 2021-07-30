import {Request, Response, NextFunction} from "express"
import {verify} from "jsonwebtoken"

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if(req.headers.authorization) {
        let header = req.headers.authorization?.split('Bearer ')[1];
        if(header) {
            verify(header, process.env.TOKEN_SECRET as string, (err, decoded) => {
                if(!err) {
                    //kinda hacky solution but whatever
                    req.body = {...req.body, user: decoded}
                    next()
                } else {
                    return next(err)
                }
            })
        } else {
            return next(new Error('Unauthorized'))
        }

    } else {
        return next(new Error('Unauthorized'))
    }
}

export default verifyToken