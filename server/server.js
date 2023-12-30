import Database from "better-sqlite3";
const db = new Database("database.db");

import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("root");
});

app.get("/place", (req, res) => {
  const place = db.prepare(`SELECT * FROM place`).all();
  res.json(place);
});

app.post("/place", (req, res) => {
  console.log(req.body);
  const userSName = req.body.user_sname;
  const userFName = req.body.user_fname;
  const message = req.body.user_message;
  const sentiment = req.body.sentiment;
  const colour = req.body.user_colour;

  const newEntry = db
    .prepare(
      `INSERT INTO place (user_firstname, user_surname, user_message, user_colour, sentiment, likes) VALUES (?, ?, ?, ?, ?, 0)`
    )
    .run(userFName, userSName, message, colour, sentiment);
  res.json(newEntry);
});

app.post("/likes", (req, res) => {
  const id = req.body.id;
  const likes = req.body.likes;
  const updateEntry = db
    .prepare(
      `
  UPDATE place
  SET likes = ? 
  WHERE id = ?
  `
    )
    .run(`${likes}`, `${id}`);
  res.json(updateEntry);
  console.log("updated entry: ", updateEntry);
  console.log("id: ", id, "likes:", likes);
});

app.post("/del", (req, res) => {
  const id = req.body.id;
  const remEntry = db
    .prepare(
      `
DELETE FROM place
WHERE id = ?`
    )
    .run(`${id}`);
  res.json(remEntry);
  console.log("deleted", id);
});

app.listen(3333, () => {
  console.log("server up on https://the-place-server.onrender.com/");
});
