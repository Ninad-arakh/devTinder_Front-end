import React, { useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useGetRequests from "../hooks/useGetRequests.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = useSelector((store) => store.user);

  const screenW = window.screen.width
  let isSmallWin;
  if(screenW <= 767) isSmallWin = true;

  const loginHnadler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login/",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        toast.success("Login Success");
        navigate("/");
      }
    } catch (e) {
      toast.error("Something went wrong ! " + e.response.data.ERROR);
    }
  };

  const signUpHandler = async (e) => {
    try {
      const res = await axios.post(
        BASE_URL + "signup/",
        { firstName, lastName, email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Signup success.");
        dispatch(addUser(res.data.data));
        useGetRequests();
        navigate("/profile");
      }
    } catch (err) {
      e.preventDefault();
      let duplicateEmail = `E11000 duplicate key error collection: devTinder.users index: email_1 dup key: { email: "${email}" }`
      if(err.response.data.ERROR === duplicateEmail){
        toast.error("This Email is already registered! Please use a different one.");
      }
      else{
        toast.error(err.response.data.ERROR);
      }
    }
  };

  if (isUser && !isLogin) {
    navigate("/profile");
  } else if (isUser) {
    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 via-gray-900 to-black ">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-lg p-8 mx-2 bg-gradient-to-br from-gray-900/80 to-purple-800/80 
                   backdrop-blur-lg rounded-2xl shadow-2xl border border-purple-600/50 `}
      >
        {/* Title */}
        <motion.h1
          key={isLogin ? "login" : "signup"}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-3xl font-bold text-center text-purple-200 mb-6 "
        >
          {isLogin ? "Login" : "Sign Up"}
        </motion.h1>

        {/* Form */}
        <form
          className="space-y-5 "
          onSubmit={(e) => e.preventDefault()}
        >
          <AnimatePresence>
            {!isLogin && (
              <motion.div
                key="signup-fields"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                {/* First Name */}
                <label className="label">
                  <span className="text-sm text-purple-200">First Name</span>
                </label>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Your Name"
                  className="w-full input input-bordered bg-black/40 text-white 
                             focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {/* Last Name */}
                <label className="label">
                  <span className="text-sm text-purple-200">Last Name</span>
                </label>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="w-full input input-bordered bg-black/40 text-white 
                             focus:ring-2 focus:ring-purple-500"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <div>
            <label className="label">
              <span className="text-sm text-purple-200">Email</span>
            </label>
            <input
              type="email"
              value={email}
              placeholder="example@in.com"
              className="w-full input input-bordered bg-black/40 text-white 
                         focus:ring-2 focus:ring-purple-500"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="text-sm text-purple-200">Password</span>
            </label>
            <div className="relative w-full">
              <input
                type={passwordShow ? "text" : "password"}
                value={password}
                placeholder="Enter Password"
                className="w-full input input-bordered bg-black/40 text-white 
                           focus:ring-2 focus:ring-purple-500 pr-10"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setPasswordShow(!passwordShow)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-pink-300 transition-colors"
              >
                {passwordShow ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          {/* Switch Login/Signup */}
          <p
            className="text-xs text-purple-200 cursor-pointer hover:underline hover:text-pink-300"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already a User? Login"}
          </p>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 rounded-xl font-semibold 
                         bg-gradient-to-r from-pink-500 to-purple-700 text-white shadow-lg"
              onClick={(e) => (isLogin ? loginHnadler() : signUpHandler(e))}
            >
              {isLogin ? "Login" : "Sign Up"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
