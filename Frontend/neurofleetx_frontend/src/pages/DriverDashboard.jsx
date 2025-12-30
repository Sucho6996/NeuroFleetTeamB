import React from "react";
import {
  LayoutDashboard,
  MapPin,
  ClipboardCheck,
  BarChart3,
  Settings,
  Star,
} from "lucide-react";

import DashboardCard from "../components/DashboardCard";

/* ---------------- Dummy Stats ---------------- */

const driverStats = [
  { title: "Today's Trips", value: 8 },
  { title: "Today's Earnings", value: "₹1,850" },
  { title: "Distance Covered", value: "124 km" },
  { title: "Completed Trips", value: 540 },
  { title: "Acceptance Rate", value: "92%" },
];

/* ---------------- Component ---------------- */

const DriverDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* ---------- Sidebar ---------- */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">
        <h1 className="text-xl font-semibold mb-10 tracking-wide">
          NeuroFleetX
        </h1>

        <nav className="space-y-4 text-sm">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<MapPin size={18} />} label="Trips" />
          <SidebarItem icon={<ClipboardCheck size={18} />} label="History" />
          <SidebarItem icon={<BarChart3 size={18} />} label="Earnings" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">

        {/* Header */}
        <h2 className="text-2xl font-semibold">
          Driver Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {driverStats.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              value={item.value}
            />
          ))}

          {/* Rating Card */}
          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-2">Driver Rating</p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">4.6</span>
              <div className="flex text-yellow-400">
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} fill="currentColor" />
                <Star size={18} className="text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Extra Section */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
          <h3 className="text-sm text-gray-300 mb-2">
            Performance Summary
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Great job! Your acceptance rate is above average and your customer
            rating is excellent. Keep maintaining consistent performance to
            unlock weekly incentives.
          </p>
        </div>

      </main>
    </div>
  );
};

export default DriverDashboard;

/* ---------------- Sidebar Item ---------------- */

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition
        ${
          active
            ? "bg-white/10 text-white"
            : "text-gray-400 hover:bg-white/5 hover:text-white"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
};
