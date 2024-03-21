import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between shadow-lg bg-gray-900 text-white">
      <h1 className="p-4 text-2xl font-bold">FinCap</h1>
      <div className="p-4 mx-3">
        <ul className="flex gap-6 text-lg ">
          <li>Dashboard</li>
          <li>Advices</li>
          <li>Budgets</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
