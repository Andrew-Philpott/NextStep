import { useState, useEffect } from "react";

const useOnlineStatus = () => {
  const [online, setOnline] = useState(true);

  const handleEvent = () => {
    setOnline(window.navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", handleEvent);
    window.addEventListener("offline", handleEvent);

    return () => {
      window.removeEventListener("online", handleEvent);
      window.removeEventListener("offline", handleEvent);
    };
  });

  return online;
};
export default useOnlineStatus;
