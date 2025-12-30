import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  BarChart3,
  Truck,
  Users,
  Settings,
} from "lucide-react";

import DashboardCard from "../components/DashboardCard";
import LineChart from "../components/LineChart";
import DonutChart from "../components/DonutChart";

/* ---------------- Dummy Data ---------------- */

const fleetManagerStats = [
  { title: "Active Vehicles", value: 42 },
  { title: "Total Fleet Size", value: 60 },
  { title: "Active Trips", value: 18 },
  { title: "Completed Trips", value: 312 },
  { title: "Active Drivers", value: 35 },
  { title: "Weekly Revenue", value: "₹1,25,000" },
];

const tripsWeeklyData = [
  { name: "Mon", trips: 20 },
  { name: "Tue", trips: 35 },
  { name: "Wed", trips: 28 },
  { name: "Thu", trips: 40 },
  { name: "Fri", trips: 30 },
  { name: "Sat", trips: 22 },
  { name: "Sun", trips: 18 },
];

const vehicleUsageData = [
  { name: "Active", value: 70 },
  { name: "Idle", value: 20 },
  { name: "Maintenance", value: 10 },
];

/* ---------------- Component ---------------- */

const FleetManagerDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* ---------- Sidebar ---------- */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">
        <h1 className="text-xl font-semibold mb-10 tracking-wide">
          NeuroFleetX
        </h1>

        <nav className="space-y-4 text-sm">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" path = "/fleetmanager/Dashboard" />
          <SidebarItem icon={<BarChart3 size={18} />} label="Analytics" path = "/fleetmanager/analytics" />
          <SidebarItem icon={<Truck size={18} />} label="Inventory" path = "/fleetmanager/inventory" />
          <SidebarItem icon={<Users size={18} />} label="Drivers" path = "/fleetmanager/drivers" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" path = "/fleetmanager/settings" />
        </nav>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">

        {/* Header */}
        <h2 className="text-2xl font-semibold">
          Fleet Manager Dashboard
        </h2>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fleetManagerStats.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Line Chart */}
          <div className="lg:col-span-2 bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <h3 className="text-sm mb-3 text-gray-300">
              Weekly Trips Overview
            </h3>
            <LineChart data={tripsWeeklyData} />
          </div>

          {/* Donut Chart */}
          <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10">
            <h3 className="text-sm mb-3 text-gray-300">
              Vehicle Usage Status
            </h3>
            <DonutChart data={vehicleUsageData} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default FleetManagerDashboard;

/* ---------------- Sidebar Item ---------------- */

const SidebarItem = ({ icon, label, path }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname === path;

  return (
    <div
      onClick={() => navigate(path)}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${active
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"}
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};
