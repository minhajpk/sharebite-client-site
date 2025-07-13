import React, { use } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router";
import useAxios from "../../Hooks/axiosInstance";
import Swal from "sweetalert2";

const RequestCharityRole = () => {
    const { user } = use(AuthContext)
    const navigate = useNavigate();
    const axiosSecure = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Charity Role Request:", data);
        const requestData = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png",
            role: "charity-requested",
            organization: data.organization,
            mission: data.mission,
            createdAt: new Date(),
            paymentAmount: 25,
            paymentStatus: "unpaid",
        };


        try {
            const res = await axiosSecure.post('/request_info', requestData)
            console.log(res.data)
            if (res.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your Request has been Submit Successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(`/dashboard/payment/${res.data.insertedId}`);
            } else {
                alert("Failed to submit request. Please try again.");
            }
        } catch (error) {
            console.error("Charity request failed:", error);
            alert("Something went wrong. Please try again later.");
        }

    };



    return (
        <div className="max-w-xl mx-auto bg-white shadow-md p-8 rounded-md mt-10">
            <h2 className="text-2xl font-bold text-center mb-6">Request Charity Role</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* User Name (read-only) */}
                <div>
                    <label className="label">User Name</label>
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* User Email (read-only) */}
                <div>
                    <label className="label">Email</label>
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                {/* Organization Name */}
                <div>
                    <label className="label">Organization Name</label>
                    <input
                        type="text"
                        {...register("organization", { required: "Organization name is required" })}
                        placeholder="Your organization name"
                        className="input input-bordered w-full"
                    />
                    {errors.organization && (
                        <p className="text-red-500 text-sm">{errors.organization.message}</p>
                    )}
                </div>

                {/* Mission Statement */}
                <div>
                    <label className="label">Mission Statement</label>
                    <textarea
                        rows="4"
                        {...register("mission", { required: "Mission statement is required" })}
                        placeholder="Briefly describe your mission"
                        className="textarea textarea-bordered w-full"
                    ></textarea>
                    {errors.mission && (
                        <p className="text-red-500 text-sm">{errors.mission.message}</p>
                    )}
                </div>

                {/* Fixed Payment Info */}
                <div className="text-lg font-medium text-gray-700">
                    Payment Amount: <span className="text-[#0e606e]">$25</span>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-[#0e606e] btn w-full text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]">
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default RequestCharityRole;
