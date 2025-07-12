import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";


const MyProfile = () => {
  const { user } = use(AuthContext);

  // Optional mock data (you can replace with real backend/user DB info)
  const userInfo = {
    contact: user?.phoneNumber || "Not provided",
    joined: user?.metadata?.creationTime || "Unknown date",
    role: user?.role || "user", // Assume 'user' if not specified
  };

  if (!user) {
    return <div className="text-center mt-20">Loading user data...</div>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10 ">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover shadow"
        />
        <h2 className="text-xl font-bold">{user.displayName || "No name"}</h2>

        {/* Only show role if it's not 'user' */}
        {userInfo.role !== "user" && (
          <span className="badge badge-success capitalize">Role: {userInfo.role}</span>
        )}

        <div className="w-full text-left mt-4 space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {userInfo.contact}</p>
          <p><strong>Joined:</strong> {userInfo.joined}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

