import { Router, Request, Response } from "express";

const router: Router = Router();

router.get('/', (req: Request, res: Response) => res.json('api route'))

export default router;
