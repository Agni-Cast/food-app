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

    // not working!
    // rolling: true,
    // cookie: { maxAge: 60000 },
  })
);

app.get("/session", (req, res) => {
  // console.log("SESSION -server req.session: ", req.session);
  res.send(req.session);
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.post("/login", async (req, res) => {
  // console.log("req.query.username: ", req.query.username);
  try {
    const dbQuery = await db.query("SELECT * FROM users WHERE username=$1", [
      req.body.username,
    ]);
    // console.log("dbQuery: ", dbQuery);
    let valid;
    if (dbQuery.rows.length === 0) {
      res.send("NO USER");
    } else {
      let user = dbQuery.rows[0];
      valid = await bcrypt.compare(req.body.password, user.password);
      // console.log("valid: ", valid);
      if (valid === true) {
        // console.log("VALID");
        req.session.username = req.body.username;
        req.session.user_id = dbQuery.rows[0].user_id;
        res.send(dbQuery.rows[0]);
      } else {
        res.send("INCORRECT PASSWORD");
      }
    }
  } catch (error) {
    console.log("LOGIN ERROR: ", error);
  }
});

app.post("/signup", async (req, res) => {
  // console.log("req.body", req.body);
  try {
    const saltPass = await bcrypt.genSalt(saltRounds);
    // console.log(typeof req.body.password, typeof saltPass);
    const hashPass = await bcrypt.hash(req.body.password, saltPass);
    // console.log("SIGNUP");
    // console.log("hashPass: ", hashPass);
    const dbQuery = await db.query(
      `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
      [req.body.username, hashPass]
    );
    req.session.username = req.body.username;
    req.session.user_id = dbQuery.rows[0].user_id;
    // console.log("SIGNUP DATA sent back:", dbQuery.rows[0]);
    res.send(dbQuery.rows[0]);
  } catch (err) {
    console.log("SIGNUP ERROR: ", err);
  }
});

////////////// trails /////////////

app.get(`/thingstodo`, async (req, res) => {
  // console.log(req.query.stateCode);
  try {
    const apiSearch = await axios.get(
      `https://developer.nps.gov/api/v1/thingstodo?stateCode=${req.query.stateCode}&q=hike`,
      {
        headers: {
          "x-api-key": process.env.APIKEY,
        },
      }
    );
    // console.log(apiSearch.data.data);
    //////////

    //////////
    res.send(apiSearch.data);
  } catch (err) {
    console.log("ERROR Trails: ", err);
  }
});

// Saving a hike
app.post("/saved-hikes", async (req, res) => {
  try {
    const dbQuery = await db.query(
      `INSERT INTO hikes (
      user_id,
      hike_id,
      title,
      "parkSource",
      state,
      "shortDescription",
      "longDescription",
      duration,
      "arePetsPermitted",
      "petsDescription",
      "isReservationRequired",
      "doFeesApply",
      "feeDescription",
      age,
      image
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        req.body.user_id,
        req.body.hike_id,
        req.body.title,
        req.body.parkSource,
        req.body.state,
        req.body.shortDescription,
        req.body.longDescription,
        req.body.duration,
        req.body.arePetsPermitted,
        req.body.petsDescription,
        req.body.isReservationRequired,
        req.body.doFeesApply,
        req.body.feeDescription,
        req.body.age,
        req.body.image,
      ]
    );
    if (dbQuery.rows.length > 0) {
      res.send(dbQuery.rows);
      // res.send("SAVED");
    }
  } catch (err) {
    console.log("ERROR Saving: ", err);
  }
});

app.get("/saved-hikes", async (req, res) => {
  // console.log(req.query);
  const dbQuery = await db.query(
    `SELECT * FROM hikes WHERE user_id=$1 ORDER BY state ASC, "parkSource" ASC`,
    [req.query.user_id]
  );
  // console.log(dbQuery.rows);
  if (dbQuery.rows.length > 0) {
    res.send(dbQuery.rows);
  }
});

// app.get("/check-saved-hike", async (req, res) => {
//   const dbQuery = await db.query(
//     `SELECT * FROM hikes WHERE user_id=$1 AND hike_id=$2`,
//     [req.query.user_id, req.query.hike_id]
//   );
//   if (dbQuery.rows.length > 0) {
//     res.send("HIKE SAVED");
//   }
// });
// Removing a hike
app.delete("/saved-hikes", async (req, res) => {
  const dbQuery = await db.query(
    "DELETE FROM hikes WHERE user_id=$1 AND hike_id=$2",
    [req.query.user_id, req.query.hike_id]
  );
  const dbQuery2 = await db.query(`SELECT * FROM hikes WHERE user_id=$1`, [
    req.query.user_id,
  ]);
  // if (dbQuery2.rows.length > 0) {
  res.send(dbQuery2.rows);
  // }
});

app.post("/completed-hikes", async (req, res) => {
  try {
    const dbQuery = await db.query(
      `INSERT INTO completed (
      user_id,
      hike_id,
      title,
      "parkSource",
      state,
      "shortDescription",
      "longDescription",
      duration,
      "arePetsPermitted",
      "petsDescription",
      "isReservationRequired",
      "doFeesApply",
      "feeDescription",
      age,
      image
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *`,
      [
        req.body.user_id,
        req.body.hike_id,
        req.body.title,
        req.body.parkSource,
        req.body.state,
        req.body.shortDescription,
        req.body.longDescription,
        req.body.duration,
        req.body.arePetsPermitted,
        req.body.petsDescription,
        req.body.isReservationRequired,
        req.body.doFeesApply,
        req.body.feeDescription,
        req.body.age,
        req.body.image,
      ]
    );
    if (dbQuery.rows.length > 0) {
      res.send(dbQuery.rows);
      // res.send("SAVED");
    }
  } catch (err) {
    console.log("ERROR Saving: ", err);
  }
});

app.delete("/completed-hikes", async (req, res) => {
  const dbQuery = await db.query(
    "DELETE FROM completed WHERE user_id=$1 AND hike_id=$2",
    [req.query.user_id, req.query.hike_id]
  );
  const dbQuery2 = await db.query(`SELECT * FROM completed WHERE user_id=$1`, [
    req.query.user_id,
  ]);
  // if (dbQuery2.rows.length > 0) {
  res.send(dbQuery2.rows);
});

app.get("/completed-hikes", async (req, res) => {
  // console.log(req.query);
  const dbQuery = await db.query(
    "SELECT * FROM completed WHERE user_id=$1 ORDER BY state ASC",
    [req.query.user_id]
  );
  // console.log(dbQuery.rows);
  if (dbQuery.rows.length > 0) {
    res.send(dbQuery.rows);
  }
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
