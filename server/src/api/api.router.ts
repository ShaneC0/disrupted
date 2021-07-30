import { Router, Request, Response } from "express";
import authRouter from "./auth/auth.router"
import verifyToken from "./middleware/VerifyToken";
import serverRouter from "./server/server.router"

const router: Router = Router();

router.get('/', (req: Request, res: Response): Response => res.json('api route'))
router.use('/auth', authRouter)
router.use('/server', verifyToken, serverRouter)

export default router;
