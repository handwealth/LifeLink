import { useState } from "react";
import axios from "axios";

function SearchDonor() {
  const [filters, setFilters] = useState({
    organ: "",
    bloodGroup: "",
  });

  const [donors, setDonors] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("http://localhost:5000/api/donors/search", {
        params: {
          organ: filters.organ,
          bloodGroup: filters.bloodGroup,
        },
        headers: {
          Authorization: `Bearer ${token}`},
      });

      setDonors(response.data);
    } catch (error) {
      console.log("❌ Error fetching donors:", error);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-blue-50 to-pink-50">
      
      {/* Title */}
      <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
        🔍 Search Donors
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select
          name="organ"
          onChange={handleChange}
          className="px-4 py-3 rounded-lg border border-gray-300 w-48 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Organ</option>
          <option value="Kidney">Kidney</option>
          <option value="Heart">Heart</option>
          <option value="Liver">Liver</option>
          <option value="Cornea">Cornea</option>
        </select>

        <select
          name="bloodGroup"
          onChange={handleChange}
          className="px-4 py-3 rounded-lg border border-gray-300 w-48 focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option><option value="A-">A-</option>
          <option value="B+">B+</option><option value="B-">B-</option>
          <option value="O+">O+</option><option value="O-">O-</option>
          <option value="AB+">AB+</option><option value="AB-">AB-</option>
        </select>

        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
        >
          Search
        </button>
      </div>

      {/* Donor Cards */}
      {donors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white shadow-xl rounded-xl p-6 border border-gray-200 hover:shadow-2xl transition"
            >
              <h3 className="text-xl font-semibold text-indigo-700">
                {donor.userId?.name}
              </h3>

              <p className="text-gray-600 text-sm">{donor.userId?.email}</p>

              <div className="mt-4 space-y-2">
                <p><strong>Organ:</strong> {donor.organ}</p>
                <p><strong>Blood Group:</strong> {donor.bloodGroup}</p>
                <p><strong>Contact:</strong> {donor.contact}</p>
                <p><strong>Address:</strong> {donor.address}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">🔎 No donors found</p>
      )}
    </div>
  );
}

export default SearchDonor;
