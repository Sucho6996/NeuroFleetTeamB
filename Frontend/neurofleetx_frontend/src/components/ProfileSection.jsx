const ProfileSection = ({ title, children }) => {
  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl p-5 space-y-3 border border-white/10">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-gray-300">
          {title}
        </h3>
        <button className="text-xs text-blue-400 hover:underline">
          Edit
        </button>
      </div>
      <div className="text-sm text-gray-200">
        {children}
      </div>
    </div>
  );
};

export default ProfileSection;
