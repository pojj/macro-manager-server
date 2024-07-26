import express from "express";

import bodyParser from "body-parser";

import validateEmail from "../utils/middleware/validateEmail.js";
import validateSignUp from "../utils/middleware/validateSignUp.js";
import createUser from "../utils/createUser.js";

const signUp = express.Router();
export default signUp;

signUp.get("/", async (req, res) => {
  res.cookie("auth", "token", {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60,
    sameSite: "Lax",
  });

  res.status(405).json({
    error: "Method Not Allowed",
    message: "This endpoint only accepts POST requests.",
  });
});

// Middleware
// Parse to json, url encoded bodies are not supported
signUp.use(bodyParser.json());

// Check and sanitize user input
signUp.use(validateSignUp);

// Check that email has is not linked to existing account
signUp.use(validateEmail);

// Finally create new account
signUp.post("/", async (req, res) => {
  await createUser(req, res);
});
