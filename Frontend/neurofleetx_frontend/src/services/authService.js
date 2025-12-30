import api from "./api";

// Login by role
export const login = (role, data) => {
  let endpoint = "";

  switch (role.toUpperCase()) {
    case "CUSTOMER":
      endpoint = "/user/login";
      break;
    case "ADMIN":
      endpoint = "/admin/login";
      break;
    case "FLEET_MANAGER":
      endpoint = "/fleetManager/login";
      break;
    case "DRIVER":
      endpoint = "/driver/login";
      break;
    default:
      throw new Error("Invalid role for login");
  }

  return api.post(endpoint, {
    email: data.email,
    password: data.password,
  });
};

// Signup by role
export const signupByRole = (role, data) => {
  let endpoint = "";
  let payload = {};

  switch (role) {
    case "admin":
      endpoint = "/admin/signup";
      payload = {
        email: data.email,
        name: data.fullName || data.name,
        password: data.password,
        role: "ADMIN",
        gender: data.gender,
        registrationNo: data.registrationNo,
      };
      break;

    case "customer":
      endpoint = "/user/signup";
      payload = {
        email: data.email,
        name: data.fullName || data.name,
        password: data.password,
        role: "CUSTOMER",
        gender: data.gender,
        adharNo: data.adharNo,
      };
      break;

    case "driver":
      endpoint = "/driver/signup";
      payload = {
        email: data.email,
        name: data.fullName || data.name,
        password: data.password,
        role: "DRIVER",
        gender: data.gender,
        licenseNumber: data.drivingLicenseNumber || data.licenseNumber,
        phNo: data.phoneNumber,
      };
      break;

    case "fleet_manager":
      endpoint = "/fleetManager/signup";
      payload = {
        email: data.email,
        name: data.fullName || data.name,
        password: data.password,
        role: "FLEET_MANAGER",
        gender: data.gender,
        companyName: data.companyName,
      };
      break;

    default:
      throw new Error("Invalid role for signup");
  }

  return api.post(endpoint, payload);
};
