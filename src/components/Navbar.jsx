import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo1.png";

function Navbar() {
  const navigate = useNavigate();
  const isStudent = localStorage.getItem("studentAuth");
  const isAdmin = localStorage.getItem("adminAuth");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 sticky-top">
      <div className="container">

        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={logo} width="100" className="me-2 " />
          <span className="fw-bold">UNIVERSITY OF AGRICULTURE & <br /> ENVIRONMENTAL SCIENCE UMUAGWO</span>
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/results">Results</Link>
            </li>

            {!isStudent && !isAdmin && (
              <>
                <li className="nav-item ms-2">
                  <Link className="btn btn-success" to="/login">Student Login</Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn btn-outline-light" to="/admin-login">Admin Login</Link>
                </li>
              </>
            )}

            {isStudent && (
              <>
                <li className="nav-item ms-2">
                  <Link className="btn btn-success" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item ms-2">
                  <button className="btn btn-danger" onClick={logout}>Logout</button>
                </li>
              </>
            )}

            {isAdmin && (
              <>
                <li className="nav-item ms-2">
                  <Link className="btn btn-primary" to="/admin-dashboard">Admin Panel</Link>
                </li>
                <li className="nav-item ms-2">
                  <button className="btn btn-danger" onClick={logout}>Logout</button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
