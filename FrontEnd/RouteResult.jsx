import IconBackButton from "../components/IconBackButton";

export default function RouteResult() {
  const routes = [
    {
      type: "Fastest Route",
      color: "green",
      distance: 22,
      eta: 28,
      energy: "High",
    },
    {
      type: "Low Traffic Route",
      color: "orange",
      distance: 26,
      eta: 35,
      energy: "Medium",
    },
    {
      type: "Energy Efficient Route",
      color: "blue",
      distance: 30,
      eta: 42,
      energy: "Low",
    },
  ];

  return (
    <>
      <IconBackButton />

      <div style={styles.page}>
        <h1 style={styles.heading}>📊 Route Comparison</h1>

        <div style={styles.grid}>
          {routes.map((route, index) => (
            <div
              key={index}
              style={{
                ...styles.card,
                borderLeft: `6px solid ${route.color}`,
              }}
            >
              <h3 style={{ color: route.color }}>{route.type}</h3>

              <p><b>Distance:</b> {route.distance} km</p>
              <p><b>ETA:</b> {route.eta} mins</p>
              <p><b>Energy Usage:</b> {route.energy}</p>

              <button
                style={styles.selectBtn}
                onClick={() => {
                  window.location.href = "/live-tracking";
                }}
              >
                ✅ Select This Route
              </button>
            </div>
          ))}
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
    background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    textAlign: "center",
  },
  heading: {
    color: "white",
    fontSize: "32px",
    marginBottom: "25px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
    textAlign: "left",
  },
  selectBtn: {
    width: "100%",
    marginTop: "15px",
    padding: "12px",
    border: "none",
    borderRadius: "25px",
    background: "#4caf50",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
