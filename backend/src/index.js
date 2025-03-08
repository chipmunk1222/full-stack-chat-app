
import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import { connectDB } from "./lib/db.js";

import {app, io,server} from './lib/socket.js'

import path from 'path'

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5137',
    credentials: true, 
  })
);

// app.use(cors({ origin: true }));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend','dist','index.html'));
  })
}


// app.post("/authenticate", async (req, res) => {
//   const { username } = req.body;
//   return res.json({ username: username, secret: "sha256..." });
// });

server.listen(PORT, () => {
  console.log("listening on port:", PORT)
  connectDB();
});
