
import { useForm, Controller } from "react-hook-form";
import { MultiSelect } from "react-multi-select-component";
import { countries } from "countries-list";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddOffers = () => {
  const axiosPublic = useAxiosPublic();
  const { handleSubmit, control, register , setValue} = useForm({
    defaultValues: {
      offerName: "",
      status: "active",
      category: "",
      parentNetwork: "",
      offerUrl: "",
      previewUrl: "",
      description: "",
      baseRevenue: 0,
      basePayout: 0,
      trackingDomain: "https://xgenhub.com/",
      caps: "",
      visibility: "public",
      geoLocation: []
    },
  });

  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`, formData);
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  const countryOptions = Object.entries(countries).map(([code, { name }]) => ({
    label: name,
    value: code,
  }));

  const onSubmit = async (data) => {
    const offerData = {
      ...data,
      geoLocation: data.geoLocation.map((loc) => loc.value),

    };

    console.log(offerData);

    try {
      const response = await axiosPublic.post("offers", offerData);
      console.log("Offer Created:", response.data);
      alert("Offer added successfully!");
    } catch (error) {
      console.error("Error adding offer:", error);
      alert("Failed to add offer.");
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        setValue("offerImage", imageUrl);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Basic Information Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Offer Name</label>
              <input {...register("offerName")} placeholder="Offer Name" className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Offer Status</label>
              <select {...register("status")} className="border p-2 w-full rounded">
                <option value="active">Active</option>
                <option value="pause">Pause</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Offer Image</label>
              <input type="file" onChange={handleImageChange} className="border p-2 w-full rounded" />
              <input type="hidden" {...register("offerImage")} />
            </div>
          </div>
        </div>

        {/* Offer Details Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Offer Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Category</label>
              <input {...register("category")} placeholder="Category" className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Parent Network</label>
              <input {...register("parentNetwork")} placeholder="Parent Network" className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Offer URL</label>
              <input {...register("offerUrl")} placeholder="Offer URL" className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Preview URL</label>
              <input {...register("previewUrl")} placeholder="Preview URL" className="border p-2 w-full rounded" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Description</label>
              <textarea {...register("description")} placeholder="Description" className="border p-2 w-full rounded" />
            </div>
          </div>
        </div>

        {/* Financial & Tracking Info Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Financial & Tracking Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Base Revenue</label>
              <input type="number" {...register("baseRevenue")} className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Base Payout</label>
              <input type="number" {...register("basePayout")} className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Tracking Domain</label>
              <input {...register("trackingDomain")} placeholder="Tracking Domain"  className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Caps</label>
              <input {...register("caps")} placeholder="Caps" className="border p-2 w-full rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Visibility</label>
              <select {...register("visibility")} className="border p-2 w-full rounded">
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="require-approved">Require Approved</option>
              </select>
            </div>
          </div>
        </div>

        {/* GeoLocation Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">GeoLocation</h2>
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
          <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddOffers;