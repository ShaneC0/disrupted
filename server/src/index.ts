import express from 'express';
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import cors from "cors"
import morgan from "morgan"

import apiRouter from "./api/api.router"

const app = express();
app.use(cors())
app.use(morgan('tiny'))
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.json('Hello World'));
app.use('/api', apiRouter);

app.listen(PORT, async () => {
  console.log(`Express listening at http://localhost:${PORT}`);
  const connection: Connection = await createConnection();
});