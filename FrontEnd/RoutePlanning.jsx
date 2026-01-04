import { useState } from "react";
import IconBackButton from "../components/IconBackButton";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ================= LEAFLET ICON FIX ================= */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* ================= CUSTOM ICONS ================= */
const startIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const endIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function RoutePlanning() {
  const [form, setForm] = useState({
    source: "",
    destination: "",
    waypoint: "",
    preference: "shortest",
    vehicleType: "car",
  });

  /* ===== ROUTE STATE (NEW) ===== */
  const [routes, setRoutes] = useState([]);
  const [srcCoord, setSrcCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);

  /* ================= GEOCODING ================= */
  const geocode = async (place) => {
    if (!place || place.trim() === "") return null;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`
    );
    const data = await res.json();

    if (!data || data.length === 0) {
      alert(`Location not found: ${place}`);
      return null;
    }

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  /* ================= ROUTE ENGINE ================= */
  const handleSubmit = async () => {
    if (!form.source || !form.destination) {
      alert("Please enter source and destination");
      return;
    }

    const src = await geocode(form.source);
    const dest = await geocode(form.destination);
    if (!src || !dest) return;

    setSrcCoord(src);
    setDestCoord(dest);

    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${src[1]},${src[0]};${dest[1]},${dest[0]}?alternatives=true&overview=full&geometries=geojson`
    );
    const data = await res.json();

    if (!data.routes) {
      alert("No route found");
      return;
    }

    const colors = ["#00c853", "#ff9800", "#2196f3"];

    const processedRoutes = data.routes.map((r, index) => ({
      coords: r.geometry.coordinates.map(([lon, lat]) => [
        lat + index * 0.0003,
        lon + index * 0.0003,
      ]),
      distance: (r.distance / 1000).toFixed(2),
      time: Math.round(r.duration / 60),
      color: colors[index] || "#666",
    }));

    setRoutes(processedRoutes);
  };

  return (
    <>
      <IconBackButton />

      <div style={styles.page}>
        <h1 style={styles.heading}>🛣 Route Planning</h1>

        <div style={styles.card}>
          {/* SOURCE */}
          <label style={styles.label}>Start Location (Source)</label>
          <input
            style={styles.input}
            placeholder="e.g. Pune Station"
            value={form.source}
            onChange={(e) =>
              setForm({ ...form, source: e.target.value })
            }
          />

          {/* DESTINATION */}
          <label style={styles.label}>Destination</label>
          <input
            style={styles.input}
            placeholder="e.g. Hinjewadi Phase 3"
            value={form.destination}
            onChange={(e) =>
              setForm({ ...form, destination: e.target.value })
            }
          />

          {/* WAYPOINT (kept, not used in routing yet) */}
          <label style={styles.label}>
            Intermediate Stop (Optional)
          </label>
          <input
            style={styles.input}
            placeholder="e.g. Wakad"
            value={form.waypoint}
            onChange={(e) =>
              setForm({ ...form, waypoint: e.target.value })
            }
          />

          {/* OPTIMIZATION */}
          <label style={styles.label}>Optimization Preference</label>
          <select
            style={styles.input}
            value={form.preference}
            onChange={(e) =>
              setForm({ ...form, preference: e.target.value })
            }
          >
            <option value="shortest">Shortest Time</option>
            <option value="traffic">Least Traffic</option>
            <option value="energy">Energy Efficient</option>
          </select>

          {/* VEHICLE TYPE */}
          <label style={styles.label}>Vehicle Type</label>
          <select
            style={styles.input}
            value={form.vehicleType}
            onChange={(e) =>
              setForm({ ...form, vehicleType: e.target.value })
            }
          >
            <option value="bike">Bike</option>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
          </select>

          <button style={styles.submitBtn} onClick={handleSubmit}>
            🚀 Optimize Route
          </button>
        </div>

        {/* ROUTE INFO */}
        {routes.length > 0 && (
          <div style={{ color: "white", marginTop: "15px" }}>
            {routes.map((r, i) => (
              <p key={i}>
  {i === 0 ? "🟢 Fastest Route" : "🛣 Alternative Route"} —{" "}
  {r.distance} km |{" "}
  {r.time > 60
    ? `${(r.time / 60).toFixed(1)} hrs`
    : `${r.time} mins`}
</p>

            ))}
          </div>
        )}

        {/* MAP (ONLY AFTER OPTIMIZE) */}
        {srcCoord && (
          <MapContainer
            center={srcCoord}
            zoom={13}
            style={{ height: "380px", marginTop: "20px", width: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {routes.map((r, i) => (
              <Polyline
                key={i}
                positions={r.coords}
                pathOptions={{
                  color: r.color,
                  weight: i === 0 ? 6 : 4,
                  dashArray: i === 0 ? null : "8,8",
                }}
              />
            ))}

            <Marker position={srcCoord} icon={startIcon} />
            <Marker position={destCoord} icon={endIcon} />
          </MapContainer>
        )}
      </div>
    </>
  );
}

/* ===== EXISTING STYLES (UNCHANGED) ===== */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #2a5298, #1e3c72)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  heading: {
    color: "white",
    fontSize: "32px",
    marginBottom: "25px",
  },

  card: {
    background: "white",
    width: "100%",
    maxWidth: "480px",
    padding: "25px",
    borderRadius: "16px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  },

  label: {
    fontWeight: "bold",
    marginTop: "12px",
    display: "block",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  submitBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "#ff9800",
    border: "none",
    borderRadius: "30px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
