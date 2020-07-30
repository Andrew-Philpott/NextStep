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
    console.log(e);
    console.log(localStorage);
    const user = localStorage.getItem("user");
    console.log(user);
    setLoggedIn(localStorage.getItem("user"));
    return loggedIn;
  }
  return loggedIn;
};
