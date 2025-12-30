import { useState } from "react";
import VehicleCard from "../components/VehicleCard";
import AddVehicleModal from "../components/AddVehicleModal";

const initialVehicles = [
  {
    id: "VH-001",
    name: "Tata Nexon EV",
    number: "MP09 AB 1234",
    status: "AVAILABLE", // AVAILABLE | IN_USE | MAINTENANCE
    battery: 78, // %
    fuel: null, // null for EV
    speed: 42, // km/h
    location: {
      lat: 23.2599,
      lng: 77.4126,
      city: "Bhopal",
    },
  },
  {
    id: "VH-002",
    name: "Mahindra Bolero",
    number: "MP04 XY 8899",
    status: "IN_USE",
    battery: null,
    fuel: 54,
    speed: 58,
    location: {
      lat: 22.7196,
      lng: 75.8577,
      city: "Indore",
    },
  },
  {
    id: "VH-003",
    name: "Ashok Leyland Truck",
    number: "MH12 ZZ 7788",
    status: "MAINTENANCE",
    battery: null,
    fuel: 30,
    speed: 0,
    location: {
      lat: 19.076,
      lng: 72.8777,
      city: "Mumbai",
    },
  },
];

const FleetInventory = () => {
    const [vehicles, setVehicles] = useState(initialVehicles);
    const [open, setOpen] = useState(false);

    const handleAddVehicle = (vehicle) => {
        setVehicles((prev) => [...prev,{ vehicle, id: `VH-${prev.length + 1}`}]);
        setOpen(false);
    }
  return (
    <div className="flex min-h-screen text-white">

      {/* Sidebar reused from dashboard */}
      {/* <Sidebar /> */}

      <div className="flex-1 p-6 space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Fleet Inventory</h2>
          <button 
            onClick={() => setOpen(true)}
            className="bg-blue-600/80 px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
            + Add Vehicle
          </button>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Add Vehicle Modal */}
        {open && (<AddVehicleModal onClose={() => setOpen(false)} onAdd={handleAddVehicle} />)}

      </div>
    </div>
  );
};

export default FleetInventory;
