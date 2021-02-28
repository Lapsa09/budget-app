const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db/index");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT u.user_name, i.id, i.concept, i.date, i.money, i.income FROM users AS u LEFT JOIN incomes AS i ON u.user_id = i.user_id WHERE u.user_id = $1 ORDER BY i.date DESC",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/incomes", authorize, async (req, res) => {
  try {
    const { money, income, date, concept } = req.body;
    const newIncome = await pool.query(
      "INSERT INTO incomes (user_id, money, income, date, concept) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, money, income, date, concept]
    );

    res.json(newIncome.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.put("/incomes/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { money, concept } = req.body;
    const updateIncome = await pool.query(
      "UPDATE incomes SET concept = $1, money=$2 WHERE id = $3 AND user_id = $4 RETURNING *",
      [concept, money, id, req.user.id]
    );

    if (updateIncome.rows.length === 0) {
      return res.json("This income is not yours");
    }

    res.json(updateIncome.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

router.delete("/incomes/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteIncome = await pool.query(
      "DELETE FROM incomes WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteIncome.rows.length === 0) {
      return res.json("This Income is not yours");
    }

    res.json("Income was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
