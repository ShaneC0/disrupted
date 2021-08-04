import {Router} from "express"
import {findChannelsByServerId} from "./channel.controller"

const router: Router = Router()

router.get('/server/:id', findChannelsByServerId)

export default router