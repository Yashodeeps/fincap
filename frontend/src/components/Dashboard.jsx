import React from "react";
import Navbar from "./Navbar";
import ExpenseRows from "./ExpenseRows";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-700">
      <Navbar />
      <ExpenseRows />
    </div>
  );
};

export default Dashboard;
