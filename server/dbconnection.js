import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool, Client } = pkg;

export const db = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

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
