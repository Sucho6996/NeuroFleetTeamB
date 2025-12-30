const DashboardCard = ({ title, value, color }) => {
  return (
    <div className="bg-white/8 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:scale-[1.02] transition">
      <p className="text-sm text-gray-300">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
};

export default DashboardCard;
