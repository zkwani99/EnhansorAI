import { Router } from "express";
import { Pool } from "pg";

const router = Router();

// Create Postgres client from DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ---------------------------
// GET /api/credits/packs
// ---------------------------
router.get("/packs", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM credit_packs ORDER BY sort_order ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching credit packs:", err);
    res.status(500).json({ message: "Failed to fetch credit packs" });
  }
});

// ---------------------------
// GET /api/credits/pricing
// ---------------------------
router.get("/pricing", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM credit_pricing ORDER BY service ASC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching credit pricing:", err);
    res.status(500).json({ message: "Failed to fetch credit pricing" });
  }
});

export default router;