import { useEffect, useState, useRef } from "react";
import { getOverspeedAlerts } from "../data/vehicleStorage";

/* ===== RANDOM REG NO ===== */
const randomRegNo = () => {
  const states = ["MH12", "DL01", "KA05", "TN09", "GJ01"];
  return `${states[Math.floor(Math.random() * states.length)]} ${
    Math.floor(1000 + Math.random() * 9000)
  }`;
};

export default function OverspeedAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [popup, setPopup] = useState(null);
  const lastPopupId = useRef(null);

  useEffect(() => {
    const load = () => {
      const data = getOverspeedAlerts() || [];
      setAlerts(data);

      if (!data.length) return;

      const latest = data[data.length - 1];

      // 🔔 POPUP ONLY IF SPEED > 110 AND NEW
      if (
        latest.speed > 110 &&
        latest.id !== lastPopupId.current
      ) {
        lastPopupId.current = latest.id;
        setPopup({
          ...latest,
          regNo: randomRegNo(),
        });
      }
    };

    load();
    const interval = setInterval(load, 3000);
    return () => clearInterval(interval);
  }, []);

  const getAction = (speed) => {
    if (speed >= 120) return "Immediate Stop Vehicle";
    if (speed >= 110) return "Escalate to Manager";
    return "Warn Driver";
  };

  return (
    <div style={styles.page}>
<h1 style={{ ...styles.heading, textAlign: "center" }}>
  🚨 Overspeed Alerts
</h1>

      {/* ===== POPUP MODAL ===== */}
      {popup && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>🚨 Overspeed Detected</h2>

            <p><b>Reg No:</b> {popup.regNo}</p>
            <p style={styles.speed}>
              <b>Speed:</b> {popup.speed} km/h
            </p>

            <p style={styles.action}>
              {getAction(popup.speed)}
            </p>

            <button
              style={styles.btn}
              onClick={() => setPopup(null)}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* ===== TABLE HEADER ===== */}
      <div style={{ ...styles.row, ...styles.header }}>
        <div style={styles.colReg}>Reg No</div>
        <div style={styles.colSpeed}>Speed</div>
        <div style={styles.colAction}>Action</div>
        <div style={styles.colTime}>Time</div>
      </div>

      {/* ===== TABLE BODY ===== */}
      <div style={styles.table}>
        {alerts.map(a => (
          <div key={a.id} style={styles.row}>
            <div style={styles.colReg}>{randomRegNo()}</div>
            <div style={styles.colSpeed}>{a.speed} km/h</div>
            <div style={styles.colAction}>
              {getAction(a.speed)}
            </div>
            <div style={styles.colTime}>{a.time}</div>
          </div>
        ))}
      </div>
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
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
  },

  /* TABLE */
  table: {
    background: "#fff",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
  },
  row: {
    display: "flex",
    padding: "14px",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    background: "#f5f5f5",
  },
  colReg: { flex: 1.5, fontWeight: "bold" },
  colSpeed: { flex: 1, color: "#d32f2f" },
  colAction: { flex: 2 },
  colTime: {
    flex: 2,
    textAlign: "right",
    fontSize: "13px",
  },

  /* POPUP */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "380px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
  },
  modalTitle: {
    color: "#d32f2f",
    marginBottom: "15px",
  },
  speed: {
    color: "#c62828",
    fontSize: "18px",
    marginTop: "10px",
  },
  action: {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#ad1457",
  },
  btn: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    background: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};
