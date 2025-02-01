import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa"; // Import both hamburger and cross icons
// eslint-disable-next-line react/prop-types
const TopBar = ({ toggleSidebar, isSidebarOpen }) => {
  const { user } = useAuth();
  const [greeting, setGreeting] = useState("");
  const [currentTime, setCurrentTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
    ampm: "",
  });

  // Function to update the greeting based on the time of day
  useEffect(() => {
    const hour = new Date().getHours();
    let message;
  
    if (hour >= 0 && hour < 5) {
      message = "Good Late Night";
    } else if (hour >= 5 && hour < 8) {
      message = "Good Early Morning";
    } else if (hour >= 8 && hour < 12) {
      message = "Good Morning";
    } else if (hour >= 12 && hour < 15) {
      message = "Good Noon";
    } else if (hour >= 15 && hour < 17) {
      message = "Good Afternoon";
    } else if (hour >= 17 && hour < 20) {
      message = "Good Evening";
    } else {
      message = "Good Night";
    }
  
    setGreeting(message);
  }, []);
  

  // Function to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      setCurrentTime({ hours, minutes, seconds, ampm });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-[#143D3A] shadow-lg py-4">
      <div className="w-11/12 mx-auto h-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-4">
        {/* Logo Section */}
        <div className="flex items-center">
          {/* Menu Icon for Mobile */}
          <button
            onClick={toggleSidebar} // Toggle sidebar on click
            className="md:hidden text-white mr-4 focus:outline-none"
          >
            {isSidebarOpen ? (
              <FaTimes className="text-2xl" /> // Cross icon when sidebar is open
            ) : (
              <FaBars className="text-2xl" /> // Hamburger icon when sidebar is closed
            )}
          </button>
          <Link to="/">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-macondo hover:text-[#FFD700] transition duration-300">
                TheWarriorMedia
              </h1>
            </div>
          </Link>
        </div>

        {/* Greeting Section */}
        <div className="flex-col items-center text-center hidden md:flex">
          <p className="text-xl sm:text-2xl font-semibold text-white">
            Hi {user?.displayName || "Guest User"},{" "}
            <span className="text-[#FFD700]">{greeting}!</span>
          </p>
          <p className="text-sm sm:text-lg font-kumar-one font-bold text-white mt-1">
            {currentTime.hours} : {currentTime.minutes} :{" "}
            <motion.span
              key={currentTime.seconds}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              {currentTime.seconds}
            </motion.span>{" "}
            {currentTime.ampm}
          </p>
        </div>

        {/* User Info Section */}
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white hover:border-[#FFD700] transition duration-300">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* User Name and Email */}
          <div className="text-white">
            <p className="text-base sm:text-lg font-medium hover:text-[#FFD700] transition duration-300">
              {user?.displayName || "Guest User"}
            </p>
            {user?.email && (
              <p className="text-xs sm:text-sm font-light hover:text-[#FFD700] transition duration-300">
                {user.email}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
