import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [saved, setSaved] = useState(false);

  const [showApplyModal, setShowApplyModal] = useState(false);

  const [coverLetter, setCoverLetter] = useState("");

  const [applying, setApplying] = useState(false);
  const [applyMessage, setApplyMessage] = useState("");
  const [applyError, setApplyError] = useState("");

  const [user, setUser] = useState(null);

  /* =========================================================
     LOAD USER
  ========================================================= */

  useEffect(() => {
    const storedUser = localStorage.getItem("hirehubUser");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("User data error:", error);
        setUser(null);
      }
    }
  }, []);

  /* =========================================================
     FETCH JOB
  ========================================================= */

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/jobs/${id}`);

        setJob(response.data.job);
      } catch (err) {
        console.error("Job Details Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  /* =========================================================
     CHECK SAVED JOB
  ========================================================= */

  useEffect(() => {
    try {
      const savedJobs = JSON.parse(
        localStorage.getItem("hirehubSavedJobs") || "[]"
      );

      setSaved(savedJobs.includes(id));
    } catch (error) {
      console.error("Saved Jobs Error:", error);
      setSaved(false);
    }
  }, [id]);

  /* =========================================================
     SAVE / UNSAVE JOB
  ========================================================= */

  const toggleSave = () => {
    try {
      const savedJobs = JSON.parse(
        localStorage.getItem("hirehubSavedJobs") || "[]"
      );

      let updatedJobs;

      if (savedJobs.includes(id)) {
        updatedJobs = savedJobs.filter(
          (jobId) => jobId !== id
        );
      } else {
        updatedJobs = [...savedJobs, id];
      }

      localStorage.setItem(
        "hirehubSavedJobs",
        JSON.stringify(updatedJobs)
      );

      setSaved(updatedJobs.includes(id));
    } catch (error) {
      console.error("Save Job Error:", error);
    }
  };

  /* =========================================================
     OPEN APPLY MODAL
  ========================================================= */

  const openApplyModal = () => {
    setApplyError("");
    setApplyMessage("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "jobSeeker") {
      setApplyError(
        "Only job seekers can apply for jobs."
      );
      return;
    }

    setShowApplyModal(true);
  };

  /* =========================================================
     APPLY FOR JOB
  ========================================================= */

  const handleApply = async (e) => {
    e.preventDefault();

    setApplyError("");
    setApplyMessage("");

    const token = localStorage.getItem("hirehubToken");

    if (!token) {
      setShowApplyModal(false);
      navigate("/login");
      return;
    }

    if (!user) {
      setApplyError(
        "Please login before applying."
      );
      return;
    }

    if (user.role !== "jobSeeker") {
      setApplyError(
        "Only job seekers can apply for jobs."
      );
      return;
    }

    if (!id) {
      setApplyError("Job ID is required.");
      return;
    }

    if (!coverLetter.trim()) {
      setApplyError(
        "Please enter a cover letter."
      );
      return;
    }

    try {
      setApplying(true);

      /*
        IMPORTANT:
        Backend expects jobId
      */

      const response = await API.post(
        "/applications",
        {
          jobId: id,
          coverLetter: coverLetter.trim(),
        }
      );

      setApplyMessage(
        response.data.message ||
          "Application submitted successfully."
      );

      setCoverLetter("");
    } catch (err) {
      console.error(
        "Application Error:",
        err
      );

      setApplyError(
        err.response?.data?.message ||
          "Unable to submit application."
      );
    } finally {
      setApplying(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="job-details-page">
        <div className="container py-5">
          <div className="job-details-state">
            <div
              className="spinner-border text-primary"
              role="status"
            ></div>

            <h5 className="fw-bold mt-3">
              Loading job details...
            </h5>

            <p className="text-muted mb-0">
              Please wait.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     ERROR / JOB NOT FOUND
  ========================================================= */

  if (error || !job) {
    return (
      <main className="job-details-page">
        <div className="container py-5">
          <div className="job-details-state text-center">
            <div className="job-state-large-icon">
              ⚠️
            </div>

            <h3 className="fw-bold">
              Job not found
            </h3>

            <p className="text-muted">
              {error ||
                "This job may have been removed."}
            </p>

            <Link
              to="/jobs"
              className="btn btn-primary"
            >
              ← Back to Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <main className="job-details-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="job-details-hero">
        <div className="container py-5">

          <Link
            to="/jobs"
            className="job-back-link"
          >
            ← Back to Jobs
          </Link>

          <div className="job-details-header mt-4">

            <div className="job-details-company-logo">
              {job.company
                ?.charAt(0)
                ?.toUpperCase() || "H"}
            </div>

            <div className="flex-grow-1">

              <div className="d-flex flex-wrap gap-2 mb-2">

                <span className="job-type-badge">
                  {job.jobType}
                </span>

                <span className="job-type-badge">
                  {job.experience ||
                    "Experience flexible"}
                </span>

              </div>

              <h1 className="job-details-title">
                {job.title}
              </h1>

              <p className="job-details-company">
                {job.company}
              </p>

              <div className="job-details-meta">

                <span>
                  📍 {job.location}
                </span>

                <span>
                  💰{" "}
                  {job.salary ||
                    "Salary not disclosed"}
                </span>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="job-details-content">

        <div className="container">

          <div className="row g-4">

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div className="col-lg-8">

              {/* DESCRIPTION */}

              <div className="job-details-card">

                <h4 className="job-details-section-title">
                  Job Description
                </h4>

                <div className="job-description-full">

                  {job.description
                    ?.split("\n")
                    .map(
                      (paragraph, index) => (
                        <p key={index}>
                          {paragraph}
                        </p>
                      )
                    )}

                </div>

              </div>

              {/* SKILLS */}

              <div className="job-details-card mt-4">

                <h4 className="job-details-section-title">
                  Skills & Requirements
                </h4>

                <div className="job-details-skills">

                  {(job.skills || []).map(
                    (skill, index) => (
                      <span
                        className="skill-badge"
                        key={`${skill}-${index}`}
                      >
                        {skill}
                      </span>
                    )
                  )}

                </div>

              </div>

              {/* JOB INFORMATION */}

              <div className="job-details-card mt-4">

                <h4 className="job-details-section-title">
                  Job Information
                </h4>

                <div className="row g-4">

                  <div className="col-md-6">

                    <div className="job-info-item">

                      <span className="job-info-icon">
                        💼
                      </span>

                      <div>
                        <small>
                          Job Type
                        </small>

                        <strong>
                          {job.jobType}
                        </strong>
                      </div>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="job-info-item">

                      <span className="job-info-icon">
                        📍
                      </span>

                      <div>
                        <small>
                          Location
                        </small>

                        <strong>
                          {job.location}
                        </strong>
                      </div>

                    </div>

                  </div>

                  <div className="col-md-6">

                    <div className="job-info-item">

                      <span className="job-info-icon">
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

                  <div className="col-md-6">

                    <div className="job-info-item">

                      <span className="job-info-icon">
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

                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT SIDEBAR
            ================================================= */}

            <div className="col-lg-4">

              {/* APPLY CARD */}

              <div className="job-apply-card">

                <h4 className="fw-bold mb-2">
                  Interested in this role?
                </h4>

                <p className="text-muted">
                  Take the next step toward
                  your career goals.
                </p>

                {/* APPLY BUTTON */}

                {user?.role === "jobSeeker" ||
                !user ? (

                  <button
                    type="button"
                    className="btn btn-primary w-100 btn-lg"
                    onClick={openApplyModal}
                  >
                    Apply Now →
                  </button>

                ) : (

                  <div className="alert alert-secondary mb-0">
                    Recruiters cannot apply
                    to jobs.
                  </div>

                )}

                {/* SAVE BUTTON */}

                <button
                  type="button"
                  className={`btn w-100 mt-3 ${
                    saved
                      ? "btn-primary"
                      : "btn-outline-primary"
                  }`}
                  onClick={toggleSave}
                >
                  {saved
                    ? "♥ Saved Job"
                    : "♡ Save Job"}
                </button>

                {/* LOGIN INFO */}

                {!user && (
                  <small className="d-block text-muted text-center mt-3">
                    Login is required to apply.
                  </small>
                )}

              </div>

              {/* COMPANY CARD */}

              <div className="job-company-card mt-4">

                <div className="job-company-card-logo">
                  {job.company
                    ?.charAt(0)
                    ?.toUpperCase() || "H"}
                </div>

                <h5 className="fw-bold mt-3 mb-1">
                  {job.company}
                </h5>

                <p className="text-muted small">
                  Hiring through HireHub
                </p>

                <Link
                  to={`/companies/${encodeURIComponent(
                    job.company
                  )}`}
                  className="btn btn-outline-primary w-100"
                >
                  View Company →
                </Link>

              </div>

              {/* SAFETY CARD */}

              <div className="job-tip-card mt-4">

                <div className="job-tip-icon">
                  🛡️
                </div>

                <div>

                  <h6 className="fw-bold">
                    Stay safe
                  </h6>

                  <p className="mb-0">
                    Never share passwords,
                    OTPs or banking details
                    during recruitment.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          APPLY MODAL
      ===================================================== */}

      {showApplyModal && (

        <div className="hirehub-modal-overlay">

          <div className="hirehub-modal">

            {/* MODAL HEADER */}

            <div className="d-flex justify-content-between align-items-start gap-3">

              <div>

                <span className="section-label">
                  APPLICATION
                </span>

                <h3 className="fw-bold mt-2 mb-1">
                  Apply for this job
                </h3>

                <p className="text-muted mb-0">
                  {job.title} · {job.company}
                </p>

              </div>

              <button
                type="button"
                className="modal-close-button"
                onClick={() =>
                  setShowApplyModal(false)
                }
              >
                ×
              </button>

            </div>

            {/* SUCCESS MESSAGE */}

            {applyMessage && (

              <div className="alert alert-success mt-4">

                <strong>
                  Application submitted!
                </strong>

                <div className="mt-1">
                  {applyMessage}
                </div>

              </div>

            )}

            {/* ERROR MESSAGE */}

            {applyError && (

              <div className="alert alert-danger mt-4">
                {applyError}
              </div>

            )}

            {/* FORM */}

            {!applyMessage && (

              <form
                onSubmit={handleApply}
                className="mt-4"
              >

                <label className="form-label fw-semibold">
                  Cover Letter
                </label>

                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Tell the recruiter why you are a good fit for this position..."
                  value={coverLetter}
                  onChange={(e) =>
                    setCoverLetter(
                      e.target.value
                    )
                  }
                ></textarea>

                <div className="d-flex justify-content-end gap-2 mt-4">

                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setShowApplyModal(false);
                      setApplyError("");
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={applying}
                  >
                    {applying
                      ? "Submitting..."
                      : "Submit Application"}
                  </button>

                </div>

              </form>

            )}

            {/* SUCCESS ACTIONS */}

            {applyMessage && (

              <div className="d-flex justify-content-end gap-2 mt-4">

                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() =>
                    navigate("/applications")
                  }
                >
                  My Applications
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    setShowApplyModal(false);
                    setApplyMessage("");
                  }}
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>

      )}

    </main>
  );
}

export default JobDetails;