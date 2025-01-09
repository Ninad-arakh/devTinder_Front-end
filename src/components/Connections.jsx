import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToConnections } from "../utils/connectionsSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addToConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center border border-white mt-4">
        <h2>You don't have any connections yet!</h2>
      </div>
    );
  }
  return (
    <div>
      {connections.map((connection) => {
        const { _id, firstName, lastName, about, photoUrl, gender } =
          connection;
        return (
          <div key={_id}  className=" flex justify-center ">
            <div className="flex justify-around bg-base-200 rounded-lg w-6/12 my-2 items-center ">
            <div>
              {photoUrl && (
                <img
                  alt="profile"
                  src={photoUrl}
                  className="w-32 h-32 rounded-full  "
                />
              )}
            </div>
            <div className="w-6/12 ">
              <h2 className="font-bold uppercase text-white">
                {firstName + " " + lastName}
              </h2>
              {gender && <p>{gender}</p>}
              <p className="h-32 overflow-y-scroll ">{about}</p>
            </div>
            <div className="flex flex-col">
              <button className="btn btn-outline btn-secondary m-1">
                View Profile
              </button>
              <button className="btn btn-outline btn-info m-1">Message</button>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
