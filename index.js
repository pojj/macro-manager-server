// Hoist env imports
import "./initializeEnvs.js";

import express from "express";
import cors from "cors";

import signIn from "./routes/signIn.js";
import signUp from "./routes/signUp.js";

const app = express();
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello world!");
});

app.use("/signin", signIn);
app.use("/signup", signUp);

app.listen(process.env.PORT);
