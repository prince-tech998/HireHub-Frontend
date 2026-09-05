import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     FETCH SAVED JOBS
  ========================================================= */

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const savedIds = JSON.parse(
          localStorage.getItem("hirehubSavedJobs") || "[]"
        );

        if (savedIds.length === 0) {
          setSavedJobs([]);
          return;
        }

        const response = await API.get("/jobs");

        const allJobs = response.data.jobs || [];

        const filteredJobs = allJobs.filter((job) =>
          savedIds.includes(job._id)
        );

        setSavedJobs(filteredJobs);
      } catch (err) {
        console.error("Saved Jobs Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load saved jobs."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);


  /* =========================================================
     REMOVE SAVED JOB
  ========================================================= */

  const removeSavedJob = (jobId) => {
    try {
      const savedIds = JSON.parse(
        localStorage.getItem("hirehubSavedJobs") || "[]"
      );

      const updatedIds = savedIds.filter(
        (id) => id !== jobId
      );

      localStorage.setItem(
        "hirehubSavedJobs",
        JSON.stringify(updatedIds)
      );

      setSavedJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job._id !== jobId
        )
      );
    } catch (err) {
      console.error(
        "Remove Saved Job Error:",
        err
      );
    }
  };


  /* =========================================================
     JOB CARD
  ========================================================= */

  const SavedJobCard = ({ job }) => {
    return (
      <div className="saved-job-card">

        <div className="saved-job-main">

          {/* COMPANY LOGO */}

          <div className="saved-job-logo">
            {job.company
              ?.charAt(0)
              ?.toUpperCase() || "H"}
          </div>


          {/* JOB INFO */}

          <div className="saved-job-info">

            <div className="d-flex flex-wrap align-items-start justify-content-between gap-3">

              <div>

                <h4 className="saved-job-title">
                  {job.title}
                </h4>

                <p className="saved-job-company">
                  {job.company}
                </p>

              </div>

              <span className="saved-job-type">
                {job.jobType}
              </span>

            </div>


            {/* META */}

            <div className="saved-job-meta">

              <span>
                📍 {job.location}
              </span>

              <span>
                💰 {job.salary || "Not disclosed"}
              </span>

              <span>
                🎯 {job.experience || "Not specified"}
              </span>

            </div>


            {/* SKILLS */}

            <div className="saved-job-skills">

              {(job.skills || [])
                .slice(0, 5)
                .map((skill, index) => (
                  <span
                    className="skill-badge"
                    key={`${skill}-${index}`}
                  >
                    {skill}
                  </span>
                ))}

            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="saved-job-footer">

          <div className="saved-job-note">
            ♥ Saved to your jobs
          </div>

          <div className="d-flex gap-2 flex-wrap">

            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() =>
                removeSavedJob(job._id)
              }
            >
              Remove
            </button>

            <Link
              to={`/jobs/${job._id}`}
              className="btn btn-primary"
            >
              View Job →
            </Link>

          </div>

        </div>

      </div>
    );
  };


  return (
    <main className="saved-jobs-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="saved-jobs-hero">

        <div className="container py-5">

          <div className="row align-items-center g-4">

            <div className="col-lg-8">

              <span className="section-label">
                YOUR COLLECTION
              </span>

              <h1 className="saved-jobs-title mt-2">
                Saved Jobs
              </h1>

              <p className="saved-jobs-description">
                Keep track of interesting opportunities
                and come back when you're ready to apply.
              </p>

            </div>


            <div className="col-lg-4">

              <div className="saved-jobs-hero-card">

                <div className="saved-jobs-hero-icon">
                  ♥
                </div>

                <div>

                  <strong>
                    {loading
                      ? "..."
                      : savedJobs.length}
                  </strong>

                  <span>
                    Saved Opportunities
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

      <section className="saved-jobs-content">

        <div className="container">

          {/* LOADING */}

          {loading && (
            <div className="saved-jobs-state">

              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <h5 className="fw-bold mt-3">
                Loading saved jobs...
              </h5>

              <p className="text-muted mb-0">
                Please wait while we fetch your
                saved opportunities.
              </p>

            </div>
          )}


          {/* ERROR */}

          {!loading && error && (
            <div className="saved-jobs-state">

              <div className="saved-jobs-state-icon">
                ⚠️
              </div>

              <h4 className="fw-bold">
                Something went wrong
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


          {/* EMPTY */}

          {!loading &&
            !error &&
            savedJobs.length === 0 && (
              <div className="saved-jobs-state">

                <div className="saved-jobs-empty-icon">
                  ♡
                </div>

                <h3 className="fw-bold">
                  No saved jobs yet
                </h3>

                <p className="text-muted">
                  When you find a job you like,
                  save it here so you can easily
                  find it later.
                </p>

                <Link
                  to="/jobs"
                  className="btn btn-primary px-4"
                >
                  Explore Jobs →
                </Link>

              </div>
            )}


          {/* JOBS */}

          {!loading &&
            !error &&
            savedJobs.length > 0 && (

              <>

                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">

                  <div>

                    <span className="section-label">
                      SAVED OPPORTUNITIES
                    </span>

                    <h3 className="fw-bold mt-2 mb-1">
                      Jobs You Want to Explore
                    </h3>

                    <p className="text-muted mb-0">
                      Review your saved jobs and
                      apply when you're ready.
                    </p>

                  </div>

                  <span className="saved-jobs-count">
                    {savedJobs.length}{" "}
                    {savedJobs.length === 1
                      ? "Job Saved"
                      : "Jobs Saved"}
                  </span>

                </div>


                <div className="saved-jobs-list">

                  {savedJobs.map((job) => (
                    <SavedJobCard
                      key={job._id}
                      job={job}
                    />
                  ))}

                </div>

              </>
            )}

        </div>

      </section>

    </main>
  );
}

export default SavedJobs;