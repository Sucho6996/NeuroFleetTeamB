import { NavLink } from "react-router-dom";

const TopNavbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/10">
      <div className="flex items-center justify-between px-6 h-16">

        {/* Logo */}
        <h1 className="text-lg font-semibold text-white">
          Neuro<span className="text-blue-500">FleetX</span>
        </h1>

        {/* Nav Links */}
        <nav className="flex gap-6 text-sm">
          <NavItem to="/driver/dashboard" label="Dashboard" />
          <NavItem to="/driver/profile" label="Profile" />
          <NavItem to="/driver/trips" label="Trips" />
          <NavItem to="/driver/documents" label="Documents" />
          <NavItem to="/driver/settings" label="Settings" />
        </nav>

        {/* User */}
        <div className="flex items-center gap-3">
          <img
            src="https://m.media-amazon.com/images/I/41ONa5HOwfL._AC_UF1000,1000_QL80_.jpg"
            className="w-9 h-9 rounded-full border border-white/20"
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `transition ${
        isActive
          ? "text-blue-500"
          : "text-gray-300 hover:text-white"
      }`
    }
  >
    {label}
  </NavLink>
);

export default TopNavbar;
