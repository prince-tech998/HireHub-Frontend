import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/axios";

function CompanyDetails() {
  const { id } = useParams();

  const companyName = decodeURIComponent(id || "");

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCompanyJobs();
  }, [companyName]);

  const fetchCompanyJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/jobs");

      const allJobs =
        response.data.jobs || response.data || [];

      const companyJobs = allJobs.filter(
        (job) =>
          job.company?.trim().toLowerCase() ===
          companyName.trim().toLowerCase()
      );

      setJobs(companyJobs);
    } catch (err) {
      console.error("Company Details Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load company jobs."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100">

      {/* HERO */}

      <section
        className="py-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <div className="container py-4">

          <Link
            to="/companies"
            className="text-white text-decoration-none d-inline-block mb-4"
          >
            ← Back to Companies
          </Link>

          <div className="d-flex flex-column flex-md-row align-items-md-center gap-4">

            {/* COMPANY ICON */}

            <div
              className="rounded-4 bg-white text-primary d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
              style={{
                width: "90px",
                height: "90px",
                fontSize: "36px",
              }}
            >
              {companyName
                .charAt(0)
                .toUpperCase()}
            </div>

            {/* COMPANY INFO */}

            <div>
              <h1 className="display-6 fw-bold mb-2">
                {companyName}
              </h1>

              <p className="lead mb-0 opacity-75">
                Explore open positions and career
                opportunities at {companyName}.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* CONTENT */}

      <section className="py-5">
        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">
                Open Positions
              </h2>

              <p className="text-muted mb-0">
                {jobs.length}{" "}
                {jobs.length === 1
                  ? "job"
                  : "jobs"}{" "}
                available
              </p>
            </div>

            <Link
              to="/jobs"
              className="btn btn-outline-primary"
            >
              Browse All Jobs
            </Link>

          </div>

          {/* LOADING */}

          {loading && (
            <div className="text-center py-5">

              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <p className="text-muted mt-3 mb-0">
                Loading company jobs...
              </p>

            </div>
          )}

          {/* ERROR */}

          {!loading && error && (
            <div className="text-center py-5">

              <div className="alert alert-danger">
                {error}
              </div>

              <button
                className="btn btn-primary"
                onClick={fetchCompanyJobs}
              >
                Try Again
              </button>

            </div>
          )}

          {/* NO JOBS */}

          {!loading &&
            !error &&
            jobs.length === 0 && (
              <div className="card border-0 shadow-sm">

                <div className="card-body text-center py-5">

                  <div className="display-4 mb-3">
                    🔍
                  </div>

                  <h3 className="fw-bold">
                    No Open Positions
                  </h3>

                  <p className="text-muted mb-4">
                    This company currently has no
                    available jobs on HireHub.
                  </p>

                  <Link
                    to="/companies"
                    className="btn btn-primary"
                  >
                    ← Back to Companies
                  </Link>

                </div>

              </div>
            )}

          {/* JOBS */}

          {!loading &&
            !error &&
            jobs.length > 0 && (
              <div className="row g-4">

                {jobs.map((job) => (
                  <div
                    className="col-12 col-lg-6"
                    key={job._id}
                  >

                    <div className="card border-0 shadow-sm h-100">

                      <div className="card-body p-4">

                        {/* TITLE */}

                        <div className="d-flex justify-content-between gap-3 mb-3">

                          <div>
                            <h4 className="fw-bold mb-1">
                              {job.title}
                            </h4>

                            <p className="text-muted mb-0">
                              {job.company}
                            </p>
                          </div>

                          <span className="badge bg-primary-subtle text-primary align-self-start">
                            {job.jobType}
                          </span>

                        </div>

                        {/* DETAILS */}

                        <div className="row g-2 mb-3">

                          <div className="col-sm-6">
                            <span className="text-muted">
                              📍 {job.location}
                            </span>
                          </div>

                          <div className="col-sm-6">
                            <span className="text-muted">
                              💰 {job.salary ||
                                "Not disclosed"}
                            </span>
                          </div>

                          <div className="col-sm-6">
                            <span className="text-muted">
                              💼 {job.experience ||
                                "0-2 years"}
                            </span>
                          </div>

                        </div>

                        {/* DESCRIPTION */}

                        <p className="text-muted">
                          {job.description?.length > 150
                            ? `${job.description.slice(
                                0,
                                150
                              )}...`
                            : job.description}
                        </p>

                        {/* SKILLS */}

                        {job.skills?.length > 0 && (
                          <div className="d-flex flex-wrap gap-2 mb-4">

                            {job.skills
                              .slice(0, 5)
                              .map((skill, index) => (
                                <span
                                  key={index}
                                  className="badge bg-light text-dark border"
                                >
                                  {skill}
                                </span>
                              ))}

                          </div>
                        )}

                        {/* BUTTON */}

                        <Link
                          to={`/jobs/${job._id}`}
                          className="btn btn-primary w-100"
                        >
                          View Job Details →
                        </Link>

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

        </div>
      </section>

      {/* CTA */}

      <section className="pb-5">
        <div className="container">

          <div className="card border-0 shadow-sm">
            <div className="card-body text-center p-5">

              <h3 className="fw-bold mb-2">
                Looking for more opportunities?
              </h3>

              <p className="text-muted mb-4">
                Explore all available jobs on HireHub.
              </p>

              <Link
                to="/jobs"
                className="btn btn-primary px-4"
              >
                Explore All Jobs →
              </Link>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

export default CompanyDetails;