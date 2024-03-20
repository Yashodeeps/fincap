const express = require("express");
const userRouter = require("./user");
const expenseRouter = require("./expense.js");
const budgetRouter = require("./budget.js");

const router = express.Router();

router.use("/user", userRouter);
router.use("/expense", expenseRouter);
router.use("/budget", budgetRouter);

module.exports = router;
