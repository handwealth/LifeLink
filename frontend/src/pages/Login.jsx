import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#dbeafe] to-[#fce7f3]">
      <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-8 w-[360px]">

        <h2 className="text-3xl font-bold text-center text-[#2563eb] mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />

          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />

          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-[#1e4fcf] text-white py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-[#2563eb] cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
