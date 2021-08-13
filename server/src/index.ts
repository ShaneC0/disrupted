import express, { Request, Response } from "express";
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api/api.router";
import errorHandler from "./api/middleware/ErrorHandler";
import notFound from "./api/middleware/NotFound";
import verifyToken from "./api/middleware/VerifyToken";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  socket.on("message", (data) => {
    socket.broadcast.emit("message", data);
  });
});

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", verifyToken, (req: Request, res: Response): Response => {
  if (req.body.user) {
    return res.json({ user: req.body.user });
  } else {
    return res.json("Hello World");
  }
});

app.use("/api", apiRouter);

app.use(notFound);
app.use(errorHandler);

httpServer.listen(PORT, async () => {
  const connection: Connection = await createConnection();
  console.log(`Express listening at http://localhost:${PORT}`);
  console.log("Postgres container running on port 5432");
});
