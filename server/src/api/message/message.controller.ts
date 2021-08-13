import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Message } from "../../entity/Message";

const findMessagesByChannelId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { id } = req.params;

  const messages = await getRepository(Message)
    .createQueryBuilder("message")
    .where("message.channelId = :id", { id })
    .leftJoinAndSelect("message.user", "user")
    .getMany();

  if (messages) {
    return res.json({ messages });
  } else {
    return next();
  }
};

const createMessage = async (req: Request, res: Response, next: NextFunction) => {
  let userId = req.body.user.id
  let {text, channelId} = req.body
  let messageRepository = getRepository(Message)

  const message = messageRepository.create({
    text,
    userId,
    channelId,
  })

  await messageRepository.save(message)

  return res.json({message})
};

export { findMessagesByChannelId, createMessage };
