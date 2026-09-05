import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH APPLICATIONS
  ========================================================= */

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(
          "/applications/my"
        );

        setApplications(
          response.data.applications || []
        );
      } catch (err) {
        console.error(
          "My Applications Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load your applications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);


  /* =========================================================
     STATUS HELPERS
  ========================================================= */

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "application-status-selected";

      case "Shortlisted":
        return "application-status-shortlisted";

      case "Rejected":
        return "application-status-rejected";

      default:
        return "application-status-applied";
    }
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case "Selected":
        return "🎉";

      case "Shortlisted":
        return "⭐";

      case "Rejected":
        return "✕";

      default:
        return "📝";
    }
  };


  /* =========================================================
     STATS
  ========================================================= */

  const totalApplications =
    applications.length;

  const appliedCount =
    applications.filter(
      (application) =>
        application.status === "Applied"
    ).length;

  const shortlistedCount =
    applications.filter(
      (application) =>
        application.status === "Shortlisted"
    ).length;

  const selectedCount =
    applications.filter(
      (application) =>
        application.status === "Selected"
    ).length;

  const rejectedCount =
    applications.filter(
      (application) =>
        application.status === "Rejected"
    ).length;


  /* =========================================================
     DATE FORMAT
  ========================================================= */

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  return (
    <main className="applications-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="applications-hero">

        <div className="container py-5">

          <div className="row align-items-center g-4">

            <div className="col-lg-8">

              <span className="section-label">
                APPLICATION TRACKER
              </span>

              <h1 className="applications-title mt-2">
                My Applications
              </h1>

              <p className="applications-description">
                Track your job applications and
                stay updated on your career journey.
              </p>

            </div>

            <div className="col-lg-4">

              <div className="applications-hero-card">

                <div className="applications-hero-icon">
                  📋
                </div>

                <div>

                  <strong>
                    {loading
                      ? "..."
                      : totalApplications}
                  </strong>

                  <span>
                    Total Applications
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="applications-content">

        <div className="container">


          {/* =================================================
              STATS
          ================================================= */}

          {!loading && !error && (
            <div className="row g-3 mb-5">

              <div className="col-6 col-md-3">

                <div className="application-stat-card">

                  <div className="application-stat-icon">
                    📋
                  </div>

                  <strong>
                    {totalApplications}
                  </strong>

                  <span>
                    Total
                  </span>

                </div>

              </div>


              <div className="col-6 col-md-3">

                <div className="application-stat-card">

                  <div className="application-stat-icon">
                    📝
                  </div>

                  <strong>
                    {appliedCount}
                  </strong>

                  <span>
                    Applied
                  </span>

                </div>

              </div>


              <div className="col-6 col-md-3">

                <div className="application-stat-card">

                  <div className="application-stat-icon">
                    ⭐
                  </div>

                  <strong>
                    {shortlistedCount}
                  </strong>

                  <span>
                    Shortlisted
                  </span>

                </div>

              </div>


              <div className="col-6 col-md-3">

                <div className="application-stat-card">

                  <div className="application-stat-icon">
                    🎉
                  </div>

                  <strong>
                    {selectedCount}
                  </strong>

                  <span>
                    Selected
                  </span>

                </div>

              </div>

            </div>
          )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (
            <div className="applications-state">

              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <h5 className="fw-bold mt-3">
                Loading your applications...
              </h5>

              <p className="text-muted mb-0">
                Please wait while we fetch your
                application history.
              </p>

            </div>
          )}


          {/* =================================================
              ERROR
          ================================================= */}

          {!loading && error && (
            <div className="applications-state">

              <div className="applications-state-icon">
                ⚠️
              </div>

              <h4 className="fw-bold">
                Unable to load applications
              </h4>

              <p className="text-muted">
                {error}
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  window.location.reload()
                }
              >
                Try Again
              </button>

            </div>
          )}


          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            applications.length === 0 && (
              <div className="applications-state">

                <div className="applications-state-icon">
                  📭
                </div>

                <h4 className="fw-bold">
                  No applications yet
                </h4>

                <p className="text-muted">
                  You haven't applied to any jobs yet.
                  Start exploring opportunities.
                </p>

                <Link
                  to="/jobs"
                  className="btn btn-primary"
                >
                  Browse Jobs →
                </Link>

              </div>
            )}


          {/* =================================================
              APPLICATION LIST
          ================================================= */}

          {!loading &&
            !error &&
            applications.length > 0 && (

              <div>

                <div className="d-flex justify-content-between align-items-end mb-4">

                  <div>

                    <span className="section-label">
                      YOUR ACTIVITY
                    </span>

                    <h3 className="fw-bold mt-2 mb-1">
                      Application History
                    </h3>

                    <p className="text-muted mb-0">
                      Review the jobs you've applied
                      for.
                    </p>

                  </div>

                  <span className="applications-count">
                    {applications.length}{" "}
                    {applications.length === 1
                      ? "Application"
                      : "Applications"}
                  </span>

                </div>


                <div className="applications-list">

                  {applications.map(
                    (application) => {

                      const job =
                        application.job;

                      if (!job) {
                        return null;
                      }

                      return (
                        <div
                          className="application-card"
                          key={application._id}
                        >

                          {/* =================================================
                              CARD HEADER
                          ================================================= */}

                          <div className="application-card-header">

                            <div className="d-flex gap-3">

                              <div className="application-company-logo">

                                {job.company
                                  ?.charAt(0)
                                  ?.toUpperCase() ||
                                  "H"}

                              </div>

                              <div>

                                <h5 className="fw-bold mb-1">
                                  {job.title}
                                </h5>

                                <p className="text-primary fw-semibold mb-2">
                                  {job.company}
                                </p>

                                <div className="application-meta">

                                  <span>
                                    📍 {job.location}
                                  </span>

                                  <span>
                                    💼 {job.jobType}
                                  </span>

                                </div>

                              </div>

                            </div>


                            {/* STATUS */}

                            <div
                              className={`application-status ${getStatusClass(
                                application.status
                              )}`}
                            >

                              <span>
                                {getStatusIcon(
                                  application.status
                                )}
                              </span>

                              {application.status}

                            </div>

                          </div>


                          {/* =================================================
                              CARD BODY
                          ================================================= */}

                          <div className="application-card-body">

                            <div className="row g-4">

                              <div className="col-md-4">

                                <div className="application-info">

                                  <span className="application-info-icon">
                                    💰
                                  </span>

                                  <div>

                                    <small>
                                      Salary
                                    </small>

                                    <strong>
                                      {job.salary ||
                                        "Not disclosed"}
                                    </strong>

                                  </div>

                                </div>

                              </div>


                              <div className="col-md-4">

                                <div className="application-info">

                                  <span className="application-info-icon">
                                    🎯
                                  </span>

                                  <div>

                                    <small>
                                      Experience
                                    </small>

                                    <strong>
                                      {job.experience ||
                                        "Not specified"}
                                    </strong>

                                  </div>

                                </div>

                              </div>


                              <div className="col-md-4">

                                <div className="application-info">

                                  <span className="application-info-icon">
                                    📅
                                  </span>

                                  <div>

                                    <small>
                                      Applied On
                                    </small>

                                    <strong>
                                      {formatDate(
                                        application.createdAt
                                      )}
                                    </strong>

                                  </div>

                                </div>

                              </div>

                            </div>


                            {/* COVER LETTER */}

                            {application.coverLetter && (
                              <div className="application-cover-letter mt-4">

                                <div className="d-flex align-items-center gap-2 mb-2">

                                  <span>
                                    📝
                                  </span>

                                  <strong>
                                    Your Cover Letter
                                  </strong>

                                </div>

                                <p>
                                  {application.coverLetter}
                                </p>

                              </div>
                            )}

                          </div>


                          {/* =================================================
                              CARD FOOTER
                          ================================================= */}

                          <div className="application-card-footer">

                            <span className="application-status-message">

                              {application.status ===
                                "Selected" &&
                                "🎉 Congratulations! You have been selected."}

                              {application.status ===
                                "Shortlisted" &&
                                "⭐ Your application has been shortlisted."}

                              {application.status ===
                                "Rejected" &&
                                "This application was not selected."}

                              {application.status ===
                                "Applied" &&
                                "Your application has been submitted successfully."}

                            </span>


                            <Link
                              to={`/jobs/${job._id}`}
                              className="btn btn-outline-primary"
                            >
                              View Job →
                            </Link>

                          </div>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>
            )}

        </div>

      </section>

    </main>
  );
}

export default MyApplications;