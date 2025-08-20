import express from "express";
import cors from "cors";
import { initDb } from "./db";
import tasksRouter from "./routes/tasks";
import sessionsRouter from "./routes/sessions";

const app = express();
app.use(cors());
app.use(express.json());

initDb().then((db) => {
  app.locals.db = db;

  app.use("/tasks", tasksRouter);
  app.use("/sessions", sessionsRouter);

  app.listen(5000, () => console.log("Server running on port 5000"));
});
