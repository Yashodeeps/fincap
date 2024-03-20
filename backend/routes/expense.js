const express = require("express");
const { authMiddleware } = require("../middleware");
const { Expense } = require("../db");

const router = express.Router();

router.use(authMiddleware);

// GET all expenses for a user
router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const expenses = await Expense.find({ user: userId });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new expense
router.post("/", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const userId = req.userId;

    const newExpense = await Expense.create({
      user: userId,
      amount,
      category,
      description,
      date,
    });
    // const savedExpense = await newExpense.save();
    res.json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update an existing expense
router.put("/:id", async (req, res) => {
  try {
    const { amount, category, description, date } = req.body;
    const expenseId = req.params.id;
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      {
        amount,
        category,
        description,
        date,
      },
      { new: true }
    );
    res.json(updatedExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE an existing expense
router.delete("/:id", async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);
    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
