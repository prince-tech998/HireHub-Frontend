import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Profile() {
  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================
     FETCH PROFILE
  ========================================= */

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await API.get("/users/profile");

        const user =
          response.data.user;

        setProfile(user);
        setName(user.name || "");
      } catch (err) {
        console.error(
          "Profile Fetch Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* =========================================
     UPDATE PROFILE
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setSaving(true);

      const response =
        await API.put(
          "/users/profile",
          {
            name: name.trim(),
          }
        );

      const updatedUser =
        response.data.user;

      setProfile(updatedUser);
      setName(updatedUser.name || "");

      /* Update localStorage */

      const storedUser =
        localStorage.getItem(
          "hirehubUser"
        );

      let localUser = {};

      try {
        localUser = storedUser
          ? JSON.parse(storedUser)
          : {};
      } catch {
        localUser = {};
      }

      const newLocalUser = {
        ...localUser,
        ...updatedUser,
      };

      localStorage.setItem(
        "hirehubUser",
        JSON.stringify(newLocalUser)
      );

      setSuccess(
        "Profile updated successfully! ✅"
      );
    } catch (err) {
      console.error(
        "Profile Update Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="bg-light min-vh-100 py-5">
        <div className="container">

          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              minHeight: "500px",
            }}
          >
            <div className="text-center">

              <div
                className="spinner-border text-primary mb-3"
                role="status"
              ></div>

              <h5 className="fw-bold">
                Loading Profile...
              </h5>

              <p className="text-muted">
                Please wait a moment.
              </p>

            </div>
          </div>

        </div>
      </div>
    );
  }

  /* =========================================
     ERROR WITHOUT PROFILE
  ========================================= */

  if (error && !profile) {
    return (
      <div className="bg-light min-vh-100 py-5">
        <div className="container">

          <div className="alert alert-danger">
            <strong>Error:</strong>{" "}
            {error}
          </div>

          <Link
            to="/dashboard"
            className="btn btn-primary"
          >
            ← Back to Dashboard
          </Link>

        </div>
      </div>
    );
  }

  /* =========================================
     PROFILE INITIAL
  ========================================= */

  const initial =
    profile?.name
      ?.charAt(0)
      ?.toUpperCase() || "H";

  const roleText =
    profile?.role === "recruiter"
      ? "Recruiter"
      : "Job Seeker";

  /* =========================================
     MAIN UI
  ========================================= */

  return (
    <div className="bg-light min-vh-100 py-5">

      <div className="container">

        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="mb-4">

          <Link
            to="/dashboard"
            className="text-decoration-none fw-semibold"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="fw-bold mt-3 mb-2">
            My Profile
          </h1>

          <p className="text-muted mb-0">
            Manage your HireHub account
            information.
          </p>

        </div>


        {/* =====================================
            ALERTS
        ===================================== */}

        {error && (
          <div
            className="alert alert-danger"
            role="alert"
          >
            <strong>Error:</strong>{" "}
            {error}
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


        <div className="row g-4">

          {/* ===================================
              PROFILE CARD
          =================================== */}

          <div className="col-lg-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4 text-center">

                {/* AVATAR */}

                <div
                  className="mx-auto d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #4f46e5, #7c3aed)",
                    fontSize: "45px",
                    boxShadow:
                      "0 15px 35px rgba(79,70,229,0.25)",
                  }}
                >
                  {initial}
                </div>


                {/* NAME */}

                <h3 className="fw-bold mt-4 mb-1">
                  {profile?.name ||
                    "User"}
                </h3>


                {/* EMAIL */}

                <p className="text-muted mb-3">
                  {profile?.email}
                </p>


                {/* ROLE */}

                <span
                  className={`badge rounded-pill px-3 py-2 ${
                    profile?.role ===
                    "recruiter"
                      ? "bg-primary"
                      : "bg-success"
                  }`}
                >
                  {roleText}
                </span>


                <hr className="my-4" />


                {/* ACCOUNT INFO */}

                <div className="text-start">

                  <p className="text-muted small mb-1">
                    ACCOUNT TYPE
                  </p>

                  <p className="fw-semibold mb-3">
                    {roleText}
                  </p>

                  <p className="text-muted small mb-1">
                    EMAIL ADDRESS
                  </p>

                  <p className="fw-semibold mb-0">
                    {profile?.email}
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* ===================================
              EDIT PROFILE
          =================================== */}

          <div className="col-lg-8">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4 p-lg-5">

                <div className="mb-4">

                  <h3 className="fw-bold mb-2">
                    Personal Information
                  </h3>

                  <p className="text-muted mb-0">
                    Update your account
                    information below.
                  </p>

                </div>


                <form
                  onSubmit={handleSubmit}
                >

                  {/* NAME */}

                  <div className="mb-4">

                    <label
                      htmlFor="profileName"
                      className="form-label fw-semibold"
                    >
                      Full Name
                    </label>

                    <input
                      id="profileName"
                      type="text"
                      className="form-control form-control-lg"
                      value={name}
                      onChange={(e) =>
                        setName(
                          e.target.value
                        )
                      }
                      placeholder="Enter your full name"
                    />

                  </div>


                  {/* EMAIL */}

                  <div className="mb-4">

                    <label
                      htmlFor="profileEmail"
                      className="form-label fw-semibold"
                    >
                      Email Address
                    </label>

                    <input
                      id="profileEmail"
                      type="email"
                      className="form-control form-control-lg"
                      value={
                        profile?.email ||
                        ""
                      }
                      disabled
                    />

                    <div className="form-text">
                      Email address cannot be
                      changed from this page.
                    </div>

                  </div>


                  {/* ROLE */}

                  <div className="mb-4">

                    <label
                      htmlFor="profileRole"
                      className="form-label fw-semibold"
                    >
                      Account Role
                    </label>

                    <input
                      id="profileRole"
                      type="text"
                      className="form-control form-control-lg"
                      value={roleText}
                      disabled
                    />

                  </div>


                  {/* BUTTONS */}

                  <div className="d-flex flex-wrap gap-2">

                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>

                          Saving...
                        </>
                      ) : (
                        <>
                          💾 Save Changes
                        </>
                      )}
                    </button>


                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 py-2"
                      onClick={() => {
                        setName(
                          profile?.name ||
                            ""
                        );

                        setError("");
                        setSuccess("");
                      }}
                      disabled={saving}
                    >
                      Cancel
                    </button>

                  </div>

                </form>

              </div>

            </div>


            {/* =================================
                ACCOUNT INFORMATION
            ================================= */}

            <div className="card border-0 shadow-sm mt-4">

              <div className="card-body p-4">

                <h4 className="fw-bold mb-3">
                  🔐 Account Information
                </h4>

                <div className="row g-3">

                  <div className="col-md-6">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block">
                        User ID
                      </small>

                      <span
                        className="fw-semibold"
                        style={{
                          wordBreak:
                            "break-all",
                        }}
                      >
                        {profile?._id ||
                          "Not available"}
                      </span>

                    </div>

                  </div>


                  <div className="col-md-6">

                    <div className="p-3 rounded-3 bg-light">

                      <small className="text-muted d-block">
                        Account Role
                      </small>

                      <span className="fw-semibold">
                        {roleText}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;