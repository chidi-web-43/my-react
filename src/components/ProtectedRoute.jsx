import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, type }) {
  const isStudent = localStorage.getItem("studentAuth");
  const isAdmin = localStorage.getItem("adminAuth");

  if (type === "student" && !isStudent) return <Navigate to="/login" />;
  if (type === "admin" && !isAdmin) return <Navigate to="/admin-login" />;

  return children;
}

export default ProtectedRoute;
