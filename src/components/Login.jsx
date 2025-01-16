import React, { useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [success, setSuccess] = useState(false);
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
      setError(e.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  const signUpHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "signup",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setIsLogin(true);
        setPassword("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  if (isUser) {
    navigate("/");
  }
  return (
    <div className="bg-gradient-to-tr to-red-400 from-pink-400 ">
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div
          className="w-full p-6  m-auto bg-base-200 bg-opacity-60 rounded-md shadow-md lg:max-w-lg mt-40 md:mt-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-semibold text-center  text-purple-200">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="label">
                    <span className="text-base text-purple-200 label-text">
                      First Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Your Name"
                    className="w-full input input-bordered input-primary bg-opacity-70"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="text-base text-purple-200 label-text">
                      Last Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    className="w-full input input-bordered input-primary bg-opacity-70"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <label className="label">
                <span className="text-base text-purple-200 label-text">
                  Email
                </span>
              </label>
              <input
                type="email"
                value={email}
                placeholder="example@in.com"
                className="w-full input input-bordered input-primary bg-opacity-70"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base text-purple-200 label-text">
                  Password
                </span>
              </label>
              <input
                type="password"
                value={password}
                placeholder="Enter Password"
                className="w-full input input-bordered input-primary bg-opacity-70"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <p
              className="text-xs text-white cursor-pointer hover:underline hover:text-blue-200"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already a User? Login"}
            </p>
            {success && (
              <div className="alert alert-success  text-gray-50 bg-opacity-70">
                <span>User added successfully, Please Login.</span>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            <div className="justify-center flex pt-6">
              <button
                className="btn btn-primary"
                onClick={() => (isLogin ? loginHnadler() : signUpHandler())}
              >
                {isLogin ? "Login" : "SignUp"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
