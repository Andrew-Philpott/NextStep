import { useState, useEffect } from "react";

export const useOnlineStatus = () => {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    window.addEventListener("online", handleEvent);
    window.addEventListener("offline", handleEvent);

    return () => {
      window.removeEventListener("online", handleEvent);
      window.removeEventListener("offline", handleEvent);
    };
  });

  function handleEvent() {
    setOnline(navigator.onLine);
    return { online };
  }
  return [online];
};
