import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={<Register loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/my-profile"
          element={<Profile loading={loading} setLoading={setLoading} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
