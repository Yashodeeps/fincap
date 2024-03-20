const express = require("express");
const { authMiddleware } = require("../middleware");
const { Budget } = require("../db");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const userId = req.userId;
    const budgets = await Budget.find({ user: userId });
    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// POST a new budget
router.post("/", async (req, res) => {
  try {
    const { category, amount, startDate, endDate } = req.body;
    const userId = req.userId;
    const newBudget = await Budget.create({
      user: userId,
      category,
      amount,
      startDate,
      endDate,
    });
    //   const savedBudget = await newBudget.save();
    res.json(newBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// PUT update an existing budget
router.put("/:id", async (req, res) => {
  try {
    const { category, amount, startDate, endDate } = req.body;
    const budgetId = req.params.id;
    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetId,
      {
        category,
        amount,
        startDate,
        endDate,
      },
      { new: true }
    );
    res.json(updatedBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE an existing budget
router.delete("/:id", async (req, res) => {
  try {
    const budgetId = req.params.id;
    await Budget.findByIdAndDelete(budgetId);
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
