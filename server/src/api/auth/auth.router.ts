import { Router } from "express"
import {signin, signup} from "./auth.controller"

const router: Router = Router();

router.post('/signup', signup)

router.post('/signin', signin)

export default router