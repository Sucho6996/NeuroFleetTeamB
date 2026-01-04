import { useEffect, useRef, useState } from "react";

/* ================= RANDOM DATA ================= */

const REG_PREFIX = ["MH12", "MH14", "DL01", "KA05", "TN09"];

const ISSUES = [
  { issue: "High Engine Temperature", action: "Check Cooling System" },
  { issue: "Low Battery Health", action: "Replace Battery" },
  { issue: "Excessive Tire Wear", action: "Replace Tires" },
  { issue: "Oil Pressure Drop", action: "Inspect Engine Oil" },
  { issue: "Brake Pad Wear", action: "Replace Brake Pads" },
];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomRegNo = () =>
  `${randomFrom(REG_PREFIX)} ${Math.floor(1000 + Math.random() * 9000)}`;

const randomTime = () =>
  new Date(
    Date.now() - Math.floor(Math.random() * 60 * 60 * 1000)
  ).toLocaleString();

const generateAlert = () => {
  const issueObj = randomFrom(ISSUES);
  return {
    id: Date.now() + Math.random(),
    regNo: randomRegNo(),
    issue: issueObj.issue,
    action: issueObj.action,
    time: randomTime(),
  };
};

/* ================= COMPONENT ================= */

export default function MaintenanceAlerts() {
  const [alerts, setAlerts] = useState([]);
  const [popupAlert, setPopupAlert] = useState(null);
  const lastPopupId = useRef(null);

  useEffect(() => {
    // Initial alerts
    const initialAlerts = Array.from({ length: 6 }, generateAlert);
    setAlerts(initialAlerts);
    setPopupAlert(initialAlerts[initialAlerts.length - 1]);
    lastPopupId.current = initialAlerts[initialAlerts.length - 1].id;

    // Auto-generate alerts
    const interval = setInterval(() => {
      const newAlert = generateAlert();
      setAlerts((prev) => {
        const updated = [...prev, newAlert].slice(-20);
        return updated;
      });

      if (newAlert.id !== lastPopupId.current) {
        lastPopupId.current = newAlert.id;
        setPopupAlert(newAlert);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🛠 Maintenance Alerts</h1>

      {/* ===== MODAL POPUP (LATEST ALERT) ===== */}
      {popupAlert && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>⚠ Maintenance Alert</h2>

            <div style={styles.popupRow}>
              <span>Reg No</span>
              <b>{popupAlert.regNo}</b>
            </div>

            <div style={styles.popupIssue}>{popupAlert.issue}</div>

            <div style={styles.popupRow}>
              <span>Action Needed</span>
              <b>{popupAlert.action}</b>
            </div>

            <button
              style={styles.ackBtn}
              onClick={() => setPopupAlert(null)}
            >
              Acknowledge
            </button>
          </div>
        </div>
      )}

      {/* ===== ALERT LIST ===== */}
      <div style={styles.table}>
        <div style={{ ...styles.row, ...styles.header }}>
          <div>Reg No</div>
          <div>Issue</div>
          <div>Action Needed</div>
          <div>Time</div>
        </div>

        {alerts.map((a) => (
          <div key={a.id} style={styles.row}>
            <div style={styles.reg}>{a.regNo}</div>
            <div style={styles.issue}>{a.issue}</div>
            <div style={styles.action}>{a.action}</div>
            <div style={styles.time}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
  },
  heading: {
    textAlign: "center",
    fontSize: "32px",
    marginBottom: "25px",
  },

  table: {
    background: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    overflow: "hidden",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1.3fr 2.2fr 2.2fr 1.8fr",
    padding: "14px",
    borderBottom: "1px solid #eee",
    alignItems: "center",
  },
  header: {
    background: "#f5f5f5",
    fontWeight: "bold",
  },
  reg: {
    fontWeight: "bold",
    color: "#1a237e",
  },
  issue: {
    color: "#d32f2f",
    fontWeight: "600",
  },
  action: {
    color: "#ef6c00",
    fontWeight: "600",
  },
  time: {
    fontSize: "15px",
    fontWeight: "bold",
    color: "#37474f",
  },

  /* POPUP */
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    background: "#fff",
    padding: "30px",
    width: "420px",
    borderRadius: "18px",
    textAlign: "center",
    boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
  },
  modalTitle: {
    color: "#d32f2f",
    marginBottom: "15px",
  },
  popupRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  popupIssue: {
    color: "#f44336",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "12px 0",
  },
  ackBtn: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    borderRadius: "10px",
    border: "none",
    background: "#1976d2",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};
