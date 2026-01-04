import { useState } from "react";
import "../styles/Dashboard.css";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";

/* LEAFLET ICON FIX */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function RouteOptimizationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [routes, setRoutes] = useState([]);
  const [srcCoord, setSrcCoord] = useState(null);
  const [destCoord, setDestCoord] = useState(null);

  /* DASHBOARD STATS */
  const stats = [
    { label: "Active Vehicles", value: 12 },
    { label: "Average ETA", value: "24 min" },
    { label: "Traffic Status", value: "Moderate" },
    { label: "AI Confidence", value: "91%" },
  ];

  /* SAFE GEOCODING */
  const geocode = async (place) => {
    if (!place) return null;

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        place
      )}`
    );
    const data = await res.json();

    if (!data.length) {
      alert(`Location not found: ${place}`);
      return null;
    }

    return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  };

  /* ROUTE FETCH */
  const showRoutes = async () => {
    const src = await geocode(source);
    const dest = await geocode(destination);
    if (!src || !dest) return;

    setSrcCoord(src);
    setDestCoord(dest);

    const res = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${src[1]},${src[0]};${dest[1]},${dest[0]}?alternatives=true&overview=full&geometries=geojson`
    );
    const data = await res.json();

    const colors = ["#00c853", "#ff9800", "#2196f3"];

    const processed = data.routes.map((r, i) => ({
      coords: r.geometry.coordinates.map(([lon, lat]) => [lat, lon]),
      distance: (r.distance / 1000).toFixed(2),
      time: Math.round(r.duration / 60),
      color: colors[i] || "#999",
    }));

    setRoutes(processed);
  };

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">ROUTE OPTIMIZATION DASHBOARD</h2>

      {/* TABS */}
      <div className="tab-wrapper">
        <div className="tab-button-row">
          {["overview", "routePlanning"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active-tab" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "overview" ? "Overview" : "Route Planning"}
            </button>
          ))}
        </div>
      </div>

      {/* OVERVIEW TAB */}
      {activeTab === "overview" && (
        <div className="dashboard-grid">
          {stats.map((s, i) => (
            <div key={i} className="card-box">
              {s.label}<br />
              <b>{s.value}</b>
            </div>
          ))}
        </div>
      )}

      {/* ROUTE PLANNING TAB */}
      {activeTab === "routePlanning" && (
        <div className="location-box">
          <div className="book-cab-form">
            <input
              placeholder="Enter Source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <input
              placeholder="Enter Destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
            <button onClick={showRoutes}>Optimize Route</button>
          </div>

          {/* ROUTE INFO */}
          {routes.length > 0 && (
            <div style={{ color: "white", marginBottom: "10px" }}>
              {routes.map((r, i) => (
                <p key={i}>
                  {i === 0 ? "🟢 Fastest Route" : "🛣 Alternative"} —{" "}
                  {r.distance} km | {r.time} mins
                </p>
              ))}
            </div>
          )}

          {/* MAP */}
          {srcCoord && (
            <MapContainer
              center={srcCoord}
              zoom={13}
              style={{ height: "400px", borderRadius: "16px" }}
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

              <Marker position={srcCoord} />
              <Marker position={destCoord} />
            </MapContainer>
          )}
        </div>
      )}
    </div>
  );
}
