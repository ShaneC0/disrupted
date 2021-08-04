import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Server } from "../../entity/Server";

const findChannelsByServerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;

  let serverRepository = getRepository(Server);

  let server = await serverRepository.findOne(id, { relations: ["channels"] });

  if (server) {
    return res.json({ channels: server.channels });
  } else {
    return next();
  }
};

export { findChannelsByServerId };
