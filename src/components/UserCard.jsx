import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, gender, about } = user;
  return (
    <div className="flex justify-center m-2 cursor-pointer ">
      <div className="card bg-base-200 w-96 shadow-xl h-[35rem] border border-fuchsia-900">
        <figure>
          <img src={photoUrl} alt="userImage" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>Gender : {gender}</p>
          <p className="h-14 overflow-y-scroll">About : {about}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">Ignore</button>
            <button className="btn btn-primary">Intrested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
