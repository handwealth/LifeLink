import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "donor",
    bloodGroup: "",
    contact: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      alert("Registration Successful ✅");
      navigate("/login");
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration Failed ❌ Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] to-[#fce7f3] px-4">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl w-full max-w-4xl flex overflow-hidden">

        {/* Left Side Image */}
        <div className="hidden md:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://ih1.redbubble.net/image.2785783181.9775/flat,750x,075,f-pad,750x1000,f8f8f8.jpg')",
          }}
        />

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold text-[#2563eb] text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563eb] outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563eb] outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563eb] outline-none"
            />

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563eb] outline-none"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option> <option value="A-">A-</option>
              <option value="B+">B+</option> <option value="B-">B-</option>
              <option value="O+">O+</option> <option value="O-">O-</option>
              <option value="AB+">AB+</option> <option value="AB-">AB-</option>
            </select>

            <input
              type="text"
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563eb] outline-none"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#2563eb] outline-none"
            />

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-[#1e4fcf] text-white py-3 rounded-lg font-semibold transition-all"
            >
              Register
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-[#2563eb] cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
