import { useState } from "react";

import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import DriverDashboard from "./pages/DriverDashboard.jsx";
import CustomerDashboard from "./pages/CustomerDashboard.jsx";
import DriverProfile from "./pages/DriverProfile.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import CustomerProfile from "./pages/CustomerProfile.jsx";
import FleetInventory from "./pages/FleetInventory.jsx";
import FleetManagerDashboard from "./pages/FleetManagerDashboard.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/dashboard" element={<MainLayout><AdminDashboard /></MainLayout>} />
          <Route
            path="/fleetmanager/dashboard"
            element={<MainLayout><FleetManagerDashboard /></MainLayout>}
          />
          <Route
            path="/fleetmanager/inventory"
            element={<MainLayout><FleetInventory /></MainLayout>}
          />
          <Route
            path="/driver/dashboard"
            element={<MainLayout><DriverDashboard /></MainLayout>}
          />
          <Route
            path="/customer/dashboard"
            element={<MainLayout><CustomerDashboard /></MainLayout>}
          />
          <Route
            path="/driver/profile"
            element={<MainLayout><DriverProfile /></MainLayout>}
          />
          <Route
            path="/customer/profile" 
            element={<MainLayout> <CustomerProfile /> </MainLayout>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
