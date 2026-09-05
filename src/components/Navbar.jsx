import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("hirehubUser");

      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("User data error:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("hirehubToken");
    localStorage.removeItem("hirehubUser");

    setUser(null);

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container py-2">

        {/* =================================================
            BRAND
        ================================================= */}

        <Link
          to="/"
          className="navbar-brand text-white text-decoration-none"
        >
          Hire<span className="text-primary">Hub</span>
        </Link>

        {/* =================================================
            MOBILE TOGGLE
        ================================================= */}

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#hireHubNavbar"
          aria-controls="hireHubNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <div
          className="collapse navbar-collapse"
          id="hireHubNavbar"
        >

          {/* LEFT MENU */}

          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">

            <li className="nav-item">
              <Link
                to="/"
                className="nav-link px-3"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/jobs"
                className="nav-link px-3"
              >
                Find Jobs
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/companies"
                className="nav-link px-3"
              >
                Companies
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/about"
                className="nav-link px-3"
              >
                About
              </Link>
            </li>

          </ul>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="d-flex align-items-center gap-2 flex-wrap">

            {user ? (

              <>
                {/* SAVED JOBS - JOB SEEKER */}

                {user.role === "jobSeeker" && (
                  <Link
                    to="/saved-jobs"
                    className="btn btn-outline-primary btn-sm px-3"
                  >
                    ♥ Saved
                  </Link>
                )}

                {/* DASHBOARD */}

                <Link
                  to="/dashboard"
                  className="btn btn-outline-primary btn-sm px-3"
                >
                  Dashboard
                </Link>

                {/* PROFILE */}

                <Link
                  to="/profile"
                  className="navbar-user-button text-decoration-none"
                >
                  <span className="navbar-avatar">
                    {user.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </span>

                  <span className="navbar-user-name">
                    {user.name || "User"}
                  </span>
                </Link>

                {/* LOGOUT */}

                <button
                  type="button"
                  className="btn btn-primary btn-sm px-3"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>

            ) : (

              <>
                {/* LOGIN */}

                <Link
                  to="/login"
                  className="btn btn-outline-primary btn-sm px-3"
                >
                  Login
                </Link>

                {/* REGISTER */}

                <Link
                  to="/register"
                  className="btn btn-primary btn-sm px-3"
                >
                  Get Started
                </Link>
              </>

            )}

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;