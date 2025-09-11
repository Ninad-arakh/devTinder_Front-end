import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToConnections } from "../utils/connectionsSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/connections/", {
        withCredentials: true,
      });
      if (res.status === 200) dispatch(addToConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!connections) fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) {
    return (
      <div className="flex justify-center pt-10  h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white text-lg font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-lg shadow-lg h-12 "
              >
                Please add some friends first!
              </motion.h2>
            </div>
    );
  }

  return (
    <div className="space-y-6 px-4 md:px-10 h-screen py-3 bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      {connections.map((connection, idx) => {
        const { _id, firstName, lastName, about, photoUrl, gender } = connection;

        return (
          <motion.div
            key={_id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="flex flex-col md:flex-row items-center justify-between 
                       bg-white/10 backdrop-blur-xl border border-fuchsia-500/40 
                       rounded-2xl shadow-lg p-5 md:w-8/12 mx-auto hover:shadow-fuchsia-500/30
                       transition-all duration-300"
          >
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {photoUrl && (
                <img
                  alt="profile"
                  src={photoUrl}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover 
                             ring-2 ring-fuchsia-400/50 shadow-lg 
                             transition-transform duration-500 hover:scale-105"
                />
              )}
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center md:items-start mt-4 md:mt-0 md:w-6/12 gap-2 text-center md:text-left">
              <h2 className="font-extrabold text-xl bg-gradient-to-r from-pink-400 to-fuchsia-500 bg-clip-text text-transparent drop-shadow-md textarea-bordered">
                {firstName + " " + lastName}
              </h2>
              {gender && <p className="text-sm text-purple-200">Gender: {gender}</p>}
              {about && (
                <p className="mt-2 text-sm text-white/80 bg-white/10 backdrop-blur-md p-3 rounded-lg h-24 overflow-y-auto scrollbar-hide">
                  {about}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-4 md:mt-0 w-full md:w-auto">
              <button className="w-full px-5 py-2 rounded-xl bg-gray-600/60 text-white shadow-md hover:bg-gray-700 transition-all">
                View Profile
              </button>
              <Link to={"/chat/" + _id}>
                <button className="w-full px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 text-white shadow-md hover:scale-105 transition-transform">
                  Message
                </button>
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Connections;
