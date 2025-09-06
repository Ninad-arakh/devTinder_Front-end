import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [file, setFile] = useState(user?.photoUrl || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingP, setIsLoadingP] = useState(false);
  const dispatch = useDispatch();

  // console.log("user : ", user )

  const saveProfile = async () => {
    setIsLoadingP(true)
    try {
      const res = await axios.patch(
        BASE_URL + "profile/update/",
        { firstName, lastName, about, gender },
        { withCredentials: true }
      );
      if (res.status === 200) {
        dispatch(addUser(res?.data?.data));
        toast.success("Profile updated successfully!");
        setIsLoadingP(false)
      }
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
      console.error(err);
      setIsLoadingP(false)
    }
  };

  const uploadImage = async (e) => {
    setIsLoading(true)
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
        {
          withCredentials: true,
        }
      );
      // console.log("response : ", response)
      if (response.status === 200) {toast.success(response.data.message);setIsLoading(false)}
    } catch (error) {
      toast.error("Error uploading file. Please try again.");
      console.error("There was an error uploading the file!", error);
      setIsLoading(false)
    }
  };

  const handleGender = (value) => {
    setGender(value);
  };

  return (
    <>
      <div className="md:flex justify-center">
        <div className="relative flex flex-col justify-center md:h-screen overflow-hidden mx-2">
          <div
            className="w-full p-6 m-auto bg-base-200 mt-2 rounded-xl shadow-md lg:max-w-lg border border-fuchsia-900"
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
                />
                <div className="flex w-full justify-between">
                  <input
                    type="file"
                    className="file-input file-input-bordered w-full max-w-xs"
                    name="profileImage"
                    onChange={(e) => setFile(e?.target?.files[0])}
                  />
                  {file &&
                    (!isLoading ? (
                      <button
                        className="btn btn-primary"
                        encType="multipart/form-data"
                        onClick={(e) => uploadImage(e)}
                      >
                        Upload
                      </button>
                    ) : (
                      <button className="btn btn-primary">
                        <span className="loading loading-spinner loading-md"></span>
                      </button>
                    ))}
                </div>
              </div>
              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 hover:bg-slate-600 hover:text-white bg-slate-600"
                >
                  Gender
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a onClick={() => handleGender("male")}>Male</a>
                  </li>
                  <li>
                    <a onClick={() => handleGender("female")}>Female</a>
                  </li>
                </ul>
              </div>

              <div className="justify-center flex">
                {!isLoadingP ? (
                  <button className="btn btn-primary" onClick={saveProfile}>
                    Save Profile
                  </button>
                ) : (
                  <button className="btn btn-primary">
                    <span className="loading loading-spinner loading-md"></span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="mx-2">
          <UserCard user={{ firstName, lastName, about, gender, file }} />
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
};

export default EditProfile;
