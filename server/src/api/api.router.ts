import { Router } from "express";
import authRouter from "./auth/auth.router";
import verifyToken from "./middleware/VerifyToken";
import serverRouter from "./server/server.router";
import channelRouter from "./channel/channel.router";
import messageRouter from "./message/message.router";

const router: Router = Router();

router.use("/auth", authRouter);
router.use("/server", verifyToken, serverRouter);
router.use("/channel", verifyToken, channelRouter);
router.use("/message", verifyToken, messageRouter);

export default router;
