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

// Listar sessões
router.get("/", async (req, res) => {
  const sessions = await db.all(`
    SELECT s.id, s.time, s.date, t.name AS taskName, s.task_id
    FROM sessions s
    JOIN tasks t ON s.task_id = t.id
  `);
  res.json(sessions);
});

// Criar sessão
router.post("/", async (req, res) => {
  const { task_id, time, taskName, date } = req.body;
  if (!task_id || !time || !date)
    return res.status(400).json({ error: "task_id, time e date obrigatórios" });

  const result = await db.run(
    "INSERT INTO sessions(task_id, time, taskName, date) VALUES(?, ?, ?, ?)",
    task_id,
    time,
    taskName,
    date
  );

  res.json({ id: result.lastID });
});

export default router;
