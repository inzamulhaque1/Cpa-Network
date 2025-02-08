import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom"; // Import Link for navigation

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

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <h2 className="text-2xl font-semibold mb-6">Manage Offers</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Offer Name</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Parent Network</th>
            <th className="py-2 px-4 border-b">Base Revenue</th>
            <th className="py-2 px-4 border-b">Base Payout</th>
            <th className="py-2 px-4 border-b">Visibility</th>
            <th className="py-2 px-4 border-b">GeoLocation</th>
            <th className="py-2 px-4 border-b">Actions</th> {/* Add Actions column */}
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{offer.offerName}</td>
              <td className="py-2 px-4 border-b">{offer.status}</td>
              <td className="py-2 px-4 border-b">{offer.category}</td>
              <td className="py-2 px-4 border-b">{offer.parentNetwork}</td>
              <td className="py-2 px-4 border-b">{offer.baseRevenue}</td>
              <td className="py-2 px-4 border-b">{offer.basePayout}</td>
              <td className="py-2 px-4 border-b">{offer.visibility}</td>
              <td className="py-2 px-4 border-b">{offer.geoLocation.join(", ")}</td>
              <td className="py-2 px-4 border-b">
                <Link
                  to={`/dashboard/update-offer/${offer._id}`} // Pass offer ID as a parameter
                //   to={`/dashboard/update-offer/`} // Pass offer ID as a parameter
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageOffers;