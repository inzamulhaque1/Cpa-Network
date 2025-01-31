import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import countryList from "react-select-country-list";
import Select from "react-select";
import { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../assets/images/bg/rbgb.jpg";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // eslint-disable-next-line no-unused-vars
  const [uploading, setUploading] = useState(false);
  const axiosPublic = useAxiosPublic();

  const countryOptions = countryList().getData();
  const { signup, updateUserProfile,logout } = useAuth();
  const navigate = useNavigate();

  const sendEmail = (data) => {
    const emailParams = {
      from_name: "Your Company Name", // Sender's name
      reply_to: data.email, // User's email as the reply-to address
      to_email: data.email, // User's email as the recipient
      user_name: `${data.firstName} ${data.lastName}`, // User's name
      user_email: data.email, // User's email
    };
  
    console.log("Sending email with params:", emailParams);
  
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        emailParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          Swal.fire(
            "Success!",
            "Your account has been created. Check your email for a confirmation.",
            "success"
          );
        },
        (error) => {
          console.error("Email error:", error);
          toast.error("Email sending failed.");
        }
      );
  };


  const onSubmit = (data) => {
    setUploading(true);
    const imageFile = data.image[0];
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

    axios
      .post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData)
      .then((imageResponse) => {
        const imageUrl = imageResponse.data.data.display_url;

        signup(data.email, data.password)
          .then((userCredential) => {
            const user = userCredential.user;

            // Update the user's Firebase profile
            updateUserProfile(user, data.firstName, data.lastName, imageUrl);

            // Prepare user data for MongoDB
            const userData = {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              image: imageUrl,
              address: data.address,
              city: data.city,
              country: data.country,
              state: data.state,
              zip: data.zip,
              skype: data.skype,
              traffic: data.traffic,
              terms: data.terms,
              role: "user",
              activeStatus: "pending",
              uid: user.uid,
            };

            // Send data to backend for MongoDB storage
            axiosPublic
              .post("/users", userData)
              .then((response) => {
                if (response.status === 200) {
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your account has been created. Check your email for a confirmation!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  logout()
                  sendEmail(data);
                  navigate("/thanks-for-apply");
                }
              })
              .catch((error) => {
                console.error("Backend error:", error.message);
                alert("Error: " + error.message);
              });
          })
          .catch((error) => {
            console.error("Firebase signup error:", error.message);
            // alert('Error: ' + error.message);
            toast.error("Email Already Use");
          });
      })
      .catch((error) => {
        console.error("Image upload error:", error.message);
        toast.error("Image upload error");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <section
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "",
        width: "100%",
      }}
      className="min-h-screen flex items-center justify-center "
    >
      <Helmet>
        <title>Register - CPA NETWORK</title>
      </Helmet>
      <div className="bg-white/30 backdrop-blur-3xl p-5 m-5 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-xl font-marcellus md:text-2xl font-bold text-center text-red-700 mb-3 md:mb-6">
          Affiliate Register Now
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Personal Details */}
          <div>
            <h2 className="text-lg text-center md:text-left font-macondo font-semibold text-gray-700 mb-4">
              Input your Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block py-2 text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  className={`w-full px-4 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block py-2 text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  className={`w-full px-4 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="image"
                className="block py-2 text-sm font-medium text-gray-700"
              >
                Upload Your Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                {...register("image", {
                  required: "Image is required",
                  validate: {
                    size: (file) =>
                      (file && file[0]?.size <= 5 * 1024 * 1024) ||
                      "File size should be less than 5MB",
                  },
                })}
                className={`w-full px-4 py-2 border ${
                  errors.image ? "border-red-500" : ""
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.image && (
                <span className="text-red-500 text-sm">
                  {errors.image.message}
                </span>
              )}
            </div>

            {/* Skype ID */}
            <div>
              <label
                htmlFor="skype"
                className="block py-2 text-sm font-medium text-gray-700"
              >
                Skype ID
              </label>
              <input
                type="text"
                id="skype"
                {...register("skype", { required: "Skype ID is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.skype ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.skype && (
                <span className="text-red-500 text-sm">
                  {errors.skype.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block py-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block py-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block py-2 text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`w-full px-4 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="country"
                className="block py-2 text-sm font-medium text-gray-700"
              >
                Country
              </label>
              <Controller
                name="country"
                control={control} // Use control here
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={countryOptions}
                    placeholder="Country"
                    classNamePrefix="react-select"
                  />
                )}
              />
              {errors.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block py-2 text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="state"
                className="block py-2 text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                {...register("state", { required: "State is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="zip"
                className="block py-2 text-sm font-medium text-gray-700"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                {...register("zip", { required: "ZIP Code is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.zip ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
              />
              {errors.zip && (
                <span className="text-red-500 text-sm">
                  {errors.zip.message}
                </span>
              )}
            </div>
          </div>

          {/* Traffic Information */}
          <div>
            <label
              htmlFor="traffic"
              className="block py-2 text-sm font-medium text-gray-700"
            >
              Describe your traffic sources and promotion methods
            </label>
            <textarea
              id="traffic"
              {...register("traffic", { required: "This field is required" })}
              className={`w-full px-4 py-2 border ${
                errors.traffic ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-red-500`}
            ></textarea>
            {errors.traffic && (
              <span className="text-red-500 text-sm">
                {errors.traffic.message}
              </span>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { required: "You must accept the terms" })}
              className="h-4 w-4 text-blue-600 focus:ring-red-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block py-2 text-sm text-gray-800">
              I confirm that I have read, understand, and agree to the{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors.terms && (
            <span className="text-red-500 text-sm">{errors.terms.message}</span>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="relative  w-full px-4 py-2 rounded-md font-bold overflow-hidden border border-black
             bg-red-500 text-white shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 
             before:top-0 before:z-0 before:h-full before:w-0 before:bg-black before:transition-all duration-1000
             before:duration-1000 hover:text-white hover:before:left-0 hover:before:w-full"
          >
            <span className="relative z-10">Register</span>
          </button>
          <p className="text-center text-xs md:text-base">
            Already Have an Account?{" "} 
            <Link className="text-red-500 font-bold " to="/login">
              Login Now
            </Link>
          </p>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default Register;
