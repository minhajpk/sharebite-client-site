import React, { use } from "react";
import { useForm } from "react-hook-form";
import log from "../assets/Untitled design.png";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import {
    HiOutlineHome
} from 'react-icons/hi';

const Login = () => {
    const {signInWithGoogle, signIn} = use(AuthContext);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Login Data:", data);
        signIn(data.email, data.password)
        .then(result =>{
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
        .catch(error =>{
            console.log(error);
        });
    };
    const handleGoogleSignIn = ()=>{
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

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-10">

                {/* Login Form */}
                <div data-aos="fade-up-right" className="card w-full max-w-md bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h1 className="text-2xl font-bold text-center text-[#03373D] mb-6">Login to your account</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>

                            <fieldset className="fieldset">
                                <label className="label">Email</label>
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
                                <label className="label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 6,
                                            message: "Password doesn't match.",
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <button className="btn  mt-4 bg-[#0e606e] text-white hover:scale-105 transition duration-300 hover:bg-[#0e606e] ">Login</button>
                                <p>Don’t have any account? <Link to='/register'><span className='text-[#03373D] font-bold'>Register</span></Link></p>
                                <div className="divider">OR</div>
                                <button onClick={handleGoogleSignIn} className="btn bg-white text-[#03373D] border-[#0e606e] hover:scale-105 transition duration-300 hover:bg-[#0e606e] hover:text-white ">
                                    <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                    Login with Google
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>

                {/* Login Image (No Overlay) */}
                <div data-aos="fade-up-left" className="w-full lg:w-1/2">
                    <img
                        src={log}
                        alt="Login Illustration"
                        className="w-full h-auto rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
