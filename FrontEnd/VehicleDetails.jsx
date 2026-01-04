import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVehicleById } from "../data/vehicleStorage";
import VehicleHealthTable from "../components/VehicleHealthTable";

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const v = getVehicleById(id);
    setVehicle(v);
  }, [id]);

  if (!vehicle) {
    return <h2 style={styles.notFound}>Vehicle not found</h2>;
  }

  // ✅ SIMULATED HEALTH DATA
  const vehicleHealth = {
    engineTemp: 105,
    tireWear: 78,
    batteryHealth: 35,
    fuelEfficiency: 12,
    mileage: 9200,
  };

  return (
    <div style={styles.page}>
      {/* HEADER CARD */}
      <div style={styles.card}>
        <h2 style={styles.title}>🚘 Vehicle Details</h2>

        <div style={styles.infoGrid}>
          <p><b>ID:</b> {vehicle.id}</p>
          <p><b>Plate:</b> {vehicle.numberPlate}</p>
          <p><b>Speed:</b> {vehicle.speed} km/h</p>
          <span style={statusStyle(vehicle.status)}>
            {vehicle.status}
          </span>
        </div>
      </div>

      {/* HEALTH CARD */}
      <div style={styles.card}>
        <h3 style={styles.subTitle}>🩺 Vehicle Health</h3>
        <VehicleHealthTable vehicle={vehicleHealth} />
      </div>

      {/* BACK BUTTON */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
  },
  card: {
    background: "#ffffff",
    borderRadius: "14px",
    padding: "20px",
    marginBottom: "20px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },
  title: {
    marginBottom: "15px",
    color: "#1a237e",
  },
  subTitle: {
    marginBottom: "12px",
    color: "#4a148c",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
    alignItems: "center",
  },
  backBtn: {
    marginTop: "10px",
    padding: "8px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#1a237e",
    color: "#fff",
    cursor: "pointer",
  },
  notFound: {
    textAlign: "center",
    marginTop: "50px",
  },
};

/* ================= HELPERS ================= */

const statusStyle = status => ({
  background:
    status === "maintenance"
      ? "#ef6c00"
      : status === "in-use"
      ? "#2e7d32"
      : "#1565c0",
  color: "#fff",
  padding: "6px 14px",
  borderRadius: "20px",
  fontWeight: "bold",
  width: "fit-content",
  textTransform: "capitalize",
});
