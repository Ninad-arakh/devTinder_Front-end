import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import tinder from "../../icons-tinder.png";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "logout/",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        navigate("/login");
        dispatch(removeUser());
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="navbar sticky top-0 z-50 bg-gradient-to-r from-purple-900 via-pink-700 to-purple-900 backdrop-blur-lg bg-opacity-80 shadow-lg"
    >
      {/* Logo */}
      <div className="flex-1">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-200 hover:scale-105 transition-transform duration-200"
        >
          <motion.img
            src={tinder}
            className="w-7"
            alt="logo"
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          DevTinder
        </Link>
      </div>

      {/* User Menu */}
      {user && (
        <div className="flex-none pr-3">
          <div className="dropdown dropdown-end">
            <motion.div
              tabIndex={0}
              role="button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-ghost btn-circle avatar ring-2 ring-purple-500 ring-offset-2 hover:ring-pink-500 transition-all"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  alt="user avatar"
                  src={
                    user?.photoUrl
                      ? user.photoUrl
                      : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                />
              </div>
            </motion.div>

            {/* Dropdown Menu */}
            <AnimatePresence>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 w-52 p-2 shadow-xl rounded-xl
                  bg-gradient-to-br from-gray-900/90 to-purple-800/90 backdrop-blur-md text-white z-[1]"
              >
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/connections">My Connections</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <Link to="/requests">Requests</Link>
                </motion.li>
                <motion.li whileHover={{ x: 5 }}>
                  <button onClick={logoutHandler} className="text-red-400">
                    Logout
                  </button>
                </motion.li>
              </ul>
            </AnimatePresence>
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
