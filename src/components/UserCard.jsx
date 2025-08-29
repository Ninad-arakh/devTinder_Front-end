import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";
import { motion } from "framer-motion";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, gender, about } = user;
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
    }, 500); // Delay to allow swipe animation to complete
  };

  const cardVariants = {
    initial: { x: 0, opacity: 1 },
    swipeLeft: { x: "-100vw", opacity: 0, transition: { duration: 0.5 } },
    swipeRight: { x: "100vw", opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex justify-center m-2 cursor-pointer mt-20 md:mt-2">
      <motion.div
        className="card bg-base-200 w-96 shadow-xl h-[35rem] border border-fuchsia-900"
        variants={cardVariants}
        initial="initial"
        animate={
          swipeDirection === "left"
            ? "swipeLeft"
            : swipeDirection === "right"
            ? "swipeRight"
            : "initial"
        }
      >
        <figure>
          {photoUrl && (
            <img
              src={BASE_URL + photoUrl?.filePath}
              alt="userImage"
              className="hover:scale-105 transition-transform duration-300"
            />
          )}
        </figure>
        <div className="card-body">
          {firstName && lastName && (
            <h2 className="card-title text-lg font-bold text-center">
              {firstName + " " + lastName}
            </h2>
          )}
          {gender && <p className="text-sm text-gray-600">Gender: {gender}</p>}
          {about && (
            <p className="h-14 overflow-y-scroll text-sm text-gray-700">
              About: {about}
            </p>
          )}
          <div className="card-actions justify-end space-x-4 mt-4">
            <motion.button
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSendReq("ignored", user._id)}
            >
              Ignore
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSendReq("intrested", user._id)}
            >
              Interested
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserCard;
