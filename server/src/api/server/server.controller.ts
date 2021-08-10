import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Server } from "../../entity/Server";

const findServersByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  let { id } = req.body.user;

  const servers = await getRepository(Server)
    .createQueryBuilder("server")
    .leftJoin("server.users", "user")
    .where("user.id = :userId", { userId: id })
    .getMany();

  if (servers) {
    return res.json({ servers });
  } else {
    return next();
  }
};

export { findServersByUserId };
