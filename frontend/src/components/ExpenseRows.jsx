import axios from "axios";
import React, { useEffect, useState } from "react";

const ExpenseRows = () => {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [expenseData, setExpenseData] = useState([{}]);

  useEffect(() => {
    async function fetchData() {
      await axios
        .get("http://localhost:3001/api/v1/expense/", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          setExpenseData(response?.data?.reverse());
        });
    }
    fetchData();
  }, [clickCount]);
  console.log(expenseData);

  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <h1 className=" text-white  text-2xl">Add Expenses</h1>

      <div className="flex  gap-6 m-4 px-4 py-6 flex-wrap border-b border-t">
        <input
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          value={amount}
          className="p-2 "
          type="number"
          placeholder="amount"
        />
        <input
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          value={category}
          className="p-2 "
          type="text"
          placeholder="category"
        />
        <input
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          className="p-2 "
          type="text"
          placeholder="description"
        />
        <input
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
          className="p-2 "
          type="date"
          placeholder="date"
        />
        <button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3001/api/v1/expense/",
              {
                amount,
                category,
                description,
                date,
              },
              {
                headers: {
                  authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            );

            setClickCount((prevCount) => prevCount + 1);
          }}
          className="bg-gray-950 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>

      {/* //expenses */}

      <div className="text-white">
        <table className=" p-4 table-auto border-collapse border border-gray-800">
          <thead>
            <tr>
              <th className="border px-6 py-4 border-gray-800">Amount</th>
              <th className="border px-6 py-4 border-gray-800">Category</th>
              <th className="border px-6 py-4 border-gray-800">Description</th>
              <th className="border px-6 py-4 border-gray-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseData.map((expense) => {
              return (
                <tr>
                  <td className="border p-3 border-gray-800">
                    {expense.amount}
                  </td>
                  <td className="border p-3 border-gray-800">
                    {expense.category}
                  </td>
                  <td className="border p-3 border-gray-800">
                    {expense.description}
                  </td>
                  <td className="border p-3 border-gray-800">{expense.date}</td>

                  <button className=" bg-red-700 p-2 m-3 rounded-xl">
                    delete
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseRows;
