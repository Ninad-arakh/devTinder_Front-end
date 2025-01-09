import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addToFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const isUser = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getfeed = async () => {
    if (feed) return;
    const res = await axios.get(BASE_URL + "feed", { withCredentials: true });
    dispatch(addToFeed(res.data.users));
  };

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
    if (!feed) getfeed();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <div className="flex justify-center  mt-4">
        <h2>No more peoples are on this platform yet!</h2>
      </div>
    );
  }

  return (
    feed && (
      <div>
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
