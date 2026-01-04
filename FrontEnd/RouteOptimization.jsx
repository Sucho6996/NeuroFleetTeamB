import React, { useState } from "react";
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
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

/* ================= CUSTOM ICONS ================= */
const startIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

const endIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

export default function RouteOptimization() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [srcCoord, setSrcCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);

  /* =============== GEOCODING ================= */
  const geocode = async (place) => {
    if (!place) return null;

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

  /* =============== ROUTE ENGINE ================= */
  const optimizeRoute = async () => {
    const src = await geocode(source);
    const dest = await geocode(destination);
    if (!src || !dest) return;

    setSrcCoord(src);
    setDestCoord(dest);

    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${src[1]},${src[0]};${dest[1]},${dest[0]}?alternatives=true&overview=full&geometries=geojson`
    );
    const data = await res.json();

    if (!data.routes) return;

    const colors = ["#00c853", "#ff9800", "#2196f3"];

    const processed = data.routes.map((r, i) => ({
      coords: r.geometry.coordinates.map(([lon, lat]) => [
        lat + i * 0.0003,
        lon + i * 0.0003
      ]),
      distance: (r.distance / 1000).toFixed(2),
      time: Math.round(r.duration / 60),
      color: colors[i] || "#777"
    }));

    setRoutes(processed);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>🚦 AI Route Optimization</h1>

      {/* INPUT CARD */}
      <div style={styles.card}>
        <input
          placeholder="Enter Source Location"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Enter Destination Location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={styles.input}
        />

        <button style={styles.btn} onClick={optimizeRoute}>
          🚀 Optimize Route
        </button>
      </div>

      {/* ROUTE INFO */}
      {routes.length > 0 && (
        <div style={styles.info}>
          {routes.map((r, i) => (
            <p key={i}>
              {i === 0 ? "🟢 Fastest" : "🛣 Alternative"} — {r.distance} km | {r.time} mins
            </p>
          ))}
        </div>
      )}

      {/* MAP */}
      {srcCoord && (
        <MapContainer
          center={srcCoord}
          zoom={13}
          style={{ height: "420px", marginTop: "20px" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {routes.map((r, i) => (
            <Polyline
              key={i}
              positions={r.coords}
              pathOptions={{
                color: r.color,
                weight: i === 0 ? 6 : 4,
                dashArray: i === 0 ? null : "8,8"
              }}
            />
          ))}

          <Marker position={srcCoord} icon={startIcon} />
          <Marker position={destCoord} icon={endIcon} />
        </MapContainer>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg,#1e3c72,#2a5298)",
    color: "white"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  card: {
    maxWidth: "500px",
    margin: "auto",
    background: "white",
    padding: "20px",
    borderRadius: "16px",
    color: "black"
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  },
  btn: {
    width: "100%",
    padding: "12px",
    borderRadius: "25px",
    border: "none",
    background: "#ff9800",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },
  info: {
    marginTop: "15px",
    textAlign: "center"
  }
};
