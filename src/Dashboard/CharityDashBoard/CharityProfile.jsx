import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/axiosSecure";
import { FaUserShield } from "react-icons/fa";

const CharityProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch user info from backend using email
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axiosSecure.get("/users");
                const matchedUser = res.data.find((u) => u.email === user?.email);
                setUserInfo(matchedUser);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user info:", error);
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchUser();
        }
    }, [user, axiosSecure]);

    if (loading || !userInfo) {
        return <div className="text-center mt-20">Loading user data...</div>;
    }

    // Show role badge only for specific roles
    const showRoleBadge = ["admin", "restaurant", "charity"].includes(userInfo.role);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-8 mt-10">
            <div className="flex flex-col items-center text-center space-y-4">
                <img
                    src={userInfo.
                        photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt="User Avatar"
                    className="w-24 h-24 rounded-full object-cover shadow"
                />
                <h2 className="text-xl font-bold">{userInfo.name || "No name"}</h2>

                {showRoleBadge && (
                    <span className="badge badge-info bg-green-700 text-white font-bold capitalize flex items-center gap-1">
                        <FaUserShield /> {userInfo.role}
                    </span>
                )}

                <div className="w-full text-left mt-4 space-y-2">
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Contact:</strong> {userInfo.contact || "Not provided"}</p>
                    <p><strong>Joined:</strong> {user?.metadata?.creationTime || "Unknown"}</p>
                </div>
            </div>
        </div>
    );
};

export default CharityProfile;
