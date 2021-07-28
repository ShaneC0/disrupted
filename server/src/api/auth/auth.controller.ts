import { Request, Response, NextFunction } from "express"

const signin = (req: Request, res: Response, next: NextFunction) => {
   res.json('Signin function') 
}

const signup = (req: Request, res: Response, next: NextFunction) => {
    res.json('Signup function')
}