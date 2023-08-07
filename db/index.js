// import dotenv from "dotenv";
// dotenv.config();
// import path from "path";
// import pkg from "pg";
// const { Pool, Client } = pkg;
// import pgtools from "pgtools";
// import fs from "fs";
// import util from "util";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const filePath = path.join(__dirname, "schema.sql");
// const readFileAsync = util.promisify(fs.readFile);
// console.log(process.env);
// const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
// });

// (async () => {
//   const client = await pool.connect();
//   try {
//     const { rows } = await pool.query(`SELECT * FROM users`);
//     const user = rows[0]["username"];
//     console.log("connected");
//     console.log(rows);
//   } catch (err) {
//     console.log(err);
//   } finally {
//     client.release();
//   }
// })();
