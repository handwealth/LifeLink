import { useEffect, useState } from "react";
import { getAllDonors, deleteDonor, updateDonor } from "../api/api";

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");
  const [bloodGroupFilter, setBloodGroupFilter] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await getAllDonors({
        name: search,
        bloodGroup: bloodGroupFilter,
      });
      setDonors(res.data);
    } catch (error) {
      console.log("Error fetching donors:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await deleteDonor(id);
      fetchDonors();
    } catch (error) {
      console.log("Error deleting donor:", error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDonor(editData._id, editData);
      setEditData(null);
      fetchDonors();
    } catch (error) {
      console.log("Error updating donor:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">Admin Dashboard</h1>
      <p className="text-slate-600 mb-8">Manage donor database and actions</p>

      {/* ✅ Search + Filter Row */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-md border mb-6">
        <input
          type="text"
          placeholder="Search donor by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg w-60 outline-blue-700"
        />

        <select
          value={bloodGroupFilter}
          onChange={(e) => setBloodGroupFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg outline-blue-700"
        >
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
            <option key={bg} value={bg}>
              {bg}
            </option>
          ))}
        </select>

        <button
          onClick={fetchDonors}
          className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all shadow-md"
        >
          Filter
        </button>
      </div>

      {/* ✅ Donor Cards */}
      {donors.length === 0 ? (
        <p className="text-center text-slate-600 mt-10">No donors found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((d) => (
            <div
              key={d._id}
              className="bg-white shadow-lg rounded-2xl p-6 border hover:shadow-xl transition-all"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                {d.name}
              </h2>

              <p className="text-sm text-slate-600 mt-1">{d.email}</p>

              <div className="mt-3 space-y-1">
                <p>
                  <span className="font-medium text-slate-700">Blood Group:</span>{" "}
                  {d.bloodGroup}
                </p>
                <p>
                  <span className="font-medium text-slate-700">Contact:</span>{" "}
                  {d.contact}
                </p>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setEditData(d)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(d._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Modal Edit Form */}
      {editData && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] animate-scale-in">
            <h3 className="text-2xl font-semibold text-blue-700 mb-4">
              Edit Donor
            </h3>

            <form onSubmit={handleEditSubmit} className="space-y-3">
              <input
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg outline-blue-700"
                required
              />

              <input
                type="text"
                value={editData.bloodGroup}
                onChange={(e) =>
                  setEditData({ ...editData, bloodGroup: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg outline-blue-700"
                required
              />

              <input
                type="text"
                value={editData.contact}
                onChange={(e) =>
                  setEditData({ ...editData, contact: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg outline-blue-700"
                required
              />

              <div className="flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  onClick={() => setEditData(null)}
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
