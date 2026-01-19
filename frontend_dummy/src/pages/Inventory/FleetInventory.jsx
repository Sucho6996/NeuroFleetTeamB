// src/pages/fleetmanager/FleetInventory.jsx
import { useState, useEffect, useRef } from "react";
import VehicleCard from "../../components/VehicleCard";
import AddVehicleModal from "../../components/AddVehicleModal";
import EditVehicleModal from "../../components/EditVehicleModal";
import VehicleLiveModal from "../../components/VehicleLiveModal";
import ShowVehicle from "../../components/ShowVehicle";
import {
  addVehicle,
  getAllVehicles,
  deleteVehicle,
  updateVehicleFuel,
  reportOverspeeding,
  addAlert,
} from "../../services/fleetManagerApis";

const FleetInventory = () => {
  const [vehicles, setVehicles] = useState([]);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [viewingVehicle, setViewingVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const speedIntervalRef = useRef(null);
  const ENGINE_HEALTH_THRESHOLD = 25;
  const TIRE_WEAR_THRESHOLD = 75;

  // 🔁 Fetch vehicles from DB
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const data = await getAllVehicles();

      const mappedVehicles = data.map((v, index) => ({
        id: v.regNo || `VH-${index + 1}`,
        name: v.name || "Unknown Vehicle",
        number: v.regNo,
        status: "AVAILABLE",
        battery: v.type?.toLowerCase().includes("ev") ? v.fuel || 0 : null,
        fuel: v.type?.toLowerCase().includes("ev") ? null : v.fuel || 0,
        speed: 0,
        location: {
          city: extractCity(v.location),
        },
        type: v.type,
        engineHealth:
          v.engineHealth ?? v.engineTemp ?? 100,
        tireWear: v.tireWear ?? 0,
        batteryHealth:
          v.batteryHealth ??
          (v.type?.toLowerCase().includes("ev") ? v.fuel ?? 100 : null),
        fuelEfficiency: v.fuelEfficiency ?? v.mileage ?? null,
      }));

      setVehicles(mappedVehicles);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unable to load fleet vehicles.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const extractCity = (locationStr) => {
    if (!locationStr) return "N/A";
    const parts = locationStr.split(",");
    return parts[parts.length - 1].trim();
  };

  // ➕ ADD VEHICLE
  const handleAddVehicle = async (vehicle) => {
    try {
      setLoading(true);
      await addVehicle(vehicle);
      await fetchVehicles();
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add vehicle");
    } finally {
      setLoading(false);
    }
  };

  // ✏️ EDIT VEHICLE (fuel/battery)
  const handleEditSave = async (regNo, fuel) => {
    try {
      setLoading(true);
      await updateVehicleFuel(regNo, fuel);
      setEditingVehicle(null);
      await fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Failed to update vehicle");
    } finally {
      setLoading(false);
    }
  };

  // 🗑️ DELETE VEHICLE
  const handleDelete = async (regNo) => {
    if (!window.confirm("Delete this vehicle permanently?")) return;

    try {
      setLoading(true);
      await deleteVehicle(regNo);
      await fetchVehicles();
    } catch (err) {
      console.error(err);
      alert("Failed to delete vehicle");
    } finally {
      setLoading(false);
    }
  };

  // 🚗 LIVE VEHICLE TRACKING
  const handleVehicleClick = async (vehicle) => {
    const randomWearStep = () => Math.floor(Math.random() * 2) + 2; // 2-3 points
    let engineAlertTriggered = false;
    let tireAlertTriggered = false;

    const maybeSendHealthAlerts = async () => {
      if (!engineAlertTriggered && liveEngineHealth <= ENGINE_HEALTH_THRESHOLD) {
        engineAlertTriggered = true;
        alert(
          `🚨 Engine Health Alert!\nVehicle: ${vehicle.number}\nHealth: ${liveEngineHealth}%`
        );
        try {
          await addAlert({
            regNo: vehicle.number,
            issue: `Engine health low (${liveEngineHealth}%)`,
            actionNeeded: "Schedule engine diagnostics/maintenance",
          });
        } catch (err) {
          console.error("Engine alert API failed", err);
        }
      }

      if (!tireAlertTriggered && liveTireWear >= TIRE_WEAR_THRESHOLD) {
        tireAlertTriggered = true;
        alert(
          `🚨 Tire Wear Alert!\nVehicle: ${vehicle.number}\nWear: ${liveTireWear}%`
        );
        try {
          await addAlert({
            regNo: vehicle.number,
            issue: `Tire wear high (${liveTireWear}%)`,
            actionNeeded: "Inspect/rotate tires or schedule replacement",
          });
        } catch (err) {
          console.error("Tire wear alert API failed", err);
        }
      }
    };

    // Clear previous interval
    if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
      speedIntervalRef.current = null;
    }

    // Don't start if vehicle is in maintenance
    if (vehicle.status === "MAINTENANCE" || vehicle.status === "Maintenance") {
      alert(`Vehicle ${vehicle.number} is in maintenance. Cannot start tracking.`);
      return;
    }

    const liveLat = 22.5726 + Math.random() / 100;
    const liveLon = 88.3639 + Math.random() / 100;

    let liveFuel = Math.max(
      (vehicle.fuel ?? vehicle.battery ?? 100) - (Math.floor(Math.random() * 2) + 1),
      0
    );
    let liveEngineHealth = Math.max(
      (vehicle.engineHealth ?? 100) - randomWearStep(),
      0
    );
    let liveTireWear = Math.min(
      (vehicle.tireWear ?? 0) + randomWearStep(),
      100
    );

    // Backend fuel update (initial)
    try {
      await updateVehicleFuel(vehicle.number, liveFuel);
    } catch (e) {
      console.error("Failed to update fuel:", e);
    }

    if (liveFuel <= 0) {
      setSelectedVehicle({
        ...vehicle,
        regNo: vehicle.number,
        liveLat,
        liveLon,
        liveFuel: 0,
        liveSpeed: 0,
        liveEngineHealth,
        liveTireWear,
      });

      setVehicles((prev) =>
        prev.map((v) =>
          v.number === vehicle.number
            ? {
                ...v,
                fuel: 0,
                battery: 0,
                engineHealth: liveEngineHealth,
                tireWear: liveTireWear,
                status: "MAINTENANCE",
              }
            : v
        )
      );

      alert(`⛽ Vehicle ${vehicle.number} has no fuel. Cannot start.`);
      return;
    }

    let liveSpeed = Math.floor(Math.random() * 121);

    setSelectedVehicle({
      ...vehicle,
      regNo: vehicle.number,
      liveLat,
      liveLon,
      liveFuel,
      liveSpeed,
      liveEngineHealth,
      liveTireWear,
    });

    // Optimistic fuel update
    setVehicles((prev) =>
      prev.map((v) =>
        v.number === vehicle.number
          ? {
              ...v,
              fuel: liveFuel,
              battery: liveFuel,
              engineHealth: liveEngineHealth,
              tireWear: liveTireWear,
            }
          : v
      )
    );

    await maybeSendHealthAlerts();

    // Speed simulation
    speedIntervalRef.current = setInterval(async () => {
      // Stop if fuel finished
      if (liveFuel <= 0 || liveEngineHealth <= 0 || liveTireWear >= 100) {
        clearInterval(speedIntervalRef.current);
        speedIntervalRef.current = null;

        setSelectedVehicle((prev) => ({
          ...prev,
          liveSpeed: 0,
          liveFuel: 0,
          liveEngineHealth: Math.max(liveEngineHealth, 0),
          liveTireWear: Math.min(liveTireWear, 100),
        }));

        setVehicles((prev) =>
          prev.map((v) =>
            v.number === vehicle.number
              ? {
                  ...v,
                  status: "MAINTENANCE",
                  fuel: Math.max(liveFuel, 0),
                  battery: Math.max(liveFuel, 0),
                  engineHealth: Math.max(liveEngineHealth, 0),
                  tireWear: Math.min(liveTireWear, 100),
                }
              : v
          )
        );

        return;
      }

      liveFuel = Math.max(liveFuel - 1, 0);
      liveEngineHealth = Math.max(liveEngineHealth - randomWearStep(), 0);
      liveTireWear = Math.min(liveTireWear + randomWearStep(), 100);
      liveSpeed = Math.floor(Math.random() * 121);

      setSelectedVehicle((prev) => ({
        ...prev,
        liveSpeed,
        liveFuel,
        liveEngineHealth,
        liveTireWear,
      }));

      setVehicles((prev) =>
        prev.map((v) =>
          v.number === vehicle.number
            ? {
                ...v,
                fuel: liveFuel,
                battery: liveFuel,
                engineHealth: liveEngineHealth,
                tireWear: liveTireWear,
              }
            : v
        )
      );

      await maybeSendHealthAlerts();

      // Overspeed alert
      if (liveSpeed >= 100) {
        const alertObj = {
          regNo: vehicle.number,
          time: new Date().toDateString() + " " + new Date().toLocaleTimeString(),
          speed: String(liveSpeed),
        };

        alert(
          `🚨 Overspeeding Alert!\nVehicle: ${vehicle.number}\nSpeed: ${liveSpeed} km/h`
        );

        try {
          await reportOverspeeding(alertObj);
        } catch (err) {
          console.error("Overspeeding API failed", err);
        }
      }
    }, 2000);
  };

  const closeLiveModal = () => {
    if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
      speedIntervalRef.current = null;
    }
    setSelectedVehicle(null);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (speedIntervalRef.current) {
        clearInterval(speedIntervalRef.current);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-center py-20">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
        <p className="mt-6 text-xl text-slate-600">Loading your fleet...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 p-6 text-center py-20">
        <p className="text-red-600 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center bg-white border border-green-200 rounded-xl p-5">
        <h2 className="text-2xl font-bold text-green-900">Fleet Inventory</h2>
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          + Add Vehicle
        </button>
      </div>

      {/* Vehicles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.id}
            onClick={() => {
              if (vehicle.status !== "MAINTENANCE" && vehicle.status !== "Maintenance") {
                handleVehicleClick(vehicle);
              }
            }}
            className="cursor-pointer"
          >
            <VehicleCard
              vehicle={vehicle}
              onEdit={(e) => {
                e.stopPropagation();
                setEditingVehicle(vehicle);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                handleDelete(vehicle.number);
              }}
              onView={(e) => {
                e.stopPropagation();
                setViewingVehicle(vehicle.number);
              }}
            />
          </div>
        ))}
      </div>

      {/* Modals */}
      {open && (
        <AddVehicleModal
          onClose={() => setOpen(false)}
          onAdd={handleAddVehicle}
        />
      )}

      {editingVehicle && (
        <EditVehicleModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSave={handleEditSave}
        />
      )}

      {selectedVehicle && (
        <VehicleLiveModal
          vehicle={selectedVehicle}
          onClose={closeLiveModal}
        />
      )}

      {viewingVehicle && (
        <ShowVehicle
          regNo={viewingVehicle}
          onBack={() => setViewingVehicle(null)}
        />
      )}
    </div>
  );
};

export default FleetInventory;
