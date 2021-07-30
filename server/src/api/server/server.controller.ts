import {Request, Response, NextFunction} from "express"
import {getRepository} from "typeorm";
import { User } from "../../entity/User";

const findServersByUserId = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    let {id} = req.body.user
    let userRepository = getRepository(User)
    let user = await userRepository.findOne(id, {relations: ['servers']})
    return res.json({servers: user?.servers})
}

export default findServersByUserId;