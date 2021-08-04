import { Request, Response, Router } from "express";
import { findServersByUserId } from "./server.controller";

const router: Router = Router();

/*
    What routes do we need for the server?
     - Fetch a users servers
     - Fetch a user with all relations
     - Create a new server
     - Join a server
     - Leave a server
     - Delete a server
     - Edit a server
*/

router.get("/user", findServersByUserId);

export default router;
