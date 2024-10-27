import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Page
import RandomNumber from "./Pages/RandomNumber/RandomNumber";

function App() {
  const [toastPosition, setToastPosition] = useState("top-right");

  useEffect(() => {
    // Function to set toast position based on screen width
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setToastPosition("top-center");
      } else {
        setToastPosition("top-right");
      }
    };

    // Call the function on mount
    handleResize();

    // Attach event listener to window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<RandomNumber />} />
      </Routes>

      <Toaster limit={3} position={toastPosition} reverseOrder={false} />
    </>
  );
}

export default App;
