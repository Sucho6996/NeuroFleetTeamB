import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const UserLocationMap = () => {
  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        const map = L.map("user-map").setView([latitude, longitude], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "&copy; OpenStreetMap contributors",
        }).addTo(map);

        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("Your Current Location")
          .openPopup();

        // Cleanup
        return () => {
          map.remove();
        };
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to fetch location. Please allow location access.");
      }
    );
  }, []);


  return (
    <div
      id="user-map"
      className="w-full h-[300px] rounded-xl overflow-hidden border border-white/20"
    />
  );
};

export default UserLocationMap;
