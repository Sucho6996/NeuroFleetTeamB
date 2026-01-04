import PriorityTable from "../analytics/PriorityTable";
import FailureProbabilityChart from "../analytics/FailureProbabilityChart";
import HealthTrendChart from "../analytics/HealthTrendChart";

export default function MaintenanceCenter({ vehicles = [] }) {
  return (
    <div style={styles.page}>
      {/* TITLE */}
      <h1 style={styles.mainHeading}>
        🛠 Predictive Maintenance Center
      </h1>

      {/* SUMMARY CARDS */}
      <div style={styles.cardGrid}>
        <SummaryCard title="Healthy Vehicles" value="0" color="#4CAF50" />
        <SummaryCard title="Due for Service" value="0" color="#FF9800" />
        <SummaryCard title="Critical Vehicles" value="6" color="#F44336" />
        <SummaryCard title="Open Alerts" value="6" color="#9C27B0" />
      </div>

      {/* ADVANCED ANALYTICS */}
      <h2 style={styles.sectionHeading}>📊 Advanced Analytics</h2>
      <div style={styles.analyticsInfo}>
        <p><b>Fleet Average Health:</b> 70%</p>
        <p><b>Highest Risk Vehicle:</b> VH-001</p>
      </div>

      {/* CHARTS – SMALLER */}
      <div style={styles.chartsRow}>
        <div style={styles.smallCard}>
          <h3 style={styles.cardTitle}>Failure Probability</h3>
          <FailureProbabilityChart probability={70} height={180} />
        </div>

        <div style={styles.smallCard}>
          <h3 style={styles.cardTitle}>Fleet Health Trend</h3>
          <HealthTrendChart
            height={180}
            data={[
              { date: "Day 1", health: 88 },
              { date: "Day 2", health: 84 },
              { date: "Day 3", health: 80 },
              { date: "Day 4", health: 76 },
              { date: "Day 5", health: 72 },
            ]}
          />
        </div>
      </div>

      {/* PRIORITY QUEUE – BIG & PROMINENT */}
      <h2 style={styles.sectionHeading}>
        🚦 Maintenance Priority Queue
      </h2>

      <div style={styles.priorityWrapper}>
        <PriorityTable vehicles={vehicles} />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function SummaryCard({ title, value, color }) {
  return (
    <div style={{ ...styles.summaryCard, borderTop: `5px solid ${color}` }}>
      <h4>{title}</h4>
      <h1>{value}</h1>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh",
  },

  mainHeading: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#1a237e",
    fontSize: "32px",
  },

  sectionHeading: {
    textAlign: "center",
    margin: "40px 0 20px",
    color: "#263238",
    fontSize: "22px",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "35px",
  },

  summaryCard: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
  },

  analyticsInfo: {
    textAlign: "center",
    fontSize: "15px",
    color: "#333",
    marginBottom: "20px",
  },

  /* 👇 CHARTS SMALLER */
  chartsRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "50px",
  },

  smallCard: {
    background: "#fff",
    padding: "16px",
    borderRadius: "14px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
  },

  cardTitle: {
    marginBottom: "10px",
    color: "#333",
    fontSize: "16px",
  },

  /* 👇 PRIORITY QUEUE BIG */
  priorityWrapper: {
    background: "#fff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
  },
};
