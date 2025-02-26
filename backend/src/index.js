// const express = require("express");
// const cors = require("cors");
import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

import "dotenv/config";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: true }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5001;
// app.post("/authenticate", async (req, res) => {
//   const { username } = req.body;
//   return res.json({ username: username, secret: "sha256..." });
// });

app.listen(PORT, () => {
  console.log("listening on port:", PORT)
  connectDB();
});
