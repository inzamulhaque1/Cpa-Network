import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Dashboard/Sidebar";
import TopBar from "../pages/Dashboard/TopBar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when a link is clicked (for mobile)
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div>
      {/* Pass the toggle function to TopBar */}
      <TopBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />


      <div style={{ height: "calc(100vh - 100px)" }} className="flex">
        {/* Sidebar */}
        <div
          className={`fixed md:relative z-50 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
        >
          <Sidebar closeSidebar={closeSidebar} />
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0  bg-opacity-50 z-40 md:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 overflow-y-auto h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;