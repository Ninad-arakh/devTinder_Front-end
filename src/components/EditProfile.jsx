import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [about, setAbout] = useState(user?.about);
  const [gender, setGender] = useState(user?.gender);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("Something went Wrong!");
  const [toastTime, setToastTime] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "profile/update",
        { firstName, lastName, about, gender, photoUrl },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setToastTime(true);
      setTimeout(() => {
        setToastTime(false);
      }, 3000);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };
  return (
    <>
      <div className="flex justify-center ">
        <div className="relative flex flex-col justify-center h-screen overflow-hidden mx-2">
          <div
            className="w-full p-6  m-auto bg-base-200 mt-2 rounded-md shadow-md lg:max-w-lg border border-fuchsia-900"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-3xl font-semibold text-center text-purple-700 pb-4">
              Update Profile
            </h1>
            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  value={firstName}
                  placeholder="First Name"
                  className="w-full input input-bordered input-primary my-1"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="Last Name"
                  className="w-full input input-bordered input-primary my-1"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <textarea
                  className="textarea textarea-primary my-1 h-[10rem] w-full"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                >
                  {about}
                </textarea>
                <input
                  type="text"
                  value={photoUrl}
                  placeholder="photo Url"
                  className="w-full input input-bordered input-primary my-1"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              <div className="dropdown dropdown-hover  ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 hover:bg-slate-600 hover:text-white bg-slate-600"
                >
                  Gender
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu  rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Male</a>
                  </li>
                  <li>
                    <a>Female</a>
                  </li>
                </ul>
              </div>

              <div className="justify-center flex">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mx-2">
          <UserCard user={{ firstName, lastName, about, gender, photoUrl }} />
        </div>
      </div>
      {(toastTime ) && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>Profile Updated successfully.</span>
        </div>
      </div>}
    </>
  );
};

export default EditProfile;
