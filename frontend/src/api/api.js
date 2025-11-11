import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Attach token to every protected request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= USER AUTH ================= */
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);

/* ================= DONOR / USER ACTIONS ================= */
export const getDonors = (filters = {}) =>
  API.get("/donor/search", { params: filters });

export const updateDonor = (id, formData) =>
  API.put(`/donors/${id}`, formData);

/* ================= ADMIN ACTIONS ================= */
// ✅ Get all donors (Admin dashboard)
export const getAllDonors = () => API.get("/admin/donors");

// ✅ Delete donor (Admin only)
export const deleteDonor = (id) => API.delete(`/admin/donor/${id}`);

// ✅ Edit donor (Admin only)
export const editDonor = (id, updatedFields) =>
  API.put(`/admin/donor/${id}`, updatedFields);
