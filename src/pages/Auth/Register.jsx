import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  // List of countries for the dropdown
  const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", 
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", 
  "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", 
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", 
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", 
  "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", 
  "Cuba", "Cyprus", "Czechia (Czech Republic)", "Denmark", "Djibouti", "Dominica", 
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini",  "Swaziland", "Ethiopia", "Fiji", 
  "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
  "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", 
  "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", 
  "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", 
  "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", 
  "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", 
  "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", 
  "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", 
  "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
  "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", 
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", 
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", 
  "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", 
  "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", 
  "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", 
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", 
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];


  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
        <Helmet>
        <title>Register - CPA NETWORK</title>
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Details */}
          <div>
            <h2 className="text-lg font-semibold text-gray-600 mb-4">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600"
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
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                  className="block text-sm font-medium text-gray-600"
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
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
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
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              {...register("address", { required: "Address is required" })}
              className={`w-full px-4 py-2 border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                className="block text-sm font-medium text-gray-600"
              >
                Country
              </label>
              <select
                id="country"
                {...register("country", { required: "Country is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.country ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="" disabled>
                  Select your country
                </option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              {errors.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                {...register("city", { required: "City is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.city ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                className="block text-sm font-medium text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                {...register("state", { required: "State is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.state ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                className="block text-sm font-medium text-gray-600"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zip"
                {...register("zip", { required: "ZIP Code is required" })}
                className={`w-full px-4 py-2 border ${
                  errors.zip ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.zip && (
                <span className="text-red-500 text-sm">
                  {errors.zip.message}
                </span>
              )}
            </div>
          </div>

          {/* Skype ID */}
          <div>
            <label
              htmlFor="skype"
              className="block text-sm font-medium text-gray-600"
            >
              Skype ID
            </label>
            <input
              type="text"
              id="skype"
              {...register("skype", { required: "Skype ID is required" })}
              className={`w-full px-4 py-2 border ${
                errors.skype ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.skype && (
              <span className="text-red-500 text-sm">
                {errors.skype.message}
              </span>
            )}
          </div>

          {/* Traffic Information */}
          <div>
            <label
              htmlFor="traffic"
              className="block text-sm font-medium text-gray-600"
            >
              Describe your traffic sources and promotion methods
            </label>
            <textarea
              id="traffic"
              {...register("traffic", { required: "This field is required" })}
              className={`w-full px-4 py-2 border ${
                errors.traffic ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-800">
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
            className="w-full bg-blue-500 text-white py-2 rounded-md font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
      </div>
    </section>
  );
};

export default Register;
