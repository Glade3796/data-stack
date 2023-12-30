import Database from "better-sqlite3";
const db = new Database("database.db");

const userSName = `Jones`;
const userFName = `Quinn`;
const message = `Beautiful view!`;
const sentiment = `inspiring`;
const colour = `#3366CC`;
const likes = `100`;
const newlikes = "101";

const updateEntry = db
  .prepare(
    `
  UPDATE place
  SET likes = 25
  WHERE user_surname = ? AND user_firstname = ?
  `
  )
  .run(`${userSName}`, `${userFName}`);
