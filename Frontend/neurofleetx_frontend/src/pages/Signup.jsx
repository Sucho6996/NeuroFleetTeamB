import React, { useState } from "react";
import { assets } from "../assets/assets";
import Input from "../components/Input.jsx";
import { Link, useNavigate } from "react-router-dom";
import SelectRole from "../components/SelectRole.jsx";
import Select from "../components/Select.jsx";
import { signupByRole } from "../services/authService.js";

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    gender: "",

    // admin
    registrationNo: "",

    // fleet manager
    companyName: "",

    // driver
    licenseNumber: "",
    phoneNumber: "",

    // customer
    city: "",
    adharNo: "",
  });

  const handleRoleChange = (value) => {
    setRole(value);
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.role) {
    alert("Please select a role");
    return;
  }

  let payload = {
    fullName: formData.name,
    email: formData.email,
    password: formData.password,
    gender: formData.gender,
  };

  if (formData.role === "admin") {
    payload = {
      ...payload,
      registrationNo: formData.registrationNo,
    };
  }

  if (formData.role === "fleet_manager") {
    payload = {
      ...payload,
      companyName: formData.companyName,
    };
  }

  if (formData.role === "driver") {
    payload = {
      ...payload,
      drivingLicenseNumber: formData.licenseNumber,
      phoneNumber: formData.phoneNumber,
    };
  }

  if (formData.role === "customer") {
    payload = {
      ...payload,
      phoneNumber: formData.phoneNumber,
      city: formData.city,
      adharNo: formData.adharNo,
    };
  }

  try {
    const response = await signupByRole(formData.role, payload);

    console.log("✅ Signup success:", response.data);
    
    // Backend returns { Message: "Account created Successfully" } on success
    const message = response.data.Message || response.data.message;
    
    if (message && message.includes("Successfully")) {
      alert("Signup successful! Please login.");
      navigate("/login");
    } else {
      alert(message || "Signup completed");
    }
  } catch (error) {
    console.error("❌ FULL ERROR:", error);
    console.error("❌ RESPONSE DATA:", error.response?.data);
    console.error(payload);

    const errorMessage = error.response?.data?.Message || error.response?.data?.message || error.message;
    alert(errorMessage || "Signup failed. Please try again.");
  }

};



  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* blur image in background to give a theme */}
      <div className="absolute inset-0 w-full h-full overflow-hidden m-0 p-0">
        <img
          src={assets.background_img}
          alt="background"
          className="w-full h-full object-cover blur-[1.5px]"
        />
      </div>
      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-black/40 backdrop-blur-[7px] rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto overflow-x-visible overflow-y-visible">
          <h3 className="text-2xl font-semibold text-white text-center mb-2">
            Create an account
          </h3>
          <p className="text-white text-center">
            Please enter your details to Sign Up.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4 text-white mt-6">
            <div className="grid grid-cols-2 mg:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                type="text"
                onChange={handleChange("name")}
                required
              />
              <Input
                label="Email Address"
                placeholder="name@example.com"
                type="email"
                onChange={handleChange("email")}
                required
              />
              {/* Drop down role menu - Admin, Fleet Manager , Driver, Customer */}
              <div className="mb-4">
                <label className="text-[13px] text-white-800/40 block mb-1">
                  Role
                </label>
                <SelectRole value={role} onChange={handleRoleChange}>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="fleet_manager">Fleet Manager</option>
                  <option value="driver">Driver</option>
                  <option value="customer">Customer</option>
                </SelectRole>
              </div>

              {/* Gender field - required for all roles */}
              <div className="mb-4">
                <label className="text-[13px] text-white-800/40 block mb-1">
                  Gender
                </label>
                <Select
                  value={formData.gender}
                  onChange={(value) => setFormData({ ...formData, gender: value })}
                  options={[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other", value: "Other" },
                  ]}
                  placeholder="Select Gender"
                />
              </div>

              {role === "admin" && (
                <>
                  <Input
                    label="Registration Number"
                    placeholder="Enter registration number"
                    type="text"
                    onChange={handleChange("registrationNo")}
                    required
                  />
                </>
              )}

              {role === "fleet_manager" && (
                <>
                  <Input
                    label="Company Name"
                    placeholder="ABC Logistics Pv Ltd"
                    type="text"
                    onChange={handleChange("companyName")}
                    required
                  />
                </>
              )}

              {role === "driver" && (
                <>
                  <Input
                    label="Driving License Number"
                    placeholder="DL-xx-xxxx-xxxx"
                    type="text"
                    onChange={handleChange("licenseNumber")}
                    required
                  />
                  <Input
                    label="Phone Number"
                    placeholder="xxxx-xxx-xxxx"
                    type="text"
                    onChange={handleChange("phoneNumber")}
                    required
                  />
                </>
              )}

              {role === "customer" && (
                <>
                  <Input
                    label="Phone Number"
                    placeholder="xxxx-xxx-xxxx"
                    type="tel"
                    onChange={handleChange("phoneNumber")}
                    required
                  />
                  <Input
                    label="City"
                    type="text"
                    onChange={handleChange("city")}
                    required
                  />
                  <Input
                    label="Aadhar Number"
                    placeholder="xxxx xxxx xxxx"
                    type="text"
                    onChange={handleChange("adharNo")}
                    required
                  />
                </>
              )}

              <div className="col-span-2">
                <Input
                  label="Password"
                  placeholder="******"
                  type="password"
                  onChange={handleChange("password")}
                  required
                />
              </div>
            </div>
            <button
              className="btn-primary w-full py-1 bg-blue-800/50 text-sm font-medium flex items-center justify-center gap-2 text-white rounded-lg hover:bg-purple-800/70 transition"
              type="submit"
            >
              Signup
            </button>
            <p className="text-sm text-white-500 text-center mt-6 ">
              Already have an account?
              <Link
                to="/login"
                className="font-medium text-primary underline hover:text-primary-light transition-colors"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
