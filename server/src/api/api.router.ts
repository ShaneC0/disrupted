import { Router, Request, Response } from "express";
import authRouter from "./auth/auth.router"

const router: Router = Router();

router.get('/', (req: Request, res: Response) => res.json('api route'))
router.use('/auth', authRouter)

export default router;
