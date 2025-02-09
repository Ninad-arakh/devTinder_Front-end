import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addToRequests, removeRequests } from "../utils/requestsSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const req = useSelector((store) => store.requests);

  const getRequests = async (status, _id) => {
    const res = await axios.get(BASE_URL + "user/requests/reviewed", {
      withCredentials: true,
    });
    dispatch(addToRequests(res?.data?.data));
    console.log(res?.data?.data);
  };

  const statusHandler = async (status, _id) => {
    const res = await axios.post(
      BASE_URL + "request/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    dispatch(removeRequests(res.data.data));
  };

  useEffect(() => {
    if (!req) getRequests();
  }, []);

  if (!req) return;

  if (req.length === 0) {
    return (
      <div className="flex justify-center  mt-4">
        <h2>You don't have any requests yet!</h2>
      </div>
    );
  }
  return (
    <div>
      {req.map((connection) => {
        const reqId = connection._id;
        const { _id, firstName, lastName, about, photoUrl, gender } =
          connection.fromUserId;
        return (
          <div key={_id} className=" flex justify-center ">
            <div className="flex justify-around bg-base-200 rounded-lg md:w-6/12 my-2 items-center ">
              <div>
                {photoUrl && (
                  <img
                    alt="profile"
                    src={BASE_URL+photoUrl?.filePath}
                    className="w-32 h-32 rounded-full  "
                  />
                )}
              </div>
              <div className="w-6/12  ">
                <h2 className="font-bold uppercase text-white">
                  {firstName + " " + lastName}
                </h2>
                {gender && <p>{gender}</p>}
                <p className="h-32 overflow-y-scroll ">{about}</p>
              </div>
              <div className="flex flex-col">
                <button
                  className="btn btn-outline btn-secondary m-1"
                  onClick={() => statusHandler("accepted", reqId)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-outline btn-info m-1"
                  onClick={() => statusHandler("rejected", reqId)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
