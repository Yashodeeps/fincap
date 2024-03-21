import axios from "axios";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="flex gap-6 justify-center items-center min-h-screen flex-col border shadow-lg">
      <div className="gap-6">
        <h1 className="text-2xl font-bold py-2">Signup</h1>
        <Link to="/login">
          <p className="text-sm">
            Already signedup?{" "}
            <span className="font-bold cursor-pointer">Login here</span>
          </p>
        </Link>
      </div>
      <div className="flex flex-col gap-6 w-1/3">
        <input
          className="px-4 py-3 border bg-slate-100"
          type="text"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          value={firstName}
        />
        <input
          className="px-4 py-3 border bg-slate-100"
          type="text"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          value={lastName}
        />
        <input
          className="px-4 py-3 border bg-slate-100"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <input
          className="px-4 py-3 border bg-slate-100"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <input
          className="px-4 py-3 border bg-slate-100"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          value={confirmPassword}
        />
        <button
          className="px-3 py-3 border bg-green-500 text-white font-bold rounded-lg"
          type="submit"
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:3001/api/v1/user/signup",
              {
                email,
                password,
                firstName,
                lastName,
              }
            );
            locakStorage.setItem("token", response.data.token);
          }}
        >
          Signup
        </button>
      </div>
    </div>
  );
  npm;
};

export default Signup;
