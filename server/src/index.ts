import express, { Request, Response } from 'express';
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import cors from "cors"
import morgan from "morgan"

import apiRouter from "./api/api.router"
import errorHandler from "./api/middleware/ErrorHandler"
import notFound from "./api/middleware/NotFound"
import verifyToken from "./api/middleware/VerifyToken"

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.get('/', verifyToken, (req: Request, res: Response): Response => res.json('Hello World'));
app.use('/api', apiRouter);

app.use(notFound)
app.use(errorHandler)



app.listen(PORT, async () => {
  const connection: Connection = await createConnection();
  console.log(`Express listening at http://localhost:${PORT}`);
  console.log('Postgres container running on port 5432')
});