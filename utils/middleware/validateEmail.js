import pool from "../db.js";

export default async function validateEmail(req, res, next) {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT id FROM account WHERE email = $1", [
      email,
    ]);

    if (result.rows.length > 0) {
      res
        .status(400)
        .json({ error: "Email is already linked to an existing account" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
