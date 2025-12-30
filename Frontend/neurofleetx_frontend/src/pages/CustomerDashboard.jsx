import React from "react";
import {
  LayoutDashboard,
  CalendarClock,
  Route,
  Heart,
  Wallet,
  Settings,
} from "lucide-react";

import DashboardCard from "../components/DashboardCard";

/* ---------------- Dummy Stats ---------------- */

const customerStats = [
  { title: "Active Bookings", value: 2 },
  { title: "Total Trips", value: 187 },
  { title: "Total Spent", value: "₹42,500" },
  { title: "Amount Saved", value: "₹6,800" },
  { title: "Upcoming Trips", value: 3 },
  { title: "Favorite Routes", value: 5 },
];

/* ---------------- Component ---------------- */

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* ---------- Sidebar ---------- */}
      <aside className="w-64 bg-black/40 backdrop-blur-xl border-r border-white/10 p-6 hidden md:flex flex-col">
        <h1 className="text-xl font-semibold mb-10 tracking-wide">
          NeuroFleetX
        </h1>

        <nav className="space-y-4 text-sm">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <SidebarItem icon={<CalendarClock size={18} />} label="My Bookings" />
          <SidebarItem icon={<Route size={18} />} label="Trips History" />
          <SidebarItem icon={<Wallet size={18} />} label="Payments" />
          <SidebarItem icon={<Heart size={18} />} label="Favorite Routes" />
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
        </nav>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className="flex-1 p-6 space-y-6 overflow-y-auto">

        {/* Header */}
        <h2 className="text-2xl font-semibold">
          Customer Dashboard
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {customerStats.map((item, index) => (
            <DashboardCard
              key={index}
              title={item.title}
              value={item.value}
            />
          ))}
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
            <h3 className="text-sm mb-2 text-gray-300">
              Savings Summary
            </h3>
            <p className="text-gray-400 text-sm">
              You’ve saved <span className="text-green-400 font-medium">₹6,800</span> using
              offers and discounts. Keep booking to unlock even better deals!
            </p>
          </div>

          <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-5">
            <h3 className="text-sm mb-2 text-gray-300">
              Upcoming Trips
            </h3>
            <ul className="text-gray-400 text-sm space-y-2">
              <li>• Airport Drop – Tomorrow, 9:00 AM</li>
              <li>• Office Commute – Friday, 10:30 AM</li>
              <li>• Weekend Trip – Sunday, 7:00 AM</li>
            </ul>
          </div>

        </div>

      </main>
    </div>
  );
};

export default CustomerDashboard;

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
