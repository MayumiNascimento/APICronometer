import { Router } from "express";
import { Database } from "sqlite";

const router = Router();

// @ts-ignore
let db: Database;

router.use((req, res, next) => {
  // @ts-ignore
  db = req.app.locals.db;
  next();
});

// Listar tarefas
router.get("/", async (req, res) => {
  const tasks = await db.all("SELECT * FROM tasks");
  res.json(tasks);
});

// Criar tarefa
router.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Nome obrigatório" });

  const result = await db.run("INSERT INTO tasks(name) VALUES(?)", name);
  res.json({ id: result.lastID, name });
});

export default router;