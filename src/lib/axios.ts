import axios from "axios";
import { toast } from "sonner";

const axiosInstance = axios.create({
  baseURL: "https://api.graceaestheticsclinic.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for Auth
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token && !config.url?.includes("GetAllPageContentForCustomers")) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Request to ${config.url} with Auth:`, config.headers.Authorization);
    }
    
    // For Form-Data requests (like AddOrUpdatePageContent)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for Errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { response } = error;

    if (response) {
      if (response.status === 401) {
        localStorage.removeItem("auth_token");
        // Only redirect if we're in the admin section
        if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
      
      const message = response.data?.message || "An unexpected error occurred";
      const isListOperation = error.config?.url?.includes("GetAllPageContent");
      const isHandledError = response.status === 400 || response.status === 405;

      // We don't toast on 401 as it's handled by redirection usually,
      // and we suppress toasts for 400/405 during list operations (handled by fallbacks)
      if (response.status !== 401 && !(isListOperation && isHandledError)) {
        toast.error(message);
      }
    } else {
      toast.error("Network Error: Could not connect to the server");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
