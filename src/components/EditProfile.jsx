import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [file, setFile] = useState(user?.photoUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingP, setIsLoadingP] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setIsLoadingP(true);
    try {
      const res = await axios.patch(
        BASE_URL + "profile/update/",
        { firstName, lastName, about, gender },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res?.data?.data));
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
      console.error(err);
    } finally {
      setIsLoadingP(false);
    }
  };

  const uploadImage = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!file) {
      toast.error("Please choose a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await axios.post(
        BASE_URL + "profile/uploadImage/",
        formData,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-tr from-pink-400 via-pink-500 to-purple-500 flex flex-col md:flex-row justify-center items-center p-6">
        
        {/* Edit Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-lg border border-white/20 mx-2"
        >
          <h1 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-md">
            Update Profile
          </h1>

          <form className="space-y-4">
            <input
              type="text"
              value={firstName}
              placeholder="First Name"
              className="input input-bordered w-full rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              type="text"
              value={lastName}
              placeholder="Last Name"
              className="input input-bordered w-full rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-pink-400"
              onChange={(e) => setLastName(e.target.value)}
            />

            <textarea
              className="textarea textarea-bordered w-full rounded-xl bg-white/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-purple-400"
              placeholder="Bio"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />

            {/* File Upload */}
            <div className="flex items-center gap-3">
              <input
                type="file"
                className="file-input file-input-bordered file-input-sm rounded-xl w-full bg-white/20 text-white"
                name="profileImage"
                onChange={(e) => setFile(e?.target?.files[0])}
              />
              {file &&
                (!isLoading ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn bg-gradient-to-r from-pink-400 to-purple-500 border-none text-white shadow-lg"
                    onClick={(e) => uploadImage(e)}
                  >
                    Upload
                  </motion.button>
                ) : (
                  <button className="btn bg-gradient-to-r from-pink-400 to-purple-500 border-none text-white shadow-lg">
                    <span className="loading loading-spinner loading-md"></span>
                  </button>
                ))}
            </div>

            {/* Gender Dropdown */}
            <div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="btn w-full bg-purple-500/70 border-none text-white rounded-xl hover:scale-105 transition"
              >
                {gender ? gender : "Select Gender"}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-white/20 backdrop-blur-lg rounded-xl shadow-lg text-white"
              >
                <li>
                  <a onClick={() => setGender("male")}>Male</a>
                </li>
                <li>
                  <a onClick={() => setGender("female")}>Female</a>
                </li>
              </ul>
            </div>

            {/* Save Profile */}
            <div className="flex justify-center">
              {!isLoadingP ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white border-none shadow-lg"
                  onClick={saveProfile}
                >
                  Save Profile
                </motion.button>
              ) : (
                <button className="btn w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white border-none shadow-lg">
                  <span className="loading loading-spinner loading-md"></span>
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Profile Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 md:mt-0 mx-2"
        >
          <UserCard user={{ firstName, lastName, about, gender, file }} />
        </motion.div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default EditProfile;
