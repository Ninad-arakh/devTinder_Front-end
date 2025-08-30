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
    const screenWidth = window.screen.width;
  let isScreen;
  if (screenWidth <= 640) {
    isScreen = true;
  }

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
    }, 0); // Delay to allow swipe animation to complete
  };

  const cardVariants = {
    initial: { x: 0, opacity: 1, rotate: 0 },
    swipeLeft: { x: "-120%", opacity: 0, rotate: -10, transition: { duration: 0.2, ease: "easeInOut"  } },
    swipeRight: { x: "120%", opacity: 0, rotate: 10, transition: { duration: 0.2, ease: "easeInOut"  } },
  };

  return (
    <div className={`flex justify-center m-2 cursor-pointer ${isScreen?"mt-2":"mt-2"} scrollbar-hide overflow-hidden`}>
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
              // src={BASE_URL + photoUrl?.filePath}
              src="https://wallpapergod.com/images/hd/aesthetic-iphone-1125X2436-wallpaper-6d965l1ahs548e1w.jpeg"
              alt="userImage"
              className="hover:scale-105 transition-transform duration-300"
            />
          )}
        </figure>
        <div className="card-body">
          <div className="mb-2 ">
            {firstName && lastName && (
              <h2 className="card-title text-lg font-bold text-center ">
                {firstName + " " + lastName}
              </h2>
            )}
            {gender && (
              <h3 className="text-sm  text-gray-300">Gender: {gender}</h3>
            )}
          </div>
          {about && (
            <p className="h-14 overflow-y-scroll text-sm text-gray-300">
              About: {about}
            </p>
          )}
          <div className="card-actions justify-end space-x-4 mt-4">
            <motion.button
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSendReq("ignored", user._id)}
            >
              Ignore
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600"
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
