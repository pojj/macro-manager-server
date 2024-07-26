import pool from "./db.js";
// import bcrypt from "bcrypt";

import generateAccessToken from "./auth/generateAccessToken.js";

export default async function authenticateUser(req, res) {
  const { email, password } = req.body;
  console.log("Cookies :  ", req.cookies);

  try {
    // Query the database for the user with the provided email
    const result = await pool.query("SELECT * FROM account WHERE email = $1", [
      email,
    ]);

    // Check if the user exists
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];

    // Compare the provided password with the hashed password in the database
    // const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = password == user.password;

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = generateAccessToken(email);

    res.cookie("auth", token, {
      domain: "localhost:3000",
      httpOnly: false,
      secure: false,
      maxAge: 1000 * 60,
      sameSite: "Strict",
    });

    res.cookie("abc", "Hi");

    console.log("Cookies: ", res._headers["set-cookie"]);

    console.log("Authentication successful: " + email);
    res.status(200).json("Authentication Successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
