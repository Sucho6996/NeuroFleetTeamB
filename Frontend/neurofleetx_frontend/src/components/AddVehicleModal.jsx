import { useState } from "react";
import { X } from "lucide-react";

const AddVehicleModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: "",
    number: "",
    type: "EV",
    status: "AVAILABLE",
    battery: "",
    fuel: "",
    speed: "",
    city: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd({
      name: form.name,
      number: form.number,
      type: form.type,
      status: form.status,
      battery: form.type === "EV" ? Number(form.battery) : null,
      fuel: form.type === "FUEL" ? Number(form.fuel) : null,
      speed: Number(form.speed),
      location: { city: form.city },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-black/80 border border-white/10 rounded-xl w-full max-w-lg p-6 relative">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={18} />
        </button>

        <h3 className="text-lg font-semibold mb-4">Add New Vehicle</h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">

          <input
            name="name"
            placeholder="Vehicle Name"
            required
            className="input"
            onChange={handleChange}
          />

          <input
            name="number"
            placeholder="Vehicle Number"
            required
            className="input"
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-3">
            <select name="type" className="input" onChange={handleChange}>
              <option value="EV">EV</option>
              <option value="FUEL">Fuel</option>
            </select>

            <select name="status" className="input" onChange={handleChange}>
              <option value="AVAILABLE">Available</option>
              <option value="IN_USE">In Use</option>
              <option value="MAINTENANCE">Maintenance</option>
            </select>
          </div>

          {form.type === "EV" ? (
            <input
              name="battery"
              placeholder="Battery %"
              type="number"
              className="input"
              onChange={handleChange}
            />
          ) : (
            <input
              name="fuel"
              placeholder="Fuel %"
              type="number"
              className="input"
              onChange={handleChange}
            />
          )}

          <input
            name="speed"
            placeholder="Speed (km/h)"
            type="number"
            className="input"
            onChange={handleChange}
          />

          <input
            name="city"
            placeholder="City"
            className="input"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600/80 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Vehicle
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVehicleModal;
