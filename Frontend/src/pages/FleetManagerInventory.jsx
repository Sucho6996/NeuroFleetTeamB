import { useEffect, useState } from "react";
import { Truck, PlusCircle, AlertTriangle, Search } from "lucide-react";
import DashboardCard from "../components/DashboardCard";
import { getAllVehicles } from "../services/fleetManagerApis";

const FleetManagerInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllVehicles();
        setVehicles(Array.isArray(data) ? data : []);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filtered = vehicles.filter((v) => {
    const q = search.toLowerCase();
    return (
      !q ||
      v.regNo?.toLowerCase().includes(q) ||
      v.model?.toLowerCase().includes(q) ||
      v.make?.toLowerCase().includes(q)
    );
  });

  const total = vehicles.length;
  const active = vehicles.filter(
    (v) =>
      v.status === "ACTIVE" ||
      v.status === "In Use" ||
      v.status === "IN_USE"
  ).length;
  const maintenance = vehicles.filter(
    (v) =>
      v.status === "MAINTENANCE" ||
      v.status === "Maintenance"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
          <p className="mt-6 text-xl text-slate-600">Loading fleet inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
              <Truck className="text-green-600" size={28} />
              Fleet Inventory
            </h1>
            <p className="text-slate-600 mt-1">
              Manage all vehicles in your fleet
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold shadow-sm"
          >
            <PlusCircle size={18} />
            Add Vehicle
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <DashboardCard
            title="Total Vehicles"
            value={total}
            icon={Truck}
          />
          <DashboardCard
            title="Active"
            value={active}
            icon={Truck}
          />
          <DashboardCard
            title="In Maintenance"
            value={maintenance}
            icon={AlertTriangle}
          />
        </div>

        {/* Search & Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Vehicles
            </h2>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by reg no / model"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-100 rounded-xl">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Reg No</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Model</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Type</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Fuel</th>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      No vehicles found. Try a different search.
                    </td>
                  </tr>
                )}
                {filtered.map((v) => (
                  <tr
                    key={v.id || v.regNo}
                    className="border-t border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">{v.regNo || "-"}</td>
                    <td className="px-4 py-3">
                      {v.model || v.name || "-"}
                    </td>
                    <td className="px-4 py-3">{v.type || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
                      >
                        {v.status || "UNKNOWN"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {v.fuelType || v.fuel || "-"}
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-green-700 hover:text-green-900 font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FleetManagerInventory;

