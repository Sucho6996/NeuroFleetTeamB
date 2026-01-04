import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getAllVehicles } from "../data/vehicleStorage";

export default function VehicleMap() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    setVehicles(getAllVehicles());
    const interval = setInterval(() => {
      setVehicles(getAllVehicles());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[18.5204, 73.8567]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map(v => (
          <Marker key={v.id} position={[v.lat, v.lng]}>
            <Popup>
              <b>{v.id}</b><br />
              Speed: {v.speed} km/h<br />
              Battery: {v.battery}%<br />
              Status: {v.status}<br />
              Last Update: {v.lastUpdate}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
