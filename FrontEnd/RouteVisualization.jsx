import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";

export default function RouteVisualization() {
  const routes = {
    fast: [[18.52,73.85],[18.54,73.88],[18.58,73.98]],
    traffic: [[18.52,73.85],[18.53,73.90],[18.58,73.98]],
    energy: [[18.52,73.85],[18.50,73.92],[18.58,73.98]]
  };

  return (
    <div style={{height:"100vh"}}>
      <MapContainer center={[18.52,73.85]} zoom={13} style={{height:"100%"}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Polyline positions={routes.fast} color="green" />
        <Polyline positions={routes.traffic} color="orange" />
        <Polyline positions={routes.energy} color="blue" />

        <Marker position={routes.fast[0]}><Popup>Start</Popup></Marker>
        <Marker position={routes.fast[2]}><Popup>End</Popup></Marker>
      </MapContainer>
    </div>
  );
}
