import { Router } from "express";

const router = Router();

// Endpoint ping
router.get("/", (req, res) => {
  res.json({ status: "ok" });
});

export default router;
