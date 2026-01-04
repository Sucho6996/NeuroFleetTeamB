import { useEffect, useState } from "react";
import IconBackButton from "../components/IconBackButton";

export default function TrafficAnalytics() {
  const [zones, setZones] = useState([]);

  useEffect(() => {
    generateTraffic();
    const interval = setInterval(generateTraffic, 4000);
    return () => clearInterval(interval);
  }, []);

  function generateTraffic() {
    const data = [
      { area: "Hinjewadi", level: randomLevel() },
      { area: "Baner", level: randomLevel() },
      { area: "Wakad", level: randomLevel() },
      { area: "Pune Station", level: randomLevel() },
      { area: "Hadapsar", level: randomLevel() },
    ];
    setZones(data);
  }

  function randomLevel() {
    const levels = ["Low", "Medium", "High"];
    return levels[Math.floor(Math.random() * levels.length)];
  }

  function getColor(level) {
    if (level === "Low") return "green";
    if (level === "Medium") return "orange";
    return "red";
  }

  return (
    <>
      <IconBackButton />

      <div style={styles.page}>
        <h1 style={styles.heading}>🚦 Traffic & Congestion Analytics</h1>

        <div style={styles.grid}>
          {zones.map((z, i) => (
            <div key={i} style={styles.card}>
              <h3>{z.area}</h3>

              <span
                style={{
                  ...styles.badge,
                  background: getColor(z.level),
                }}
              >
                {z.level} Traffic
              </span>

              {z.level === "High" && (
                <p style={styles.alert}>⚠ Congestion Detected</p>
              )}
            </div>
          ))}
        </div>

        <div style={styles.infoBox}>
          <h3>🧠 AI Insight</h3>
          <p>
            Routes passing through <b>High Traffic</b> zones are avoided
            automatically by the AI Route Engine to reduce ETA and fuel usage.
          </p>
        </div>
      </div>
    </>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #141e30, #243b55)",
  },
  heading: {
    color: "white",
    textAlign: "center",
    marginBottom: "25px",
    fontSize: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "18px",
    borderRadius: "14px",
    textAlign: "center",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  },
  badge: {
    display: "inline-block",
    padding: "8px 14px",
    borderRadius: "20px",
    color: "white",
    fontWeight: "bold",
    marginTop: "10px",
  },
  alert: {
    marginTop: "10px",
    color: "red",
    fontWeight: "bold",
  },
  infoBox: {
    marginTop: "35px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  },
};
