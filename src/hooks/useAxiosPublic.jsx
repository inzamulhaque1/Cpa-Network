import axios from "axios";

const localBaseURL = "http://localhost:5000";
const vercelBaseURL = "https://server-tan-eight.vercel.app";

const axiosPublic = axios.create({
  baseURL: localBaseURL,
});

const useAxiosPublic = () => {
  const fetchWithFallback = async (config) => {
    try {
      const response = await axiosPublic(config);
      return response;
    } catch (error) {
      console.warn("Localhost request failed. Falling back to Vercel...", error.message);
      axiosPublic.defaults.baseURL = vercelBaseURL;
      return await axiosPublic(config);
    }
  };

  return {
    get: (url, config) => fetchWithFallback({ method: "get", url, ...config }),
    post: (url, data, config) => fetchWithFallback({ method: "post", url, data, ...config }),
    put: (url, data, config) => fetchWithFallback({ method: "put", url, data, ...config }),
    patch: (url, data, config) => fetchWithFallback({ method: "patch", url, data, ...config }),
    delete: (url, config) => fetchWithFallback({ method: "delete", url, ...config }),
  };
};

export default useAxiosPublic;



// import axios from "axios";

// const axiosPublic = axios.create({
//     baseURL: "https://assignment12-server-phi.vercel.app"
// })

// const useAxiosPublic = () => {
//     return axiosPublic
// };

// export default useAxiosPublic;