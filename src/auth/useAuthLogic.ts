import { useEffect, useState } from "react";
import {
  useGoogleLogin,
  googleLogout,
  TokenResponse,
} from "@react-oauth/google";
import axios from "axios";
import { User } from "./auth.types";

export function useAuthLogic() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const { name, email, picture } = res.data;
        const userData: User = {
          name,
          email,
          imageUrl: picture,
        };

        setUser(userData);
        localStorage.setItem("authUser", JSON.stringify(userData));
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => {
      console.error("Login Failed");
    },
  });

  const signOut = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return { user, signIn: login, signOut };
}
