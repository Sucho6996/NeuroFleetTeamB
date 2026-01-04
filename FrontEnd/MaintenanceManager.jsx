import { useEffect, useState } from "react";
import { getAllVehicles, updateVehicle } from "../data/vehicleStorage";

export default function MaintenanceManager() {
  const [vehicles, setVehicles] = useState([]);

  const loadData = () => {
    setVehicles(getAllVehicles());
  };

  useEffect(() => {
    loadData();
  }, []);

  const markMaintenance = (id) => {
    updateVehicle(id, { status: "maintenance" });
    loadData();
  };

  const markOperational = (id) => {
    updateVehicle(id, { status: "idle" });
    loadData();
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🛠 Maintenance Manager</h1>
        <p style={styles.sub}>
          Manage vehicle maintenance status across the fleet
        </p>

        <div style={styles.grid}>
          {vehicles.map((v) => (
            <div key={v.id} style={styles.card}>
              <h3>{v.id}</h3>

              <p><b>Number Plate:</b> {v.numberPlate}</p>
              <p><b>Type:</b> {v.type}</p>

              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      v.status === "maintenance"
                        ? "orange"
                        : v.status === "in-use"
                        ? "green"
                        : "blue",
                  }}
                >
                  {v.status.toUpperCase()}
                </span>
              </p>

              <div style={styles.btnGroup}>
                <button
                  style={{ ...styles.btn, background: "#ff9800" }}
                  onClick={() => markMaintenance(v.id)}
                >
                  Mark Maintenance
                </button>

                <button
                  style={{ ...styles.btn, background: "#4caf50" }}
                  onClick={() => markOperational(v.id)}
                >
                  Mark Operational
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          style={styles.backBtn}
          onClick={() => (window.location.href = "/fleet-dashboard")}
        >
          ← Back to Fleet Dashboard
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #6a8dff, #ff7bc7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
  },
  container: {
    width: "100%",
    maxWidth: "1100px",
    background: "white",
    borderRadius: "14px",
    padding: "30px",
    boxShadow: "0px 6px 20px rgba(0,0,0,0.3)",
  },
  heading: {
    textAlign: "center",
    fontSize: "30px",
    marginBottom: "6px",
  },
  sub: {
    textAlign: "center",
    fontSize: "14px",
    color: "#555",
    marginBottom: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#f9f9f9",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
  },
  btnGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "12px",
  },
  btn: {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    fontSize: "13px",
  },
  backBtn: {
    marginTop: "25px",
    width: "100%",
    padding: "12px",
    background: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
