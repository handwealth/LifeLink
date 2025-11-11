import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-10 border border-blue-200 text-center">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-blue-700 mb-3">LifeLink 🩸</h1>
        <p className="text-slate-600 mb-6">Connecting Donors With Those in Need</p>

        {/* User greeting */}
        {user ? (
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Hello, <span className="text-blue-700">{user.name}</span> 👋
          </h2>
        ) : (
          <h2 className="text-xl text-slate-600">Loading user data...</h2>
        )}

        {/* If user is a donor but profile is incomplete */}
        {user?.role === "donor" && !user.organ && (
          <button
            onClick={() => navigate("/donor-profile")}
            className="w-full py-3 bg-blue-700 text-white rounded-xl mb-4 hover:bg-blue-800 transition shadow-md"
          >
            Complete Donor Profile
          </button>
        )}

        {/* If user is requester, offer switch to donor */}
        {user?.role === "requester" && (
          <button
            onClick={() => navigate("/donor-profile")}
            className="w-full py-3 bg-green-600 text-white rounded-xl mb-4 hover:bg-green-700 transition shadow-md"
          >
            Become a Donor
          </button>
        )}

        {/* Search donors */}
        <button
          onClick={() => navigate("/search-donor")}
          className="w-full py-3 bg-blue-500 text-white rounded-xl mb-4 hover:bg-blue-600 transition shadow-md"
        >
          Search Donors
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
