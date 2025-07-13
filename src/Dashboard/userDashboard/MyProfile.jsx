import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  const userInfo = {
    name: user?.displayName || "No name provided",
    email: user?.email || "No email",
    photo: user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
    contact: user?.phoneNumber || "Not provided",
    joined: user?.metadata?.creationTime || "Unknown date",
    role: user?.role || "user", // default role fallback
  };

  if (!user) {
    return <div className="text-center mt-20">Loading user data...</div>;
  }

  // Roles to show in badge
  const visibleRoles = ["admin", "restaurant", "charity"];

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
      <div className="flex flex-col items-center text-center space-y-4">
        <img
          src={userInfo.photo}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover shadow"
        />
        <h2 className="text-xl font-bold">{userInfo.name}</h2>

        {/* Show role only for admin, restaurant, or charity */}
        {visibleRoles.includes(userInfo.role) && (
          <span className="badge badge-info capitalize">Role: {userInfo.role}</span>
        )}

        <div className="w-full text-left mt-4 space-y-2">
          <p><strong>Email:</strong> {userInfo.email}</p>
          <p><strong>Contact:</strong> {userInfo.contact}</p>
          <p><strong>Joined:</strong> {userInfo.joined}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

