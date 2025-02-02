import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaCheck, FaBan, FaClock } from "react-icons/fa"; // Import the icons you want to use
import Swal from 'sweetalert2';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  const formatDateTime = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB");
  };


  const handleRoleChange = (userId, newRole) => {
    axiosPublic
      .patch(`/users/role/${userId}`, { role: newRole })
      .then((response) => {
        if (response.data.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, role: newRole } : user
            )
          );
          Swal.fire({
            icon: 'success',
            title: 'Role updated successfully!',
            text: 'The role has been changed.',
          });
        } else {
          alert("Failed to update role.");
        }
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        alert("Failed to update role.");
      });
  };
  

  const handleActiveStatusChange = (userId, newStatus) => {
    axiosPublic
      .patch(`/users/activeStatus/${userId}`, { activeStatus: newStatus })
      .then((response) => {
        if (response.data.success) {
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === userId ? { ...user, activeStatus: newStatus } : user
            )
          );
          Swal.fire({
            icon: 'success',
            title: 'Status updated successfully!',
            text: 'The status has been changed.',
          });
        } else {
          alert("Failed to update status.");
        }
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        alert("Failed to update status.");
      });
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">
          Loading users...
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 w-full mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-[#143D3A] mb-4 md:mb-6">Manage Users</h1>
      {users.length === 0 ? (
        <p className="text-gray-600">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-20">
                  Id
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-24">
                  Country
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-24">
                  Photo
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-60">
                  Name
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-32">
                  Status
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-32">
                  Role
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-32">
                  Action
                </th>
                <th className="border p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-gray-600 w-40">
                  Created At
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    {user.publisherId}
                  </td>
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    {user.country}
                  </td>
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700 flex justify-center items-center">
                    <img
                      src={user.image}
                      className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full"
                      alt="User photo"
                    />
                  </td>
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    {user.email}
                  </td>
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    {user.role}
                  </td>

                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-md ${
                        user.activeStatus === "approved"
                          ? "bg-green-500 text-white"
                          : user.activeStatus === "pending"
                          ? "bg-yellow-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {user.activeStatus.charAt(0).toUpperCase() +
                        user.activeStatus.slice(1)}
                    </span>
                  </td>

                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700 capitalize">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="admin">Admin</option>
                      <option value="manager">Manager</option>
                      <option value="publisher">Publisher</option>
                    </select>
                  </td>
                  
                  <td className="border p-2 md:p-4 text-xs md:text-sm font-medium text-gray-700">
                    <div className="flex space-x-2 justify-center">
                      <button
                        onClick={() =>
                          handleActiveStatusChange(user._id, "approved")
                        }
                        className={`px-2 py-1 rounded-md ${
                          user.activeStatus === "approved"
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      >
                        <FaCheck size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() =>
                          handleActiveStatusChange(user._id, "pending")
                        }
                        className={`px-2 py-1 rounded-md ${
                          user.activeStatus === "pending"
                            ? "bg-yellow-500"
                            : "bg-gray-200"
                        }`}
                      >
                        <FaClock size={16} className="text-white" />
                      </button>
                      <button
                        onClick={() =>
                          handleActiveStatusChange(user._id, "banned")
                        }
                        className={`px-2 py-1 rounded-md ${
                          user.activeStatus === "banned"
                            ? "bg-red-500"
                            : "bg-gray-200"
                        }`}
                      >
                        <FaBan size={16} className="text-white" />
                      </button>
                    </div>
                  </td>
                  <td className="border p-2 md:p-4 text-xs md:text-sm text-gray-700">
                    {formatDateTime(user.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;