import React from "react";
import { useForm } from "react-hook-form";
import log from "../assets/login.webp";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Register Data:", data);
    // Add your registration logic here
  };

  return (
    <div className="min-h-screen  bg-base-200 flex items-center justify-center gap-5 px-4">
      <div className="max-w-7xl mx-auto w-full flex flex-col-reverse lg:flex-row items-center gap-10">
        
        {/* Register Form */}
        <div data-aos="fade-up-right" className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h1 className="text-2xl font-bold text-center mb-6">Register your account</h1>
            
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
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  {...register("profileImage", { required: "Profile image is required" })}
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
              <button type="submit" className="btn btn-neutral w-full">
                Register
              </button>

              {/* Login Link */}
              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="link link-primary">
                  Login here
                </a>
              </p>
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
