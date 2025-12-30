import ProfileSection from "../components/ProfileSection";
import UserLocationMap from "../components/UserLocationMap";

const CustomerProfile = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-5 rounded-xl border border-white/10">
        <img
          src="https://m.media-amazon.com/images/I/41ONa5HOwfL._AC_UF1000,1000_QL80_.jpg"
          alt="Customer"
          className="w-16 h-16 rounded-full border border-white/20"
        />
        <div>
          <h2 className="text-xl font-semibold text-white">
            Rohan Sharma
          </h2>
          <p className="text-sm text-gray-400">
            Customer • NeuroFleetX
          </p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <ProfileSection title="Personal Information">
          <p><span className="text-gray-400">Full Name:</span> Rohan Sharma</p>
          <p><span className="text-gray-400">Gender:</span> Male</p>
          <p><span className="text-gray-400">Date of Birth:</span> 14 April 2004</p>
        </ProfileSection>

        <ProfileSection title="Contact Details">
          <p><span className="text-gray-400">Email:</span> rohan@email.com</p>
          <p><span className="text-gray-400">Phone:</span> +91 98765 43210</p>
          <p><span className="text-gray-400">City:</span> Jaipur</p>
        </ProfileSection>

        <ProfileSection title="Travel Preferences">
          <p><span className="text-gray-400">Preferred Vehicle:</span> Sedan</p>
          <p><span className="text-gray-400">Favorite Route:</span> Home → Office</p>
          <p><span className="text-gray-400">Peak Travel Time:</span> Morning</p>
        </ProfileSection>

        <ProfileSection title="Payment & Savings">
          <p><span className="text-gray-400">Default Payment:</span> UPI</p>
          <p><span className="text-gray-400">Total Spent:</span> ₹42,500</p>
          <p><span className="text-gray-400">Saved via Offers:</span> ₹3,200</p>
        </ProfileSection>

        <ProfileSection title="Account Status">
          <p>
            <span className="text-gray-400">Account:</span>{" "}
            <span className="text-green-400 font-medium">Active</span>
          </p>
          <p><span className="text-gray-400">Member Since:</span> Jan 2023</p>
        </ProfileSection>
        <ProfileSection title="Saved Locations">
            <UserLocationMap />
        </ProfileSection>

      </div>
    </div>
  );
};

export default CustomerProfile;
