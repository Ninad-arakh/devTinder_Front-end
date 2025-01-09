import React, { useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("tom@gmail.com");
  const [password, setPassword] = useState("Thomas@123");
  const [ error, setError ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = useSelector((store) => store.user);
  

  const loginHnadler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (e) {
      setError(e.response.data)
    }
  };
  if (isUser) {
    navigate("/");
  }
  return (
    <div>
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div
          className="w-full p-6  m-auto bg-base-200 rounded-md shadow-md lg:max-w-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Login
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="justify-center flex">
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
