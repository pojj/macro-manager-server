// Hoist env imports
import "./initializeEnvs.js";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import signIn from "./routes/signIn.js";
import signUp from "./routes/signUp.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(cookieParser());

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.use("/signin", signIn);
app.use("/signup", signUp);

app.listen(process.env.PORT);
