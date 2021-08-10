import { Router } from "express"
import {findMessagesByChannelId, createMessage} from "./message.controller"

const router: Router = Router();

router.get('/channel/:id', findMessagesByChannelId)
router.post('/create', createMessage)

export default router