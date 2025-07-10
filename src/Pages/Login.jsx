import React from "react";
import { useForm } from "react-hook-form";
import log from "../assets/login.webp";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login Data:", data);
    // Add your login logic here
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Login Form */}
        <div data-aos="fade-up-right" className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center mb-6">Login to your account</h1>
            
            <form  onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                      message: "Password doesn't match.",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-sm link link-hover">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-neutral w-full">
                Login
              </button>

              {/* Register Link */}
              <p className="text-sm text-center mt-4">
                Don’t have an account?{" "}
                <a href="/register" className="link link-primary">
                  Register here
                </a>
              </p>
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
