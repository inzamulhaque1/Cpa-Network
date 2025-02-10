import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const AllOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("offers")
      .then((response) => {
        setOffers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching offers:", error);
        setLoading(false);
      });
  }, [axiosPublic]);

  console.log(offers);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Offers</h1>
      {loading ? (
        <p>Loading offers...</p>
      ) : offers.length === 0 ? (
        <p>No offers available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-2xl">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Thumbnail</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Payout</th>
                <th className="text-left p-4">GEO</th>
                <th className="text-left p-4">Details</th>
              </tr>
            </thead>
            <tbody>
            {offers.map((offer) => (
  <tr key={offer._id} className="border-t">
    <td className="p-4">{offer.offerId}</td>
    <td className="p-4">
      <img
        src={offer.offerImage}
        alt={offer.offerName || "Offer"}
        className="w-16 h-16 object-cover rounded-md"
      />
    </td>
    <td className="p-4">{offer.offerName || "Unnamed Offer"}</td>
    <td className="p-4">{offer.category || "N/A"}</td>
    <td className="p-4 whitespace-nowrap">${offer.basePayout || "N/A"}</td>
    <td className="p-4">
      {Array.isArray(offer.geoLocation) && offer.geoLocation.length > 0
        ? offer.geoLocation.join(" - ")
        : "N/A"}
    </td>
    <td className="p-4">
      <Link
        to={`/dashboard/offers/${offer._id}`}
        className="bg-red-500 px-3 py-1 rounded-2xl text-white font-semibold"
      >
        Details
      </Link>
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

export default AllOffers;
