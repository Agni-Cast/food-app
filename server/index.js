require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});
