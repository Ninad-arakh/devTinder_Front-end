import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";
import { motion } from "framer-motion";
import dummyProfile from "../assets/dummy.jpeg";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, gender, about } = user;
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleSendReq = async (status, _id) => {
    setSwipeDirection(status === "ignored" ? "left" : "right");
    setTimeout(async () => {
      const res = await axios.post(
        BASE_URL + "request/send/" + status + "/" + _id + "/",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(removeFromFeed(_id));
        setSwipeDirection(null);
      }
    }, 200);
  };

  const cardVariants = {
    initial: { x: 0, opacity: 1, rotate: 0 },
    swipeLeft: {
      x: "-120%",
      opacity: 0,
      rotate: -10,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    swipeRight: {
      x: "120%",
      opacity: 0,
      rotate: 10,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="w-96 h-[35rem] rounded-2xl shadow-lg border border-white/20 backdrop-blur-xl bg-white/10 overflow-hidden my-3 bg-gradient-to-br from-pink-500 via-pink-600 to-purple-700"
      variants={cardVariants}
      initial="initial"
      animate={
        swipeDirection === "left"
          ? "swipeLeft"
          : swipeDirection === "right"
          ? "swipeRight"
          : "initial"
      }
      whileHover={{ scale: 1.02 }}
    >
      {/* Profile Image */}
      <div className="h-56 w-full overflow-hidden">
        <img
          src={
            !user.photoUrl && !user.file
              ? dummyProfile
              : user?.photoUrl
              ? user?.photoUrl
              : user?.file
          }
          alt="user"
          className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 hover:scale-110 "
        />
      </div>

      {/* Card Body */}
      <div className="p-4 flex flex-col justify-around h-[calc(100%-14rem)] ">
        <div>
          {firstName && lastName && (
            <h2 className="text-xl font-bold text-white drop-shadow-md text-center">
              {firstName + " " + lastName}
            </h2>
          )}
          {gender && (
            <h3 className="text-sm text-purple-200 mt-1 text-center">
              Gender: {gender}
            </h3>
          )}
          {about && (
            <p className="mt-3 text-sm text-white/80 bg-white/10 rounded-lg p-2 h-28 overflow-y-auto backdrop-blur-md">
              {about}
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-around mt-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 rounded-xl bg-gray-500/80 text-white shadow-lg hover:bg-gray-600"
            onClick={() => handleSendReq("ignored", user._id)}
          >
            Ignore
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-pink-400 to-purple-500 text-white shadow-lg"
            onClick={() => handleSendReq("intrested", user._id)}
          >
            Interested
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default UserCard;
