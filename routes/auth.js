import express from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";
// import crypto from "crypto";
// import db from "../db";
import { db } from "../server/dbconnection.js";
// var router = express.Router();
const router = express.Router();

// passport.use(
//   new LocalStrategy((username, password) => {
//     db.get("SELECT * FROM users WHERE username = ?", [username])
//       .then((user, err) => {
//         if (user.rows.length === 0) {
//           res.send(JSON.stringify("NO USER"));
//         }
//       })
//       .then((user) => {
//         bcrypt.compare(password, user.rows.password);
//       })
//       .then((res) => {
//         console.log(res);
//       })
//       .then(() => {
//         return done(null, user);
//       });
//   })
// );
// passport.use(
//   new LocalStrategy(function verify(username, password) {
//     db.query("SELECT * FROM users WHERE username = ?", [username])
//       .then((user) => {
//         console.log("user FIRST then", user);
//         if (!user) {
//           return "User does not exist";
//         }
//       })
//       .then((user) => {
//         console.log("user SECOND then", user);
//         bcrypt.compare(password, user.password);
//       })
//       .then((res) => {
//         console.log("res THIRD then", res);
//         if (res === false) {
//           return "Incorrect password";
//         } else {
//           console.log("row THIRD then inside ELSE: ", row);
//           return row;
//         }
//       })
//       .catch((err) => {
//         console.log("ERROR LOGGING IN: ", err);
//       });
//   })
// );

// passport.use(
//   new LocalStrategy((username, password, cb) => {
//     db.query(
//       "SELECT username, password FROM users WHERE username=$1",
//       [username],
//       (err, result) => {
//         if (err) {
//           winston.error("Error when selecting user on login", err);
//           return cb(err);
//         }

//         if (result.rows.length > 0) {
//           const first = result.rows[0];
//           bcrypt.compare(password, first.password, function (err, res) {
//             if (res) {
//               cb(null, {
//                 id: first.user_id,
//                 username: first.username,
//                 type: first.type,
//               });
//             } else {
//               cb(null, false);
//             }
//           });
//         } else {
//           cb(null, false);
//         }
//       }
//     );
//   })
// );

// passport.serializeUser(function (user, cb) {
//   process.nextTick(function () {
//     cb(null, { id: user.user_id, username: user.username });
//   });
// });

// passport.deserializeUser(function (user, cb) {
//   process.nextTick(function () {
//     return cb(null, user);
//   });
// });

// router.post(
//   "/api/login",
//   passport.authenticate("local", {
//     successRedirect: "/api/home",
//     failureRedirect: "/api/login",
//   })
// );

// router.post("/signup", (req, res) => {
//   bcrypt
//     .genSalt(10)
//     .then((salt) => {
//       return bcrypt.hash(req.body.password, salt);
//     })
//     .then((hash) => {
//       db.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
//         req.body.username,
//         hash,
//       ]);
//     })
//     .then(() => {
//       var user = {
//         id: req.session.id,
//         username: req.body.username,
//       };
//       req.login(user, function (err) {
//         if (err) {
//           return next(err);
//         }
//         res.redirect("/");
//       });
//     });
// });

// router.post("/api/logout", function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.redirect("/api/home");
//   });
// });

export default router;
