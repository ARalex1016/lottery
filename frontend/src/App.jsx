import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Page
import RandomNumber from "./Pages/RandomNumber/RandomNumber";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RandomNumber />} />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
