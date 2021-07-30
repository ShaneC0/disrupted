import {Request, Response, NextFunction } from "express"

const notFound = (req: Request, res: Response, next: NextFunction): void => {
    res.status(404)
    return next(new Error(`Not found - ${req.originalUrl}`))
}

export default notFound