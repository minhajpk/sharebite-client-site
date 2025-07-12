import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import log from "../assets/Untitled design.png";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
    const { createUser, signInWithGoogle, updateUserProfile } = use(AuthContext)
    const navigate = useNavigate();
    const [userprofile, setUserProfile] = useState();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Register Data:", data);
        createUser(data.email, data.password)
            .then((result) => {
                console.log(result.user);

                const Profile = {
                    displayName: data.name,
                    photoURL: userprofile, 
                };

                updateUserProfile(Profile)
                    .then(() => {
                        console.log("Profile updated");

                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Account created successfully!",
                            showConfirmButton: false,
                            timer: 2000,
                        });

                        navigate('/');
                    })
                    .catch((error) => {
                        console.error("Profile update failed:", error);
                    });
            })
            .catch((error) => {
                console.error("User creation failed:", error);
            });
    };
    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in successfully with Google",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        console.log(file);

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_api_key}`,
                formData
            );

            if (res.data.success) {
                const imageUrl = res.data.data.display_url;
                setUserProfile(imageUrl);
                console.log("Uploaded Image URL:", imageUrl);
                // You can now save imageUrl to your database if needed
            } else {
                console.error("Image upload failed:", res.data);
            }
        } catch (error) {
            console.error("Upload error:", error);
        }
    };




    return (
        <div className="min-h-screen   flex items-center justify-center gap-5 px-4">
            <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-10">

                {/* Register Form */}
                <div data-aos="fade-up-right" className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center text-[#03373D] mb-6">Register your account</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="input input-bordered w-full"
                                    {...register("name", { required: "Name is required" })}
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                                )}
                            </div>
                            {/* Photo */}

                            <div>
                                <label htmlFor="profileImage" className="label">
                                    <span className="label-text">Profile Picture</span>
                                </label>
                                <input
                                    id="profileImage"
                                    type="file"
                                    onChange={handleImageUpload}
                                    className="file-input file-input-bordered w-full"

                                />
                                {errors.profileImage && (
                                    <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="input input-bordered w-full"
                                    {...register("email", { required: "Email is required" })}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password must be at least 6 characters.",
                                        },
                                        validate: {
                                            hasUpperCase: (value) =>
                                                /[A-Z]/.test(value) || "Password must include at least one uppercase letter.",
                                            hasSpecialChar: (value) =>
                                                /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                                "Password must include at least one special character.",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button type="submit" className="btn bg-[#0e606e] w-full text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e]">
                                Register
                            </button>

                            {/* Login Link */}
                            <p>Don’t have any account? <Link to='/login'><span className='text-[#03373D] font-bold'>Login</span></Link></p>
                            <div className="divider">OR</div>
                            <button onClick={handleGoogleSignIn} className="btn w-full bg-white text-[#03373D] border-[#0e606e] hover:scale-105 transition duration-300 hover:bg-[#0e606e] hover:text-white ">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                        </form>
                    </div>
                </div>

                {/* Image */}
                <div data-aos="fade-up-left" className="w-full lg:w-1/2">
                    <img
                        src={log}
                        alt="Register Illustration"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
