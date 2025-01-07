import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const isUser = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUser) {
      navigate("/login");
    }
  }, []);

  return <div>Feed</div>;
};

export default Feed;
