import { Request, Response, NextFunction} from "express"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    res.status(500)


    if(Array.isArray(err)) {
        res.json({
            validationErrors: err
        })
    } else {
        res.json({
            message: err.message,
            stack: err.stack,
        })
    }

}

export default errorHandler