import { useState, useEffect } from "react";

export const useLoggedInStatus = () => {
  const [loggedIn, setLoggedIn] = useState(null);
  useEffect(() => {
    window.addEventListener("storage", handleEvent);

    return () => {
      window.removeEventListener("storage", handleEvent);
    };
  });

  function handleEvent(e) {
    const user = localStorage.getItem("user");
    setLoggedIn(localStorage.getItem("user"));
    return loggedIn;
  }
  return loggedIn;
};
