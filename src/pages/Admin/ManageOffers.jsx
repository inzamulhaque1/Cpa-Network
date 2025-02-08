import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import the icons

const ManageOffers = () => {
  const axiosPublic = useAxiosPublic();
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosPublic.get("offers");
        setOffers(response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
        alert("Failed to load offers.");
      }
    };
    fetchOffers();
  }, [axiosPublic]);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this offer?"
      );
      if (confirmDelete) {
        await axiosPublic.delete(`offers/${id}`);
        setOffers(offers.filter((offer) => offer._id !== id)); // Remove deleted offer from state
        alert("Offer deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting offer:", error);
      alert("Failed to delete offer.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen p-8">
      <div className="">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800">Manage Offers</h2>
            <p className="text-gray-500 mt-2">
              Overview of all available offers and their details
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Offer Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Parent Network</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Base Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Base Payout</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Visibility</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">GeoLocation</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {offers.map((offer, index) => (
                  <tr
                    key={offer._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td> {/* Serial number */}
                    <td className="px-6 py-4 text-sm text-gray-800">
                      <img
                        src={offer.offerImage}
                        alt={offer.offerName}
                        className="h-16 w-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{offer.offerName}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          offer.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : offer.status === "Inactive"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{offer.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{offer.parentNetwork}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${offer.baseRevenue}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${offer.basePayout}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{offer.visibility}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{offer.geoLocation.join(", ")}</td>
                    <td className="px-6 py-4 text-sm space-x-3 flex">
                      <Link
                        to={`/dashboard/update-offer/${offer._id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                      >
                        <FaEdit className="text-white" />
                      </Link>
                      <button
                        onClick={() => handleDelete(offer._id)}
                        className="inline-block bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
                      >
                        <FaTrashAlt className="text-white" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOffers;
