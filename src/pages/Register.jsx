import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobSeeker",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = formData.name.trim();
    const email = formData.email.trim();

    if (!name || !email || !formData.password) {
      setError("Please fill all required fields.");
      return;
    }

    if (name.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", {
        name,
        email,
        password: formData.password,
        role: formData.role,
      });

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("Register Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center py-5 bg-light">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-12 col-md-9 col-lg-6">

            <div className="card border-0 shadow-lg rounded-4 overflow-hidden">

              {/* HEADER */}

              <div
                className="text-white text-center p-4"
                style={{
                  background:
                    "linear-gradient(135deg, #0d6efd, #6610f2)",
                }}
              >
                <div
                  className="mx-auto mb-3 rounded-3 d-flex align-items-center justify-content-center bg-white text-primary fw-bold"
                  style={{
                    width: "58px",
                    height: "58px",
                    fontSize: "25px",
                  }}
                >
                  H
                </div>

                <h2 className="fw-bold mb-1">
                  Create Your Account
                </h2>

                <p className="mb-0 opacity-75">
                  Join HireHub and discover new opportunities
                </p>
              </div>

              {/* FORM */}

              <div className="card-body p-4 p-md-5">

                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    <strong>Error:</strong> {error}
                  </div>
                )}

                {success && (
                  <div
                    className="alert alert-success"
                    role="alert"
                  >
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* NAME */}

                  <div className="mb-3">
                    <label
                      htmlFor="name"
                      className="form-label fw-semibold"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      className="form-control form-control-lg"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      disabled={loading}
                    />
                  </div>

                  {/* EMAIL */}

                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label fw-semibold"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      disabled={loading}
                    />
                  </div>

                  {/* PASSWORD */}

                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>

                    <input
                      id="password"
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      disabled={loading}
                    />

                    <small className="text-muted">
                      Minimum 6 characters
                    </small>
                  </div>

                  {/* ROLE */}

                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      I want to
                    </label>

                    <div className="row g-3">

                      {/* JOB SEEKER */}

                      <div className="col-md-6">
                        <input
                          type="radio"
                          className="btn-check"
                          name="role"
                          id="jobSeeker"
                          value="jobSeeker"
                          checked={
                            formData.role === "jobSeeker"
                          }
                          onChange={handleChange}
                          disabled={loading}
                        />

                        <label
                          htmlFor="jobSeeker"
                          className="btn btn-outline-primary w-100 p-3"
                        >
                          <div className="fs-3 mb-1">
                            👨‍💻
                          </div>

                          <strong>Find a Job</strong>

                          <small className="d-block mt-1">
                            I'm looking for opportunities
                          </small>
                        </label>
                      </div>

                      {/* RECRUITER */}

                      <div className="col-md-6">
                        <input
                          type="radio"
                          className="btn-check"
                          name="role"
                          id="recruiter"
                          value="recruiter"
                          checked={
                            formData.role === "recruiter"
                          }
                          onChange={handleChange}
                          disabled={loading}
                        />

                        <label
                          htmlFor="recruiter"
                          className="btn btn-outline-primary w-100 p-3"
                        >
                          <div className="fs-3 mb-1">
                            🏢
                          </div>

                          <strong>Hire Talent</strong>

                          <small className="d-block mt-1">
                            I'm looking for candidates
                          </small>
                        </label>
                      </div>

                    </div>
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        ></span>

                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                </form>

                {/* LOGIN */}

                <div className="text-center mt-4">
                  <p className="text-muted mb-1">
                    Already have an account?
                  </p>

                  <Link
                    to="/login"
                    className="fw-bold text-primary text-decoration-none"
                  >
                    Login to HireHub
                  </Link>
                </div>

              </div>
            </div>

            {/* BACK HOME */}

            <div className="text-center mt-3">
              <Link
                to="/"
                className="text-decoration-none text-muted"
              >
                ← Back to HireHub
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;