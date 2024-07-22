import pool from "./db.js";

export default async function createUser(req, res) {
  const { email, password, firstName, lastName } = req.body;

  try {
    await pool.query(
      "INSERT INTO account (email, password, first_name, last_name) VALUES ($1, $2, $3, $4)",
      [email, password, firstName, lastName]
    );
    console.log("Account completed: " + email);
    res.status(201).json("Account Created");
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
