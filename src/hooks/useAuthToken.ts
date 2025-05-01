import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const useAuthToken = () => {
  const [hasAuthToken, setHasAuthToken] = useState(false);

  useEffect(() => {
    const checkAuthToken = () => {
      setHasAuthToken(!!Cookies.get("authToken"));
    };

    const intervalId = setInterval(checkAuthToken, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return hasAuthToken;
};
