import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Applicants() {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [filterStatus, setFilterStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  /* =====================================================
     FETCH APPLICANTS
  ===================================================== */

  const fetchApplicants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        "/applications/applicants"
      );

      setApplicants(
        response.data.applications || []
      );
    } catch (err) {
      console.error("Applicants Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load applicants."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplicants();
  }, []);

  /* =====================================================
     UPDATE STATUS
  ===================================================== */

  const updateStatus = async (
    applicationId,
    status
  ) => {
    try {
      setUpdatingId(applicationId);
      setError("");
      setSuccess("");

      await API.put(
        `/applications/${applicationId}/status`,
        {
          status,
        }
      );

      setApplicants((previous) =>
        previous.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
              }
            : application
        )
      );

      setSuccess(
        `Application status changed to ${status}.`
      );

      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      console.error(
        "Status Update Error:",
        err
      );

      setError(
        err.response?.data?.message ||
          "Unable to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  /* =====================================================
     STATUS CLASS
  ===================================================== */

  const getStatusClass = (status) => {
    switch (status) {
      case "Selected":
        return "status-selected";

      case "Shortlisted":
        return "status-shortlisted";

      case "Rejected":
        return "status-rejected";

      default:
        return "status-applied";
    }
  };

  /* =====================================================
     STATUS ICON
  ===================================================== */

  const getStatusIcon = (status) => {
    switch (status) {
      case "Selected":
        return "✓";

      case "Shortlisted":
        return "★";

      case "Rejected":
        return "✕";

      default:
        return "●";
    }
  };

  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     FILTER APPLICANTS
  ===================================================== */

  const filteredApplicants = useMemo(() => {
    const searchText =
      search.trim().toLowerCase();

    return applicants.filter((application) => {
      const applicant =
        application.applicant || {};

      const job =
        application.job || {};

      const matchesSearch =
        !searchText ||
        applicant.name
          ?.toLowerCase()
          .includes(searchText) ||
        applicant.email
          ?.toLowerCase()
          .includes(searchText) ||
        job.title
          ?.toLowerCase()
          .includes(searchText) ||
        job.company
          ?.toLowerCase()
          .includes(searchText);

      const matchesStatus =
        filterStatus === "All" ||
        application.status === filterStatus;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [
    applicants,
    search,
    filterStatus,
  ]);

  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalApplicants =
    applicants.length;

  const appliedCount =
    applicants.filter(
      (application) =>
        application.status === "Applied"
    ).length;

  const shortlistedCount =
    applicants.filter(
      (application) =>
        application.status ===
        "Shortlisted"
    ).length;

  const selectedCount =
    applicants.filter(
      (application) =>
        application.status === "Selected"
    ).length;

  const rejectedCount =
    applicants.filter(
      (application) =>
        application.status === "Rejected"
    ).length;

  /* =====================================================
     CLEAR FILTERS
  ===================================================== */

  const clearFilters = () => {
    setSearch("");
    setFilterStatus("All");
  };

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="loading-container">
        <div className="text-center">
          <div className="loading-spinner"></div>

          <p className="text-muted mt-3 mb-0">
            Loading applicants...
          </p>
        </div>
      </div>
    );
  }

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <div className="applications-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="dashboard-hero">

        <div className="container">

          <div className="row align-items-center g-4">

            <div className="col-lg-8">

              <span className="section-label">
                Recruiter Panel
              </span>

              <h1 className="mt-2 mb-3">
                Manage Applicants
              </h1>

              <p className="mb-0">
                Review candidates, evaluate
                applications and make smarter
                hiring decisions.
              </p>

            </div>

            <div className="col-lg-4 text-lg-end">

              <Link
                to="/post-job"
                className="btn btn-primary px-4 py-2"
              >
                + Post New Job
              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          ALERTS
      ================================================= */}

      <div className="container">

        {error && (
          <div
            className="alert alert-danger mt-4"
            role="alert"
          >
            <strong>Error:</strong>{" "}
            {error}
          </div>
        )}

        {success && (
          <div
            className="alert alert-success mt-4"
            role="alert"
          >
            ✓ {success}
          </div>
        )}

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="py-4">

        <div className="container">

          <div className="row g-3">

            {/* TOTAL */}

            <div className="col-6 col-lg-3">

              <div className="dashboard-stat">

                <div className="dashboard-stat-icon">
                  👥
                </div>

                <h3>
                  {totalApplicants}
                </h3>

                <p>
                  Total Applicants
                </p>

              </div>

            </div>


            {/* APPLIED */}

            <div className="col-6 col-lg-3">

              <div className="dashboard-stat">

                <div className="dashboard-stat-icon">
                  📩
                </div>

                <h3>
                  {appliedCount}
                </h3>

                <p>
                  Applied
                </p>

              </div>

            </div>


            {/* SHORTLISTED */}

            <div className="col-6 col-lg-3">

              <div className="dashboard-stat">

                <div className="dashboard-stat-icon">
                  ⭐
                </div>

                <h3>
                  {shortlistedCount}
                </h3>

                <p>
                  Shortlisted
                </p>

              </div>

            </div>


            {/* SELECTED */}

            <div className="col-6 col-lg-3">

              <div className="dashboard-stat">

                <div className="dashboard-stat-icon">
                  ✓
                </div>

                <h3>
                  {selectedCount}
                </h3>

                <p>
                  Selected
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          FILTERS
      ================================================= */}

      <section className="pb-4">

        <div className="container">

          <div className="jobs-filter-card">

            <div className="row g-3 align-items-end">

              {/* SEARCH */}

              <div className="col-lg-7">

                <label>
                  Search Applicants
                </label>

                <div className="post-job-input-wrapper">

                  <span>
                    🔍
                  </span>

                  <input
                    type="text"
                    className="post-job-input"
                    placeholder="Search candidate, email, job or company..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* STATUS */}

              <div className="col-lg-3">

                <label>
                  Application Status
                </label>

                <select
                  className="post-job-input post-job-select"
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value
                    )
                  }
                >

                  <option value="All">
                    All Applicants
                  </option>

                  <option value="Applied">
                    Applied
                  </option>

                  <option value="Shortlisted">
                    Shortlisted
                  </option>

                  <option value="Selected">
                    Selected
                  </option>

                  <option value="Rejected">
                    Rejected
                  </option>

                </select>

              </div>


              {/* CLEAR */}

              <div className="col-lg-2">

                <button
                  type="button"
                  className="btn btn-outline-primary w-100"
                  onClick={clearFilters}
                >
                  Clear Filters
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          CANDIDATES HEADER
      ================================================= */}

      <section className="pb-3">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

            <div>

              <h3 className="dashboard-section-title mb-1">
                Candidates
              </h3>

              <p className="text-muted mb-0">
                Showing{" "}
                <strong className="text-light">
                  {filteredApplicants.length}
                </strong>{" "}
                of{" "}
                <strong className="text-light">
                  {totalApplicants}
                </strong>{" "}
                applicants
              </p>

            </div>

            <div className="d-flex gap-2 flex-wrap">

              <span className="application-status status-selected">
                ✓ Selected: {selectedCount}
              </span>

              <span className="application-status status-rejected">
                ✕ Rejected: {rejectedCount}
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          APPLICANTS LIST
      ================================================= */}

      <section className="pb-5">

        <div className="container">

          {filteredApplicants.length === 0 ? (

            /* EMPTY STATE */

            <div className="jobs-empty-state">

              <div
                style={{
                  fontSize: "55px",
                  marginBottom: "15px",
                }}
              >
                👥
              </div>

              <h4 className="fw-bold text-light">
                No applicants found
              </h4>

              <p className="text-muted mb-4">
                No candidates match your
                current search or status filter.
              </p>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={clearFilters}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="row g-4">

              {filteredApplicants.map(
                (application) => {

                  const applicant =
                    application.applicant || {};

                  const job =
                    application.job || {};

                  const isUpdating =
                    updatingId ===
                    application._id;

                  const applicantInitial =
                    applicant.name
                      ?.charAt(0)
                      ?.toUpperCase() ||
                    "U";

                  return (

                    <div
                      className="col-lg-6"
                      key={application._id}
                    >

                      <div className="application-card h-100">

                        {/* =================================
                            CANDIDATE HEADER
                        ================================= */}

                        <div className="d-flex justify-content-between align-items-start gap-3 mb-4">

                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="profile-avatar"
                              style={{
                                width: "58px",
                                height: "58px",
                                fontSize: "21px",
                              }}
                            >
                              {applicantInitial}
                            </div>

                            <div>

                              <h5 className="fw-bold text-light mb-1">

                                {applicant.name ||
                                  "Unknown Candidate"}

                              </h5>

                              <p className="text-muted small mb-0">

                                {applicant.email ||
                                  "No email available"}

                              </p>

                            </div>

                          </div>


                          {/* STATUS */}

                          <span
                            className={`application-status ${getStatusClass(
                              application.status
                            )}`}
                          >

                            {getStatusIcon(
                              application.status
                            )}{" "}

                            {application.status}

                          </span>

                        </div>


                        {/* =================================
                            JOB INFORMATION
                        ================================= */}

                        <div className="dashboard-panel mb-3">

                          <p className="text-muted small mb-1">
                            Applied For
                          </p>

                          <h5 className="fw-bold text-light mb-1">

                            {job.title ||
                              "Job"}

                          </h5>

                          <p className="text-primary mb-1">

                            {job.company ||
                              "Company"}

                          </p>

                          <div className="job-meta">

                            <span className="job-meta-item">
                              📍{" "}
                              {job.location ||
                                "Location unavailable"}
                            </span>

                            {job.jobType && (
                              <span className="job-meta-item">
                                💼{" "}
                                {job.jobType}
                              </span>
                            )}

                            {job.experience && (
                              <span className="job-meta-item">
                                🎯{" "}
                                {job.experience}
                              </span>
                            )}

                          </div>

                        </div>


                        {/* =================================
                            APPLICATION DATE
                        ================================= */}

                        <div className="d-flex align-items-center gap-2 mb-4">

                          <span
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            📅
                          </span>

                          <span className="text-muted small">

                            Applied on{" "}

                            <strong className="text-light">
                              {formatDate(
                                application.createdAt
                              )}
                            </strong>

                          </span>

                        </div>


                        {/* =================================
                            COVER LETTER
                        ================================= */}

                        <div className="mb-4">

                          <div className="d-flex justify-content-between align-items-center mb-2">

                            <h6 className="fw-bold text-light mb-0">
                              Cover Letter
                            </h6>

                            <span className="text-muted small">
                              Candidate Message
                            </span>

                          </div>

                          <div
                            style={{
                              background:
                                "rgba(2, 6, 23, 0.45)",
                              border:
                                "1px solid rgba(148, 163, 184, 0.08)",
                              borderRadius:
                                "14px",
                              padding:
                                "15px",
                            }}
                          >

                            <p
                              className="text-muted small mb-0"
                              style={{
                                lineHeight:
                                  "1.75",
                                whiteSpace:
                                  "pre-line",
                              }}
                            >

                              {application.coverLetter ||
                                "No cover letter provided."}

                            </p>

                          </div>

                        </div>


                        {/* =================================
                            STATUS ACTIONS
                        ================================= */}

                        <div>

                          <div className="d-flex justify-content-between align-items-center mb-2">

                            <p className="small fw-semibold text-muted mb-0">
                              Update Application Status
                            </p>

                            {isUpdating && (
                              <span className="small text-primary">
                                Updating...
                              </span>
                            )}

                          </div>


                          <div className="d-flex flex-wrap gap-2">

                            {/* APPLIED */}

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-warning"
                              disabled={
                                isUpdating
                              }
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Applied"
                                )
                              }
                            >
                              Applied
                            </button>


                            {/* SHORTLIST */}

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              disabled={
                                isUpdating
                              }
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Shortlisted"
                                )
                              }
                            >
                              Shortlist
                            </button>


                            {/* SELECT */}

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-success"
                              disabled={
                                isUpdating
                              }
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Selected"
                                )
                              }
                            >
                              ✓ Select
                            </button>


                            {/* REJECT */}

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger"
                              disabled={
                                isUpdating
                              }
                              onClick={() =>
                                updateStatus(
                                  application._id,
                                  "Rejected"
                                )
                              }
                            >
                              ✕ Reject
                            </button>


                            {/* VIEW JOB */}

                            {job._id && (
                              <Link
                                to={`/jobs/${job._id}`}
                                className="btn btn-sm btn-outline-secondary"
                              >
                                View Job
                              </Link>
                            )}

                          </div>

                        </div>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          RECRUITER TIP
      ================================================= */}

      <section className="pb-5">

        <div className="container">

          <div className="dashboard-panel">

            <div className="d-flex gap-3 align-items-start">

              <div
                style={{
                  width: "45px",
                  height: "45px",
                  borderRadius: "13px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "rgba(245, 158, 11, 0.10)",
                  flexShrink: 0,
                  fontSize: "21px",
                }}
              >
                💡
              </div>

              <div>

                <h5 className="fw-bold text-light mb-2">
                  Hiring Tip
                </h5>

                <p className="text-muted mb-0">
                  Review candidate profiles carefully,
                  shortlist strong applicants and keep
                  application statuses updated so
                  candidates always know where they
                  stand in the hiring process.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Applicants;