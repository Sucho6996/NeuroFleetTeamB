import { MapPin } from "lucide-react";
import StatusChip from "./StatusChip";
import TelemetryBar from "./TelemetryBar";



const VehicleCard = ({ vehicle }) => {
  return (
    <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 space-y-3 hover:scale-[1.01] transition">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{vehicle.name}</h3>
          <p className="text-xs text-gray-400">{vehicle.number}</p>
        </div>
        <StatusChip status={vehicle.status} />
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <MapPin size={14} />
        {vehicle.location.city}
      </div>

      {/* Telemetry */}
      {vehicle.battery !== null && (
        <TelemetryBar
          label="Battery"
          value={vehicle.battery}
          color="bg-green-500"
        />
      )}

      {vehicle.fuel !== null && (
        <TelemetryBar
          label="Fuel"
          value={vehicle.fuel}
          color="bg-yellow-500"
        />
      )}

      {/* Speed */}
      <p className="text-xs text-gray-400">
        Speed: <span className="text-white">{vehicle.speed} km/h</span>
      </p>
    </div>
  );
};

export default VehicleCard;
