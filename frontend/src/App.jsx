import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import DonorProfile from "./pages/DonorProfile.jsx";
import PrivateRoute from "./store/PrivateRoute.jsx";
import SearchDonor from "./pages/SearchDonor.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";


function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/donor-profile"
        element={
          <PrivateRoute>
            <DonorProfile />
          </PrivateRoute>
        }
      />

      <Route
        path="/search-donor"
        element={
          <PrivateRoute>
            <SearchDonor />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRole="admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />



      {/* Redirect root to login */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
