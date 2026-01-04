import "../styles/Dashboard.css";

import IconBackButton from "../components/IconBackButton";

export default function RouteDashboard() {
  return (
    <>
      <IconBackButton />

      <div style={styles.page}>
        <h1 style={styles.heading}>🚦 AI Route Optimization Dashboard</h1>

        {/* STATS */}
        <div style={styles.grid}>
          <div style={styles.card}>
            🚗 Active Vehicles
            <br />
            <b>12</b>
          </div>

          <div style={styles.card}>
            ⏱ Avg ETA
            <br />
            <b>24 min</b>
          </div>

          <div style={styles.card}>
            🚦 Traffic Status
            <br />
            <b>Moderate</b>
          </div>

          <div style={styles.card}>
            🧠 AI Confidence
            <br />
            <b>91%</b>
          </div>
        </div>

        {/* MODULE 3 ACTIONS */}
        <h2 style={styles.subHeading}>Module 3 Actions</h2>

        <div style={styles.actions}>
          <button onClick={() => window.location.href = "/route-planning"}>
            🛣 Route Planning
          </button>

          <button onClick={() => window.location.href = "/route-result"}>
            🗺 Route Visualization
          </button>

          <button onClick={() => window.location.href = "/eta-comparison"}>
            ⏱ ETA Comparison
          </button>

          <button onClick={() => window.location.href = "/load-optimization"}>
            📦 Load Optimization
          </button>

          <button onClick={() => window.location.href = "/live-tracking"}>
            📍 Live Tracking
          </button>

          <button onClick={() => window.location.href = "/traffic-analytics"}>
            🚦 Traffic Analytics
          </button>
        </div>
      </div>
    </>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
  },
  heading: {
    color: "white",
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "32px",
  },
  subHeading: {
    marginTop: "40px",
    textAlign: "center",
    color: "white",
    fontSize: "22px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "20px",
    borderRadius: "14px",
    textAlign: "center",
    fontSize: "18px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
  },
  actions: {
    marginTop: "30px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
  },
};
