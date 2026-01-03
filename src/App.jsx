import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vote from "./pages/Vote";
import Results from "./pages/Results";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import UploadStudent from "./admin/UploadStudent";
import ManageCandidates from "./admin/ManageCandidates";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/results" element={<Results />} />

        {/* ================= STUDENT ================= */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute type="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vote"
          element={
            <ProtectedRoute type="student">
              <Vote />
            </ProtectedRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/upload-student"
          element={
            <AdminRoute>
              <UploadStudent />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/manage-candidates"
          element={
            <AdminRoute>
              <ManageCandidates />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
