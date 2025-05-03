import { useEffect, useState } from "react";

export function useAuthToken() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken"),
  );

  useEffect(() => {
    checkUrlForToken();
    window.addEventListener("popstate", checkUrlForToken);

    return () => {
      window.removeEventListener("popstate", checkUrlForToken);
    };
  }, []);

  function checkUrlForToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get("token");

    if (urlToken) {
      localStorage.setItem("authToken", urlToken);
      setIsAuthenticated(true);

      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }

  return isAuthenticated;
}
