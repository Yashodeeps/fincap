const mongoose = require("mongoose");
try {
  mongoose.connect(
    "mongodb+srv://yashodeepnimbekar:finwise_ysl@cluster0.4aysjlb.mongodb.net/"
  );

  console.log("db connected successfully");
} catch (error) {
  console.log(error);
}

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const expenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

// Create a model from the schema
const Budget = mongoose.model("Budget", budgetSchema);
const User = mongoose.model("User", userSchema);
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = {
  User,
  Expense,
  Budget,
};
