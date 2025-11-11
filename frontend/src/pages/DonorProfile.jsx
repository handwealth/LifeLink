import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DonorProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bloodGroup: "",
    organ: "",
    contact: "",
    address: "",
    availability: true,
  });

  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/donors/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          setProfileExists(true);
          setFormData({
            bloodGroup: res.data.bloodGroup,
            organ: res.data.organ,
            contact: res.data.contact,
            address: res.data.address,
            availability: res.data.availability,
          });
        }
      } catch {
        console.log("No existing donor profile found.");
      }
    };

    fetchDonor();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (profileExists) {
        await axios.put(
          "http://localhost:5000/api/donors/me",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("✅ Donor Profile Updated!");
      } else {
        await axios.post(
          "http://localhost:5000/api/donors/create",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("✅ Donor Profile Created!");
      }

      navigate("/dashboard");
    } catch (err) {
      alert("❌ Failed to save donor profile.");
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure? This will permanently delete your donor profile.")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("http://localhost:5000/api/donors/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("🗑 Profile Deleted.");
      navigate("/dashboard");
    } catch (err) {
      alert("❌ Failed to delete profile.");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="bg-white shadow-xl p-8 rounded-2xl w-full max-w-lg border border-blue-200">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {profileExists ? "Edit Donor Profile" : "Create Donor Profile"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="text"
            name="address"
            placeholder="Address / Location"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
          </select>

          <select
            name="organ"
            value={formData.organ}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Organ to Donate</option>
            <option value="Kidney">Kidney</option>
            <option value="Heart">Heart</option>
            <option value="Liver">Liver</option>
            <option value="Lungs">Lungs</option>
            <option value="Cornea">Cornea</option>
          </select>

          {/* Availability */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="availability"
              checked={formData.availability}
              onChange={handleChange}
              className="h-5 w-5"
            />
            <span className="text-sm text-slate-700">Available for Donation</span>
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold shadow-md"
          >
            {profileExists ? "Update Profile" : "Save Profile"}
          </button>
        </form>

        {profileExists && (
          <button
            onClick={handleDelete}
            className="w-full bg-red-600 hover:bg-red-700 transition text-white mt-4 py-3 rounded-xl font-semibold shadow-md"
          >
            Delete Donor Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default DonorProfile;
