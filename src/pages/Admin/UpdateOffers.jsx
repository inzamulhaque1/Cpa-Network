import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { countries } from "countries-list";

const UpdateOffers = () => {
  const { offerId } = useParams(); // Get offerId from URL
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { handleSubmit, control, register, setValue } = useForm();
  const [isLoading, setIsLoading] = useState(true);

  // Fetch offer data based on offerId
  useEffect(() => {
    const fetchOffer = async () => {
        try {
          const response = await axiosPublic.get(`/offers/${offerId}`);
          const offerData = response.data;
          
          // Convert geoLocation to the correct format if necessary
          if (offerData.geoLocation) {
            offerData.geoLocation = offerData.geoLocation.map((code) => ({
              label: countries[code].name,
              value: code,
            }));
          }
      
          // Set form values
          Object.keys(offerData).forEach((key) => {
            setValue(key, offerData[key]);
          });
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching offer:", error);
          alert("Failed to load offer.");
        }
      };
    fetchOffer();
  }, [offerId, axiosPublic, setValue]);

  const countryOptions = Object.entries(countries).map(([code, { name }]) => ({
    label: name,
    value: code,
  }));

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      geoLocation: data.geoLocation.map((item) => item.value),
    };
  
    console.log("Updated Data to send:", updatedData);
  
    try {
      const response = await axiosPublic.put(`/offers/${offerId}`, updatedData);
      console.log("Offer Updated:", response.data);
      alert("Offer updated successfully!");
      navigate("/dashboard/manage-offers");
    } catch (error) {
      console.error("Error updating offer:", error);
      alert("Failed to update offer.");
    }
  };
  
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <h2 className="text-2xl font-semibold mb-6">Update Offer</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Offer Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Offer Name</label>
          <input
            {...register("offerName")}
            placeholder="Offer Name"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Offer Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Status</label>
          <select {...register("status")} className="border p-2 w-full rounded">
            <option value="active">Active</option>
            <option value="pause">Pause</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <input
            {...register("category")}
            placeholder="Category"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Parent Network */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Parent Network</label>
          <input
            {...register("parentNetwork")}
            placeholder="Parent Network"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Offer URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Offer URL</label>
          <input
            {...register("offerUrl")}
            placeholder="Offer URL"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Preview URL */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Preview URL</label>
          <input
            {...register("previewUrl")}
            placeholder="Preview URL"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register("description")}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Base Revenue */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Base Revenue</label>
          <input
            type="number"
            {...register("baseRevenue")}
            placeholder="Base Revenue"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Base Payout */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Base Payout</label>
          <input
            type="number"
            {...register("basePayout")}
            placeholder="Base Payout"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Tracking Domain */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Tracking Domain</label>
          <input
            {...register("trackingDomain")}
            placeholder="Tracking Domain"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Caps */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Caps</label>
          <input
            {...register("caps")}
            placeholder="Caps"
            className="border p-2 w-full rounded"
          />
        </div>

        {/* Visibility */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Visibility</label>
          <select {...register("visibility")} className="border p-2 w-full rounded">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="require-approved">Require Approved</option>
          </select>
        </div>

        {/* GeoLocation */}
        <div className="mb-4">
          <label className="block text-sm font-medium">GeoLocation</label>
          <Controller
            control={control}
            name="geoLocation"
            render={({ field }) => (
              <MultiSelect
                options={countryOptions}
                value={field.value}
                onChange={field.onChange}
                labelledBy="Select Countries"
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Update Offer
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateOffers;
