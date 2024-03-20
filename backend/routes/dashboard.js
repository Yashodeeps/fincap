const express = require("express");
const { Expense } = require("../db");
const { Budget } = require("../db");
const { authMiddleware } = require("../middleware");
const router = express.Router();

router.use(authMiddleware);
// GET dashboard summary
router.get("/summary", async (req, res) => {
  try {
    const userId = req.userId; // Assuming user ID is available in request object after authentication

    // Fetch total expenses for the current month
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    const totalExpenses = await Expense.aggregate([
      {
        $match: {
          user: userId,
          date: {
            $gte: new Date(currentYear, currentMonth - 1, 1),
            $lt: new Date(currentYear, currentMonth, 1),
          },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Fetch total budgets for the current month
    const totalBudgets = await Budget.aggregate([
      {
        $match: {
          user: userId,
          startDate: { $lte: new Date(currentYear, currentMonth - 1, 1) },
          endDate: { $gt: new Date(currentYear, currentMonth - 1, 1) },
        },
      },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    res.json({
      totalExpenses: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
      totalBudgets: totalBudgets.length > 0 ? totalBudgets[0].total : 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET recent transactions
router.get("/transactions", async (req, res) => {
  try {
    const userId = req.userId; // Assuming user ID is available in request object after authentication
    const recentTransactions = await Expense.find({ user: userId })
      .sort({ date: -1 })
      .limit(10);
    res.json(recentTransactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
