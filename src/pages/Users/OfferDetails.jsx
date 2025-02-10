import { IoArrowBackOutline } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [clicks, setClicks] = useState(null); // For storing click data

  useEffect(() => {
    axiosPublic.get(`offers/${id}`).then((response) => {
      setOffer(response.data);
      setLoading(false);
    });
  }, [id, axiosPublic]);

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/email/${user.email}`)
        .then((response) => {
          setProfileData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user, axiosPublic]);

  useEffect(() => {
    if (profileData?.publisherId && offer?.offerId && offer.trackingDomain) {
      // Create the tracking URL
      const trackingUrl = `${offer.trackingDomain}/track?publisherId=${profileData.publisherId}&offerId=${offer.offerId}`;
      
      // Fetch the clicks data from the backend
      axiosPublic
        .get(`/tracking/clicks?url=${encodeURIComponent(trackingUrl)}`)
        .then((response) => {
          setClicks(response.data.clicks); // Assuming response contains clicks data
        })
        .catch((error) => {
          console.error("Error fetching clicks data:", error);
        });
    }
  }, [profileData, offer, axiosPublic]); // Removed clicks from dependency array
  
  
  console.log("Tracking URL:", `${offer?.trackingDomain}/track?publisherId=${profileData?.publisherId}&offerId=${offer?.offerId}`);
console.log("Clicks:", clicks);


  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg mt-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <IoArrowBackOutline className="text-2xl mr-2" />
        <span className="text-lg">Back</span>
      </button>

      {loading ? (
        <p className="text-center text-gray-600">Loading offer details...</p>
      ) : offer ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Section */}
            {offer.offerImage && (
              <div className="flex justify-center md:col-span-1">
                <img
                  src={offer.offerImage}
                  alt={offer.offerName}
                  className="w-full max-w-sm h-auto object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* General Information Section */}
            <div className="md:col-span-2 space-y-4">
              <h1 className="text-3xl font-bold text-gray-800">
                <span className="text-red-500"># {offer.offerId}</span> {offer.offerName}
              </h1>
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg shadow">
                <p><strong>Category:</strong> {offer.category || "N/A"}</p>
                <p><strong>Status:</strong> {offer.status || "N/A"}</p>
                <p><strong>Parent Network:</strong> {offer.parentNetwork || "N/A"}</p>
                <p><strong>Visibility:</strong> {offer.visibility || "N/A"}</p>
                <p><strong>Payout:</strong> ${offer.basePayout || "N/A"}</p>
                <p><strong>GEO:</strong> {offer.geoLocation?.join(", ") || "N/A"}</p>
                <p><strong>Tracking Domain:</strong> {offer.trackingDomain || "N/A"}</p>
                <p><strong>Caps:</strong> {offer.caps || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
            <p className="whitespace-pre-wrap">{offer.description || "No description available."}</p>
          </div>

          {/* Links Section */}
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Links</h2>
            <p>
              <strong>Offer URL:</strong>{" "}
              {offer.offerUrl ? (
                <a
                  href={offer.offerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {offer.offerUrl}
                </a>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <strong>Tracking URL:</strong>{" "}
              {offer.trackingDomain && profileData?.publisherId && offer.offerId ? (
                <a
                  href={`${offer.trackingDomain}/track?publisherId=${profileData.publisherId}&offerId=${offer.offerId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  {`${offer.trackingDomain}/track?publisherId=${profileData.publisherId}&offerId=${offer.offerId}`}
                </a>
              ) : (
                "N/A"
              )}
            </p>
          </div>

          {/* Clicks Data Section */}
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Clicks</h2>
            <p>{clicks !== null ? `${clicks} Clicks` : "Loading clicks data..."}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Offer not found.</p>
      )}
    </div>
  );
};

export default OfferDetails;
