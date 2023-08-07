import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./dbconnection.js";
import fs from "fs";
import session from "express-session";
import connectPG from "connect-pg-simple";
import passport from "passport";
let pgSession = connectPG(session);
import bcrypt from "bcrypt";
// import auth from "../routes/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const PORT = process.env.PORT;

const saltRounds = 10;

app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json());

app.use(
  session({
    store: new pgSession({
      createTableIfMissing: true,
      pool: db,
    }),
    secret: "secret",
    resave: true,
    unset: "destroy",
    saveUninitialized: true,
  })
);

app.get("/session", (req, res) => {
  console.log("SESSION -server req.session: ", req.session);
  res.send(req.session);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  console.log("req.query.username: ", req.query.username);
  try {
    const dbQuery = await db.query("SELECT * FROM users WHERE username=$1", [
      req.query.username,
    ]);
    // console.log("dbQuery: ", dbQuery);
    let valid;
    if (dbQuery.rows.length === 0) {
      res.send(JSON.stringify("NO USER"));
    } else {
      let user = dbQuery.rows[0];
      valid = await bcrypt.compare(req.query.password, user.password);
      console.log("valid: ", valid);
      if (valid === true) {
        // console.log("VALID");
        req.session.username = req.query.username;
        req.session.user_id = dbQuery.rows[0].user_id;
        res.send(dbQuery.rows[0]);
      }
    }
  } catch (error) {
    console.log("ERROR: ", error);
  }
});

app.post("/signup", async (req, res) => {
  console.log("req.body", req.body);
  const saltPass = await bcrypt.genSalt(saltRounds);
  const hashPass = await bcrypt.hash(req.body.password, saltPass);
  const dbQuery = await db.query(
    `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
    [req.body.username, hashPass]
  );
  req.session.username = req.body.username;
  req.session.user_id = dbQuery.rows[0].user_id;
  // console.log("SIGNUP DATA sent back:", dbQuery.rows[0]);
  res.send(dbQuery.rows[0]);
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../dist/index.html"), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
