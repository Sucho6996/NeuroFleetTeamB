import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllVehicles } from "../data/vehicleStorage";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* FIX LEAFLET ICON ISSUE */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function VehicleLocation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    const loadVehicle = () => {
      const v = getAllVehicles().find(v => v.id === id);
      setVehicle(v);
    };

    loadVehicle();
    const interval = setInterval(loadVehicle, 3000); // live refresh
    return () => clearInterval(interval);
  }, [id]);

  if (!vehicle) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading vehicle location...
      </h2>
    );
  }

  return (
    <div style={styles.page}>
      {/* BACK BUTTON */}
      <button style={styles.backBtn} onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2 style={styles.heading}>
        📍 Live Vehicle Tracking — {vehicle.id}
      </h2>

      <div style={styles.mapBox}>
        <MapContainer
          center={[vehicle.lat, vehicle.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[vehicle.lat, vehicle.lng]}>
            <Popup>
              <b>{vehicle.id}</b><br />
              Speed: {vehicle.speed} km/h<br />
              Status: {vehicle.status}<br />
              Battery: {vehicle.battery}%<br />
              Fuel: {vehicle.fuel}%
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "20px",
    minHeight: "100vh",
    background: "linear-gradient(135deg,#6a8dff,#ff7bc7)",
  },
  heading: {
    textAlign: "center",
    color: "white",
    marginBottom: "15px",
  },
  mapBox: {
    height: "80vh",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
  },
  backBtn: {
    background: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "10px",
  },
};
