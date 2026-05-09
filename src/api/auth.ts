import axios from "@/lib/axios";

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    // Correcting the payload to use Username/Password (Capitalized) which is standard for this API type.
    const { data } = await axios.post("/User/GenerateToken", {
      Email: credentials.email,
      Password: credentials.password
    });
    
    // Expanded token extraction to handle multiple common .NET API response formats
    const token = typeof data === "string" 
      ? data 
      : (data.token || data.Token || data.accessToken || data.jwtToken || data.data?.token || data.data?.Token);
    
    if (token && typeof token === "string" && !token.startsWith("{")) {
      console.log("Token acquired:", token); // Log for debugging
      localStorage.setItem("auth_token", token);
    }
    
    return { token };
  },
  logout: () => {
    localStorage.removeItem("auth_token");
  },
  getProfile: async () => {
    // There is no profile API mentioned, but we can return mock or just the email from localStorage
    return { email: "admin@graceaestheticsclinic" };
  },
};
