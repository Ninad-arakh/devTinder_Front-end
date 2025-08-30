import React, { useState } from "react";
import { BASE_URL } from "../utils/constants.js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

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

  const screenWidth = window.screen.width;
  let isScreen;
  if (screenWidth <= 640) {
    isScreen = true;
  }

  const loginHnadler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "login/",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data.data));
        toast.success("Login Success");
        navigate("/");
      }
    } catch (e) {
      toast.error("Something went wrong ! " + e.response.data);
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
        navigate("/profile");
      }
    } catch (err) {
      e.preventDefault();
      console.log(err);
      toast.error("Something went wrong! ");
    }
  };
  if (isUser && !isLogin) {
    navigate("/profile");
  } else if (isUser) {
    navigate("/");
  }
  return (
    <div className="bg-gradient-to-tr to-red-400 via-pink-500 from-pink-400 ">
      <ToastContainer position="bottom-right" autoClose={3000} />
      <div className="relative flex flex-col justify-center h-screen overflow-hidden">
        <div
          className={`w-full p-6  m-auto bg-base-200 bg-opacity-60 rounded-md shadow-md lg:max-w-lg ${isScreen ? "mt-0" : "mt-25"} `}
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
                    className="w-full input input-bordered input-primary bg-[#2a2936] bg-opacity-70"
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
                    className="w-full input input-bordered input-primary bg-[#2a2936] bg-opacity-70"
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
                className="w-full input input-bordered input-primary bg-[#2a2936] bg-opacity-70"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="text-base text-purple-200 label-text">
                  Password
                </span>
              </label>
              <div className="relative w-full">
                <input
                  type={passwordShow ? "text" : "password"}
                  value={password}
                  placeholder="Enter Password"
                  className="w-full input input-bordered input-primary bg-[#2a2936] bg-opacity-70 pr-10"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setPasswordShow(!passwordShow)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white   p-2 rounded-xl"
                >
                  {passwordShow ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </div>
            <p
              className="text-xs text-white cursor-pointer hover:underline hover:text-blue-200"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Register"
                : "Already a User? Login"}
            </p>

            {/* {error && <p className="text-red-500">{error}</p>} */}
            <div className="justify-center flex pt-6">
              <button
                className="btn btn-primary hover:scale-110 hover:shadow-lg"
                onClick={(e) => (isLogin ? loginHnadler() : signUpHandler(e))}
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
