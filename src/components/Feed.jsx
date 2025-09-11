import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addToFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

const Feed = () => {
  const isUser = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getfeed = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "feed/", { withCredentials: true });
    if (res.status === 200) dispatch(addToFeed(res.data.users));
  };

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
    if (!feed) getfeed();
  }, []);

  if (!feed) return null;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center pt-10  h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-lg font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-lg shadow-lg h-12 "
        >
          🚀 No more people are on this platform yet!
        </motion.h2>
      </div>
    );
  }

  return (
    feed && (
      <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-b from-purple-900 via-gray-900 to-black">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
