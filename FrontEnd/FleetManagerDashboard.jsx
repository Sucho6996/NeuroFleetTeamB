export default function FleetManagerDashboard() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const user = localStorage.getItem("profile")
    ? JSON.parse(localStorage.getItem("profile"))
    : null;

  /* Greeting */
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  /* Last Login */
  const lastLogin = localStorage.getItem("lastLogin")
    ? new Date(localStorage.getItem("lastLogin")).toLocaleString()
    : "First Time Login";

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <div style={styles.userInfo}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="profile"
            style={styles.profileImg}
          />
          <div>
            <h3 style={{ margin: 0 }}>{user?.fullName || "Fleet Manager"}</h3>
            <p style={styles.role}>Role: Fleet Manager</p>
            <p style={styles.email}>{user?.email}</p>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            style={styles.btn}
            onClick={() => (window.location.href = "/profile")}
          >
            My Profile
          </button>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* GREETING */}
      <h2 style={styles.welcome}>
        {greeting}, {user?.fullName || "User"} 👋
      </h2>
      <p style={styles.lastLogin}>🔐 Last Login: {lastLogin}</p>

      {/* DASHBOARD METRICS */}
      <div style={styles.grid}>
        {[
          ["Active Vehicles", "18"],
          ["Total Fleet", "27"],
          ["Active Trips", "9"],
          ["Completed Trips", "1540"],
          ["Active Drivers", "21"],
          ["Weekly Revenue", "₹2,80,000"],
        ].map(([title, value], i) => (
          <div key={i} style={styles.card}>
            <h3>{title}</h3>
            <p>{value}</p>
          </div>
        ))}
      </div>

      {/* OPERATIONS */}
      <h2 style={styles.sectionTitle}>Fleet Operations</h2>

      <div style={styles.shortcuts}>
        <Shortcut label="📊 Fleet Dashboard" path="/fleet-dashboard" />
        <Shortcut label="🚘 Fleet Inventory" path="/fleet" />
        <Shortcut label="➕ Add Vehicle" path="/add-vehicle" />
        <Shortcut label="👷 Driver Management" path="/driver-management" />
        <Shortcut label="🛠 Maintenance Manager" path="/maintenance" />
        <Shortcut label="📈 Fleet Analytics" path="/analytics" />

        {/* ⭐ MODULE 3 ENTRY POINT */}
        <Shortcut
          label="🚦 Route Optimization"
          path="/route-dashboard"
          highlight
        />

        <Shortcut label="⚖ Load Optimization" path="/load-optimization" />
        <Shortcut label="📍 Live Tracking" path="/live-tracking" />
        <Shortcut label="🛠 Maintenance Center" path="/maintenance-center" />
        <Shortcut label="🚨 Maintenance Alerts" path="/maintenance-alerts" />
        <Shortcut label="⚡ Overspeed Alerts" path="/overspeed-alerts" />



      </div>
    </div>
  );
}
<h1 style={{color:"red", textAlign:"center"}}>
  FLEET MANAGER DASHBOARD LOADED
</h1>


/* SHORTCUT BUTTON */
function Shortcut({ label, path, highlight }) {
  return (
    <button
      style={{
        ...styles.shortcutBtn,
        background: highlight ? "#ff9800" : "#4b6bff",
        boxShadow: highlight
          ? "0 0 14px rgba(255,152,0,0.9)"
          : "0 4px 10px rgba(0,0,0,0.2)",
      }}
      onClick={() => (window.location.href = path)}
    >
      {label}
    </button>
  );
}

/* STYLES */
const styles = {
  page: {
    padding: "20px",
    background: "#f4f6f9",
    minHeight: "100vh",
  },

  header: {
    background: "#ffffff",
    padding: "15px 20px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },

  userInfo: { display: "flex", gap: 12, alignItems: "center" },

  profileImg: {
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    border: "2px solid #4b6bff",
  },

  role: { margin: 0, fontSize: "14px" },
  email: { margin: 0, fontSize: "13px", color: "#444" },

  actions: { display: "flex", gap: 10 },

  btn: {
    padding: "8px 16px",
    background: "#4b6bff",
    color: "#fff",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },

  logoutBtn: {
    padding: "8px 16px",
    background: "#ff5252",
    color: "#fff",
    borderRadius: 6,
    border: "none",
    cursor: "pointer",
  },

  welcome: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: 5,
  },

  lastLogin: {
    textAlign: "center",
    fontSize: "13px",
    color: "#555",
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "18px",
    marginBottom: "30px",
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    fontSize: "18px",
    fontWeight: "bold",
  },

  sectionTitle: {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "15px",
  },

  shortcuts: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },

  shortcutBtn: {
    padding: "16px",
    color: "#fff",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "transform 0.2s",
  },
};
