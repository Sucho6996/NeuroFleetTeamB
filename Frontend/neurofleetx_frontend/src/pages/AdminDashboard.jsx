import DashboardCard from "../components/DashboardCard";
import LineChart from "../components/LineChart";
import DonutChart from "../components/DonutChart";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "1,245", color: "text-indigo-400" },
    { title: "Fleet Partners", value: "87", color: "text-green-400" },
    { title: "Total Bookings", value: "5,421", color: "text-cyan-400" },
    { title: "Active Users", value: "312", color: "text-yellow-400" },
    { title: "Completed Trips", value: "4,980", color: "text-purple-400" },
    { title: "Total Revenue", value: "₹12.4L", color: "text-pink-400" }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#070B34] via-[#120C3A] to-[#020617]">

      {/* Sidebar */}
      <aside className="w-64 p-6 text-white bg-white/5 backdrop-blur-xl border-r border-white/10">
        <h2 className="text-2xl font-bold text-indigo-400 mb-8">
          NeuroFleetX
        </h2>

        <nav className="space-y-4 text-sm">
          {["Dashboard", "Users", "Fleets", "Trips", "Analytics", "Settings"].map(item => (
            <div key={item} className="hover:text-indigo-400 cursor-pointer">
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 text-white">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <input
            placeholder="Search..."
            className="bg-white/10 rounded-lg px-4 py-2 outline-none"
          />
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((s) => (
            <DashboardCard key={s.title} {...s} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white/8 p-6 rounded-2xl backdrop-blur-xl">
            <h3 className="mb-4 text-lg">Trips & Revenue</h3>
            <LineChart />
          </div>

          <div className="bg-white/8 p-6 rounded-2xl backdrop-blur-xl">
            <h3 className="mb-4 text-lg">Booking Distribution</h3>
            <DonutChart />
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
