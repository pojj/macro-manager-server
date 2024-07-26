import express from "express";

import bodyParser from "body-parser";

import validateSignIn from "../utils/middleware/validateSignIn.js";
import authenticateUser from "../utils/authenticateUser.js";

const signIn = express.Router();
export default signIn;

signIn.get("/", async (req, res) => {
  res.cookie("abc", "Hi", {
    secure: false,
    maxAge: 1000 * 60,
    sameSite: "Lax",
    domain: "localhost:3000",
  });

  res.cookie("auth", "token", {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60,
    sameSite: "Lax",
  });

  console.log("asdfasdf");

  res.status(405).json({
    error: "Method Not Allowed",
    message: "This endpoint only accepts POST requests.",
  });
});

// Middleware
// Parse to json, url encoded bodies are not supported
signIn.use(bodyParser.json());

// Check and sanitize user input
signIn.use(validateSignIn);

signIn.post("/", async (req, res) => {
  await authenticateUser(req, res);
});
