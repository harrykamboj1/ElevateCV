import { apiUrl } from "@/lib/constants";
import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  email: string;
  name: string;
  userId: string;
}

interface AuthState {
  isSignedIn: boolean;
  user: User | null;
}
const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isSignedIn: false,
    user: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const checkSession = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthState({ isSignedIn: false, user: null });
        return;
      }
      const response = await axios.get(`${apiUrl}/auth/session`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAuthState({ isSignedIn: true, user: response.data });
    } catch (e) {
      console.error("Session check failed", e);
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);
  console.log(authState);
  return { ...authState, isLoading };
};

export default useAuth;
