import { Request, Response, Router } from "express"
import findServersByUserId from "./server.controller";

const router: Router = Router();

/*
    What routes do we need for the server?
     - Fetch a users servers
     - Create a new server
     - Join a server
     - Leave a server
     - Delete a server
     - Edit a server
*/

router.get('/', (req: Request, res: Response): Response => res.json('server route'))

router.get('/user/:id', findServersByUserId)

export default router