import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import Dashboard from "./pages/Dashboard";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute type="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* RESULTS */}
        <Route path="/results" element={<Results />} />

        {/* STUDENT DASHBOARD */}
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

        {/* VOTING PAGE */}
        <Route
          path="/vote"
          element={
            <ProtectedRoute>
              <Vote />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
