import { Request, Response, NextFunction } from "express"
import { getRepository, Repository } from "typeorm"
import { User } from "../../entity/User"
import argon2 from "argon2"
import { validate } from "class-validator"
import { sign } from "jsonwebtoken"


const generateToken = (username: string, id: string) => {
    return sign({id, username}, process.env.TOKEN_SECRET as string, {
        expiresIn: 60 * 60 * 24 * 365 // one year
    })
}

/*
    Signup should fail if:
    - Username exists
    - Username or password malformed
*/
const signup = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    let {username, password} = req.body;
    let userRepository = getRepository(User)

        let existingUser = await userRepository.findOne({username})

        if(!existingUser) {
            const user = userRepository.create({
                username,
                password
            })

            const errors = await validate(user)

            if(errors.length == 0) {
                user.password =  await argon2.hash(password)

                await userRepository.save(user);

                return res.json({token: generateToken(user.username, user.id)})

            } else {
                return next(errors)
            }
        } else {
            return next(new Error('username taken'))
        }
}

/*
    Signin should fail if:
    - Username doesn't exist
    - Username is correct but password isn't.
    - Username or password malformed
*/
const signin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    let {username, password} = req.body;
    let userRepository = getRepository(User)

    let existingUser = await userRepository.findOne({username})

    if(existingUser) {
        if(await argon2.verify(existingUser.password, password)) {
            res.json({token: generateToken(existingUser.username, existingUser.id)})
        } else {
            return next(new Error("incorrect password"))
        }
    } else {
        return next(new Error("username doesn't exist"))
    }
}

export {signin, signup}