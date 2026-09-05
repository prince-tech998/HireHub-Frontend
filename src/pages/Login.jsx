import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================
     HANDLE INPUT CHANGE
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================================
     HANDLE LOGIN
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const email = formData.email.trim();
    const password = formData.password;

    /* =========================================
       VALIDATION
    ========================================= */

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      /* =========================================
         LOGIN API
      ========================================= */

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("Login Response:", response.data);

      const token = response.data.token;
      const user = response.data.user;

      /* =========================================
         CHECK RESPONSE
      ========================================= */

      if (!token || !user) {
        setError(
          "Login successful, but user information was not received."
        );
        return;
      }

      /* =========================================
         SAVE AUTH DATA
      ========================================= */

      localStorage.setItem("hirehubToken", token);
      localStorage.setItem("hirehubUser", JSON.stringify(user));

      /* =========================================
         UPDATE NAVBAR
      ========================================= */

      window.dispatchEvent(new Event("hirehubAuthChange"));

      /* =========================================
         SUCCESS
      ========================================= */

      setSuccess(`Welcome back, ${user.name || "User"}!`);

      /* =========================================
         REDIRECT
      ========================================= */

      const redirectPath = location.state?.from || "/dashboard";

      setTimeout(() => {
        navigate(redirectPath, {
          replace: true,
        });
      }, 600);
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response?.status === 401) {
        setError(
          err.response?.data?.message ||
            "Invalid email or password."
        );
      } else if (err.response?.status === 404) {
        setError(
          err.response?.data?.message ||
            "User not found."
        );
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to login. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================
     PAGE UI
  ========================================= */

  return (
    <div className="auth-page">
      <div className="container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-8 col-lg-5">

            {/* =================================
                LOGIN CARD
            ================================= */}

            <div className="auth-card">

              {/* =================================
                  BRAND
              ================================= */}

              <div className="text-center mb-4">

                <Link
                  to="/"
                  className="text-decoration-none d-inline-flex align-items-center gap-3"
                >

                  <span
                    className="d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      background:
                        "linear-gradient(135deg, #2563eb, #60a5fa)",
                      fontSize: "23px",
                      boxShadow:
                        "0 10px 25px rgba(37, 99, 235, 0.25)",
                    }}
                  >
                    H
                  </span>

                  <span
                    className="fw-bold text-white"
                    style={{
                      fontSize: "27px",
                      letterSpacing: "-1px",
                    }}
                  >
                    Hire
                    <span
                      style={{
                        color: "#60a5fa",
                      }}
                    >
                      Hub
                    </span>
                  </span>

                </Link>

                <h1 className="mt-4 mb-2">
                  Welcome Back
                </h1>

                <p className="mb-0">
                  Login to continue to your HireHub account.
                </p>

              </div>

              {/* =================================
                  ERROR
              ================================= */}

              {error && (
                <div
                  className="post-job-alert post-job-alert-error"
                  role="alert"
                >
                  <div className="post-job-alert-icon">
                    !
                  </div>

                  <div>
                    <strong>Login failed</strong>
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* =================================
                  SUCCESS
              ================================= */}

              {success && (
                <div
                  className="post-job-alert post-job-alert-success"
                  role="alert"
                >
                  <div className="post-job-alert-icon">
                    ✓
                  </div>

                  <div>
                    <strong>Login successful</strong>
                    <p>{success}</p>
                  </div>
                </div>
              )}

              {/* =================================
                  LOGIN FORM
              ================================= */}

              <form onSubmit={handleSubmit}>

                {/* EMAIL */}

                <div className="mb-4">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="post-job-input"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    disabled={loading}
                  />

                </div>

                {/* PASSWORD */}

                <div className="mb-4">

                  <label htmlFor="password">
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="post-job-input"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={loading}
                  />

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  className="post-job-submit w-100"
                  disabled={loading}
                  style={{
                    minHeight: "50px",
                  }}
                >
                  {loading ? (
                    <>
                      <span className="post-job-spinner"></span>
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login to HireHub
                      <span>→</span>
                    </>
                  )}
                </button>

              </form>

              {/* =================================
                  DEMO ACCOUNT
              ================================= */}

              <div className="post-job-info-card mt-4">

                <div className="post-job-info-icon">
                  ✓
                </div>

                <div>

                  <strong>
                    Demo Job Seeker Account
                  </strong>

                  <p>
                    <b>Email:</b> prince@test.com
                    <br />
                    <b>Password:</b> Test12345
                  </p>

                </div>

              </div>

              {/* =================================
                  REGISTER
              ================================= */}

              <div className="text-center mt-4">

                <p className="mb-2">
                  Don't have an account?
                </p>

                <Link
                  to="/register"
                  className="fw-bold text-primary text-decoration-none"
                >
                  Create an account →
                </Link>

              </div>

              {/* =================================
                  BACK HOME
              ================================= */}

              <div className="text-center mt-4">

                <Link
                  to="/"
                  className="small text-muted text-decoration-none"
                >
                  ← Back to HireHub
                </Link>

              </div>

            </div>

            {/* =================================
                BOTTOM TEXT
            ================================= */}

            <p className="text-center text-muted small mt-4">
              Find opportunities. Build your future.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;