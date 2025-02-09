import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFeed } from "../utils/feedSlice";
import { useSearchParams } from "react-router-dom";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const { firstName, lastName, photoUrl, gender, about } = user;

  const handleSendReq = async (status, _id) => {
    await axios.post(
      BASE_URL + "request/send/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    dispatch(removeFromFeed(_id));
  };

  return (
    <div className="flex justify-center m-2 cursor-pointer mt-20 md:mt-2">
      <div className="card bg-base-200 w-96 shadow-xl h-[35rem] border border-fuchsia-900">
        <figure>
          {photoUrl && (
            <img src={BASE_URL + photoUrl?.filePath} alt="userImage" />
          )}
        </figure>
        <div className="card-body">
          {firstName && lastName && (
            <h2 className="card-title">{firstName + " " + lastName}</h2>
          )}
          {gender && <p>Gender : {gender}</p>}
          {about && <p className="h-14 overflow-y-scroll">About : {about}</p>}
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => handleSendReq("ignored", user._id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendReq("intrested", user._id)}
            >
              Intrested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
