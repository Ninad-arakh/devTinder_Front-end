import React, { useState } from "react";
import { URL } from "../utils/constants";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("tom@gmail.com");
  const [password, setPassword] = useState("Thomas@123");

  const loginHnadler = async () => {
    try {
      const res = await axios.post(
        URL + "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log("response : ", res?.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div
          className="w-full p-6  m-auto bg-base-200 rounded-md shadow-md lg:max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Create Account
          </h1>
          <form className="space-y-4">
            <div>
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                value={email}
                placeholder="Email Address"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="text"
                value={password}
                placeholder="Enter Password"
                className="w-full input input-bordered input-primary"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a
              href="#"
              className="text-xs text-gray-600 hover:underline hover:text-blue-600"
            >
              Forget Password?
            </a>
            <div className="justify-center">
              <button className="btn btn-primary" onClick={loginHnadler}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
