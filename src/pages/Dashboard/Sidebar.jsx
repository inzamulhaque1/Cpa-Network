/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { FaUser } from "react-icons/fa";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Sidebar = ({ closeSidebar }) => { // Accept closeSidebar as a prop
  const {user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic()

  // console.log(userRole);

  useEffect(()=> {
    if (user?.email) {
        axiosPublic
          .get(`/users/role/${user.email}`)
          .then((response) => setUserRole(response.data?.role || "user"))
          .catch((error) => console.error("Error fetching role:", error));
      }

  }, [axiosPublic, user])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const signOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="h-full">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white transition-all h-full duration-300 flex flex-col justify-between`}
      >
        {/* Top Section */}
        <div>
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="bg-gray-700 w-full hidden md:block text-4xl text-white p-2 focus:outline-none"
          >
            {isSidebarOpen ? (
              <MdOutlineDashboardCustomize />
            ) : (
              <LuLayoutDashboard />
            )}
          </button>

          {/* Sidebar Content */}
          <div className="mt-4 p-4">
            <ul>
              {/* Admin Links */}
              {userRole === "admin" && (
                <>
                  <NavLink
                    to={"manage-users"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">Manage Users</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>
                  <NavLink
                    to={"add-offers"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">Add Offers </span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>
                  <NavLink
                    to={"manage-offers"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">Manage Offers </span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>
                  <NavLink
                    to={"my-profile"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">My Profile</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>
                  <NavLink
                    to={"offers"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">All Offers</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>

                  {/* Repeat for other admin links */}
                </>
              )}

              {/* Agent Links */}

              {userRole === "manager" && (
                <>
                  <NavLink
                    to={"agent-profile"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">Agent Profile</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>

                  {/* Repeat for other agent links */}
                </>
              )}

              {/* User Links */}
              {userRole === "publisher" && (
                <>
                  <NavLink
                    to={"offers"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">All Offers</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>
                  <NavLink
                    to={"my-profile"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">My Profile</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>
                  <NavLink
                    to={"my-payment"}
                    onClick={closeSidebar} // Use closeSidebar prop here
                    className={({ isActive }) =>
                      `mb-2 flex items-center hover:bg-blue-600 p-2 rounded ${
                        isActive
                          ? "text-white font-bold border-white border-2 bg-red-500"
                          : "text-white"
                      }`
                    }
                  >
                    {isSidebarOpen ? (
                      <span className="ml-2">My Payment</span>
                    ) : (
                      <FaUser className="text-lg" />
                    )}
                  </NavLink>

                  {/* Repeat for other user links */}
                </>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4">
          {isSidebarOpen ? (
            <button
              onClick={signOut}
              className="bg-red-500 hover:bg-red-600 w-full p-2 rounded text-center"
            >
              Logout
            </button>
          ) : (
            <div className="mt-4">
              <IoLogOut onClick={signOut} className="text-4xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;