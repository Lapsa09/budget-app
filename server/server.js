const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = process.env.PORT || 3001;
const db = require("./db/index");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.get("/api", async (req, res) => {
  try {
    const result = await db.query("select * from incomes ORDER BY date DESC");

    res.status(200).json(result.rows);
  } catch (error) {
    res.send(error);
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    const result = await db.query("select * from incomes where id=$1", [
      req.params.id,
    ]);

    res.status(200).json(result.rows);
  } catch (error) {
    res.send(error);
  }
});

app.post("/api", async (req, res) => {
  const { money, date, income, concept } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO incomes (money,date,income,concept) VALUES ($1,$2,$3,$4) returning *",
      [money, date, income, concept]
    );

    res.status(201).json(result.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/api/:id", async (req, res) => {
  const { money, concept } = req.body;

  try {
    const result = await db.query(
      "UPDATE incomes SET money=$1, concept=$2 WHERE id=$3 returning *",
      [money, concept, req.params.id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/api/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE from incomes where id=$1 returning *",
      [req.params.id]
    );
    res.status(204).json(result.rows);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port);
