import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToRequests, removeRequests } from "../utils/requestsSlice";
import { motion } from "framer-motion";

const Requests = () => {
  const dispatch = useDispatch();
  const req = useSelector((store) => store.requests);

  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/reviewed/", {
        withCredentials: true,
      });
      if (res.status === 200) dispatch(addToRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  const statusHandler = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "request/review/" + status + "/" + _id + "/",
        {},
        { withCredentials: true }
      );
      if (res.status === 200) dispatch(removeRequests(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!req) getRequests();
  }, []);

  if (!req) return null;

  if (req.length === 0) {
    return (
      <div className="flex justify-center pt-10  h-screen bg-gradient-to-b from-purple-900 via-gray-900 to-black">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white text-lg font-semibold bg-white/20 px-4 py-2 rounded-xl backdrop-blur-lg shadow-lg h-12 "
              >
                You don't have any requests yet!
              </motion.h2>
            </div>
    );
  }

  return (
    <div className="flex h-screen flex-col gap-4 pt-4 bg-gradient-to-b from-purple-900 via-gray-900 to-black">
      {req.map((connection, index) => {
        const reqId = connection._id;
        const { _id, firstName, lastName, about, photoUrl, gender } =
          connection.fromUserId;

        return (
          <motion.div
            key={_id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="flex justify-center"
          >
            <div className="flex justify-between items-center bg-base-200 rounded-2xl md:w-7/12 w-11/12 p-4 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                {photoUrl && (
                  <img
                    alt="profile"
                    src={photoUrl}
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-2 ring-offset-2 ring-secondary"
                  />
                )}
              </div>

              {/* User Info */}
              <div className="flex flex-col w-6/12 px-4 gap-2">
                <h2 className="font-bold uppercase text-white text-lg tracking-wide">
                  {firstName + " " + lastName}
                </h2>
                {gender && (
                  <p className="text-sm text-gray-400 italic">{gender}</p>
                )}
                <p className="max-h-24 overflow-y-auto text-sm text-gray-300 scrollbar-hide">
                  {about}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => statusHandler("accepted", reqId)}
                  className="btn btn-outline btn-secondary w-28"
                >
                  Accept
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => statusHandler("rejected", reqId)}
                  className="btn btn-outline btn-info w-28"
                >
                  Reject
                </motion.button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Requests;
