import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loginAnimation from "../../assets/LottieFiles/login-cpa.json";
import {
  FaArrowCircleLeft,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa"; // Added eye icons for password toggle
import { useState } from "react"; // Import useState for password toggle
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to handle password visibility

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className="h-screen flex">
      <Helmet>
        <title>Login - CPA NETWORK</title>
      </Helmet>
      {/* Left Side - Lottie Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-100 justify-center items-center">
        <Lottie
          animationData={loginAnimation}
          className="w-3/4"
          autoplay
          loop
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 px-6 md:px-12">
        <div className="w-full max-w-md">
          <div className="text-3xl flex font-bold items-center text-red-700 mb-6">
            <Link to={"/"}>
              <FaArrowCircleLeft className="mr-2" />
            </Link>
            <h1>Publisher Login!</h1>
          </div>

          {/* Login Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Email Address
              </label>
              <FaEnvelope className="absolute left-3 top-11 transform -translate-y-1/2 text-red-500" />
              <input
                name="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                autoComplete="email"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-1"
              >
                Password
              </label>
              <FaLock className="absolute  left-3 top-11 transform -translate-y-1/2 text-red-500" />
              <input
                name="password"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="password"
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                autoComplete="current-password"
                required
              />
              {/* Password visibility toggle */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-11 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-red-500" />
                ) : (
                  <FaEye className="text-green-500" />
                )}
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded-md font-bold hover:bg-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-500"
            >
              Login
            </button>
          </form>

          {/* Additional Links */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <a
              href="#"
              className="text-red-500 font-semibold hover:underline hover:text-blue-500 "
            >
              Forgot Password?
            </a>
            <Link
              to={"/register"}
              className="text-red-500 font-semibold hover:underline hover:text-lime-500"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
