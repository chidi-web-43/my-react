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

        {/* LOGO + SCHOOL NAME */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={logo}
            alt="UAES Logo"
            width="70"
            className="me-2"
          />
          <span className="fw-bold d-none d-md-block">
            UNIVERSITY OF AGRICULTURE & <br />
            ENVIRONMENTAL SCIENCES <br />
            UMUAGWO
          </span>

          <span className="fw-bold d-block d-md-none">
            UAES UMUAGWO
          </span>

        </Link>

        {/* TOGGLER BUTTON (THIS WAS MISSING) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* COLLAPSIBLE MENU */}
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/results">Results</Link>
            </li>

            {/* NOT LOGGED IN */}
            {!isStudent && !isAdmin && (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <Link className="btn btn-success w-100" to="/login">
                    Student Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <Link className="btn btn-outline-light w-100" to="/admin-login">
                    Admin Login
                  </Link>
                </li>
              </>
            )}

            {/* STUDENT */}
            {isStudent && (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <Link className="btn btn-success w-100" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button className="btn btn-danger w-100" onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* ADMIN */}
            {isAdmin && (
              <>
                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                  <Link className="btn btn-primary w-100" to="/admin-dashboard">
                    Admin Panel
                  </Link>
                </li>
                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                  <button className="btn btn-danger w-100" onClick={logout}>
                    Logout
                  </button>
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
