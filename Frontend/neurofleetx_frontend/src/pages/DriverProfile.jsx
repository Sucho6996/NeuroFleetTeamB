import { Star } from "lucide-react";
import ProfileSection from "../components/ProfileSection";
import UserLocationMap from "../components/UserLocationMap";


const DriverProfile = () => {
  return (
    <div className="p-6 space-y-6 text-black">
      {/* Header Card */}
      <div className="bg-black/900 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex justify-between">
        <div className="flex items-center gap-4">
          <img
            src="https://m.media-amazon.com/images/I/41ONa5HOwfL._AC_UF1000,1000_QL80_.jpg"
            className="w-16 h-16 rounded-full border border-white/20"
          />

          <div>
            <h2 className="text-xl text-white font-semibold">Rahul Sharma</h2>
            <p className="text-sm text-gray-400">Driver • Active</p>

            <div className="flex items-center gap-1 mt-1 text-yellow-400">
              <Star size={16} fill="currentColor" />
              <span className="text-sm text-white">4.6 Rating</span>
            </div>
          </div>
        </div>

        <button className="h-fit px-4 py-2 text-sm rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30">
          Edit
        </button>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <ProfileCard title="Personal Info">
          <Row label="Email" value="rahul@neurofleetx.com" />
          <Row label="Phone" value="+91 98765 43210" />
          <Row label="City" value="Bengaluru" />
        </ProfileCard>

        <ProfileCard title="Driver Details">
          <Row label="License No." value="DL-29-2023-998877" />
          <Row label="Experience" value="4 Years" />
          <Row label="Acceptance Rate" value="92%" />
        </ProfileCard>

        <ProfileCard title="Vehicle Info">
          <Row label="Vehicle No." value="KA-05-MN-4455" />
          <Row label="Type" value="Mini Truck" />
          <Row label="Fuel" value="Diesel" />
        </ProfileCard>

        <ProfileCard title="Performance">
          <Row label="Completed Trips" value="1,248" />
          <Row label="Distance" value="18,430 km" />
          <Row label="Today Earnings" value="₹1,850" />
        </ProfileCard>

        <ProfileSection title="Saved Location">
          <p className="text-sm text-gray-400 mb-3">
            This is your primary service & pickup area.
          </p>
          <UserLocationMap />
        </ProfileSection>
      </div>
    </div>
  );
};

const ProfileCard = ({ title, children }) => (
  <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
    <h3 className="text-sm text-gray-700 mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="flex justify-between text-sm border-b border-white/10 pb-2">
    <span className="text-gray-400">{label}</span>
    <span className="text-white">{value}</span>
  </div>
);

export default DriverProfile;
