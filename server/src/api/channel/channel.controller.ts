import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Channel } from "../../entity/Channel";
import { Server } from "../../entity/Server";

const findChannelsByServerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;

  const channels = await getRepository(Channel)
    .createQueryBuilder("channel")
    .where("channel.serverId = :id", { id })
    .getMany();

  if (channels) {
    return res.json({ channels });
  } else {
    return next();
  }
};

export { findChannelsByServerId };
