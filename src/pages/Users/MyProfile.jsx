/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import {
  FaUser,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaSkype,
  FaRoad,
  FaCheckCircle,
  FaTimesCircle,
  FaRegIdBadge,
} from "react-icons/fa";
import {
  MdPerson,
  MdEmail,
  MdLocationCity,
  MdLocalPostOffice,
} from "react-icons/md";

const MyProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [profileData, setProfileData] = useState(null);

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

  const statusClasses = {
    approved: "bg-green-700 text-white",
    pending: "bg-yellow-500 text-black",
    banned: "bg-red-500 text-white",
  };

  if (!profileData) {
    return (
      <div className="flex justify-center items-center h-screen font-roboto-mono text-[#143D3A] text-xl">
        Loading your Profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#143D3A]/5 to-[#143D3A]/10 py-4 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="md:flex flex-wrap">
          {/* Profile Image Section */}
          <div className="md:w-1/3 bg-gradient-to-b from-[#143D3A] to-[#0A1F1E] flex flex-col items-center justify-center p-6 md:p-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#143D3A] rounded-full blur-lg opacity-30"></div>
              <img
                src={profileData.image}
                alt="Profile"
                className="relative w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-white shadow-xl"
              />
            </div>
            <h2 className="mt-4 md:mt-6 text-2xl md:text-3xl font-playfair font-bold text-white">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-base md:text-lg text-[#D1D5DB] italic font-roboto-mono">
              ID:
              {profileData.publisherId}
            </p>
            <p className="text-base md:text-lg text-[#D1D5DB] italic font-roboto-mono">
              {profileData.role}
            </p>
            <p
              className={`mt-2 md:mt-3 px-3 md:px-5 py-1 border-2 border-white rounded-full text-sm font-semibold ${
                statusClasses[profileData.activeStatus] ||
                "bg-gray-400 text-black"
              }`}
            >
              {profileData.activeStatus}
            </p>
          </div>

          {/* Profile Details Section */}
          <div className="md:w-2/3 p-4 md:p-8">
            <h1 className="text-2xl md:text-4xl text-center font-garamond font-extrabold text-red-500 mb-6 md:mb-8">
              My Profile
            </h1>
            <div className="space-y-6 md:space-y-8">
              <ProfileSection
                title="Personal Information"
                icon={<FaUser />}
                fields={[
                  {
                    label: "Affiliate ID",
                    value: profileData.publisherId,
                    icon: <FaRegIdBadge />,
                  },
                  {
                    label: "First Name",
                    value: profileData.firstName,
                    icon: <MdPerson />,
                  },
                  {
                    label: "Last Name",
                    value: profileData.lastName,
                    icon: <MdPerson />,
                  },
                  {
                    label: "Email",
                    value: profileData.email,
                    icon: <MdEmail />,
                  },
                ]}
              />

              <ProfileSection
                title="Address Information"
                icon={<FaMapMarkerAlt />}
                fields={[
                  {
                    label: "Address",
                    value: profileData.address,
                    icon: <FaMapMarkerAlt />,
                  },
                  { label: "City", value: profileData.city, icon: <FaCity /> },
                  {
                    label: "State",
                    value: profileData.state,
                    icon: <MdLocationCity />,
                  },
                  {
                    label: "Country",
                    value: profileData.country,
                    icon: <FaGlobe />,
                  },
                  {
                    label: "Zip Code",
                    value: profileData.zip,
                    icon: <MdLocalPostOffice />,
                  },
                ]}
              />

              <ProfileSection
                title="Additional Information"
                icon={<FaSkype />}
                fields={[
                  {
                    label: "Skype",
                    value: profileData.skype,
                    icon: <FaSkype />,
                  },
                  {
                    label: "Traffic",
                    value: profileData.traffic,
                    icon: <FaRoad />,
                  },
                  {
                    label: "Terms Accepted",
                    value: profileData.terms ? "Yes" : "No",
                    icon: profileData.terms ? (
                      <FaCheckCircle className="text-green-600" />
                    ) : (
                      <FaTimesCircle className="text-red-600" />
                    ),
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfileSection = ({ title, icon, fields }) => (
  <div className="bg-[#143D3A]/5 p-4 md:p-6 rounded-lg hover:shadow-md transition-shadow duration-300">
    <h2 className="text-lg md:text-xl font-playfair font-bold text-green-700 mb-3 md:mb-4 flex items-center">
      {icon}
      <span className="ml-2">{title}</span>
    </h2>
    <div className="space-y-2 md:space-y-3">
      {fields.map(({ label, value, icon }, index) => (
        <p key={index} className="flex items-center text-gray-700">
          <span className="mr-2 text-[#143D3A]">{icon}</span>
          <span className="font-medium text-sm md:text-base">{label}:</span>
          <span className="ml-2 font-roboto-mono text-sm md:text-base">
            {value}
          </span>
        </p>
      ))}
    </div>
  </div>
);

export default MyProfile;
