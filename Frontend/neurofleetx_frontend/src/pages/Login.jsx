import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import Input from '../components/Input.jsx'
import { Link, useNavigate } from 'react-router-dom'
import SelectRole from '../components/SelectRole.jsx'
import { login } from '../services/authService.js'
const Login = () => {
    
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    
    const handleRoleChange = (value) => {
        setRole(value);
        setFormData((prev) => ({ ...prev, role: value.toUpperCase() }));
  };
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role:''
    });
    // clear ol locally stored token 
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
    }, []);
    
    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.role) {
            alert("Please select a role");
            return;
        }
        
        setLoading(true);
        try{
            const response = await login(formData.role, formData);
            console.log("✅ Login success:", response.data);
            
            // Backend returns { Message: "<JWT_TOKEN>" } on success
            const token = response.data.Message;
            
            if (token) {
                localStorage.setItem("token", token);
                localStorage.setItem("role", formData.role);
                localStorage.setItem("email", formData.email);

                switch (formData.role.toUpperCase()) {
                    case "ADMIN":
                        navigate("/admin/dashboard");
                        break;
                    case "FLEET_MANAGER":
                        navigate("/fleetmanager/dashboard");
                        break;
                    case "DRIVER":
                        navigate("/driver/dashboard");
                        break;
                    case "CUSTOMER":
                        navigate("/customer/dashboard");
                        break;
                    default:
                        alert("Unknown role. Cannot navigate.");
                }
            } else {
                alert("Login failed: No token received");
            }
        }catch (error) {
            console.error(formData);
            console.error("Login error: ", error.response?.data || error.message);
            const errorMessage = error.response?.data?.Message || error.response?.data?.message || "Invalid credentials.";
            alert(errorMessage);
    } finally {
        setLoading(false);
    }
    };
  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        {/* blur image in background to give a theme */}
        <div className="absolute inset-0 w-full h-full overflow-hidden m-0 p-0">
            <img src={assets.background_img} alt="background" className='w-full h-full object-cover blur-[1.5px]' />
        </div>
        <div className="relative z-10 w-full max-w-lg px-6">
            <div className="bg-black/40 backdrop-blur-[7px] rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                <h3 className="text-2xl font-semibold text-white text-center mb-2">
                    Welcome back to NeuroFleetX 
                </h3>
                <p className='text-white text-center'>
                    Please enter your details to login.
                </p>
                <form onSubmit={handleSubmit} className='space-y-4 text-white mt-6'>
                    <Input
                        value={formData.email}
                        onChange={handleChange("email")}
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        required
                    />
                    <Input
                        value={formData.password}
                        onChange={handleChange("password")}
                        label="Password"
                        placeholder="******"
                        type="password"
                        required
                    />

                    <div className="mb-4">
                        <label className="text-[13px] text-white-800/40 block mb-1">
                        Role
                        </label>
                        <SelectRole value={role} onChange={handleRoleChange}>
                        <option value="" disabled>
                            Select Role
                        </option>
                        <option value="ADMIN">Admin</option>
                        <option value="FLEET_MANAGER">Fleet Manager</option>
                        <option value="DRIVER">Driver</option>
                        <option value="CUSTOMER">Customer</option>
                        </SelectRole>
                    </div>

                    <button
                    disabled={loading}
                        className="btn-primary w-full py-1 bg-blue-800/50 text-sm font-medium flex items-center justify-center gap-2 text-white rounded-lg hover:bg-purple-800/70 transition"
                        type="submit"
                    >
                    {loading ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-sm text-white-500 text-center mt-6 ">
                            Don't have an account? 
                            <Link to="/signup" className="font-medium text-primary underline hover:text-primary-light transition-colors">Singup</Link>
                    </p>
                   
                </form>
            </div>
        </div>

    </div>
  )
}
export default Login;