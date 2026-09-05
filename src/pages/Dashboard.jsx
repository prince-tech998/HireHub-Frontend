import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Dashboard() {
  const [user, setUser] = useState(null);

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [applicants, setApplicants] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =========================================================
     LOAD USER
  ========================================================= */

  useEffect(() => {
    const storedUser = localStorage.getItem("hirehubUser");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("User parsing error:", err);
        setUser(null);
      }
    }
  }, []);

  /* =========================================================
     FETCH DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    if (!user) return;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError("");

        /* ==============================
           JOB SEEKER
        ============================== */

        if (user.role === "jobSeeker") {
          const response = await API.get("/applications/my");

          setApplications(
            response.data.applications || []
          );
        }

        /* ==============================
           RECRUITER
        ============================== */

        if (user.role === "recruiter") {
          const [jobsResponse, applicantsResponse] =
            await Promise.all([
              API.get("/jobs"),
              API.get("/applications/applicants"),
            ]);

          const allJobs =
            jobsResponse.data.jobs || [];

          const allApplicants =
            applicantsResponse.data.applications || [];

          const recruiterJobs = allJobs.filter((job) => {
            const postedBy = job.postedBy;

            if (!postedBy) return false;

            if (typeof postedBy === "string") {
              return postedBy === user._id;
            }

            return postedBy._id === user._id;
          });

          setJobs(recruiterJobs);
          setApplicants(allApplicants);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load dashboard data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  /* =========================================================
     LOADING
  ========================================================= */

  if (!user || loading) {
    return (
      <div className="dashboard-loading-page">
        <div className="dashboard-loading-box">

          <div
            className="spinner-border text-primary"
            role="status"
          ></div>

          <h5 className="mt-4">
            Loading Dashboard...
          </h5>

          <p>
            Please wait while we prepare your dashboard.
          </p>

        </div>
      </div>
    );
  }

  /* =========================================================
     JOB SEEKER STATISTICS
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

  /* =========================================================
     RECRUITER STATISTICS
  ========================================================= */

  const totalJobs = jobs.length;

  const totalApplicants =
    applicants.length;

  const selectedApplicants =
    applicants.filter(
      (application) =>
        application.status === "Selected"
    ).length;

  const shortlistedApplicants =
    applicants.filter(
      (application) =>
        application.status === "Shortlisted"
    ).length;

  /*
    Job model currently does not have an active/closed field,
    so existing behavior is preserved.
  */
  const activeJobs = jobs.length;

  /* =========================================================
     ERROR
  ========================================================= */

  const ErrorMessage = () => {
    if (!error) return null;

    return (
      <div className="dashboard-error">
        <strong>⚠️ Something went wrong</strong>
        <span>{error}</span>
      </div>
    );
  };

  /* =========================================================
     JOB SEEKER DASHBOARD
  ========================================================= */

  if (user.role === "jobSeeker") {
    return (
      <main className="dashboard-page">

        <div className="container py-5">

          {/* ================= HERO ================= */}

          <section className="dashboard-hero">

            <div className="dashboard-hero-content">

              <span className="dashboard-eyebrow">
                JOB SEEKER DASHBOARD
              </span>

              <h1>
                Welcome back,{" "}
                <span>
                  {user.name || "User"}
                </span>{" "}
                👋
              </h1>

              <p>
                Track your applications, discover new
                opportunities and take the next step
                in your career.
              </p>

              <div className="dashboard-hero-actions">

                <Link
                  to="/jobs"
                  className="btn btn-primary"
                >
                  Explore Jobs →
                </Link>

                <Link
                  to="/profile"
                  className="btn dashboard-secondary-btn"
                >
                  View Profile
                </Link>

              </div>

            </div>

            <div className="dashboard-hero-visual">

              <div className="dashboard-hero-circle">
                💼
              </div>

              <div className="dashboard-floating-card">
                <strong>
                  {totalApplications}
                </strong>

                <span>
                  Applications
                </span>
              </div>

            </div>

          </section>

          <ErrorMessage />

          {/* ================= STATS ================= */}

          <section className="dashboard-stats-section">

            <div className="row g-4">

              <DashboardStat
                icon="📄"
                number={totalApplications}
                title="Applications"
                text="Total applications"
              />

              <DashboardStat
                icon="📝"
                number={appliedCount}
                title="Applied"
                text="Under review"
              />

              <DashboardStat
                icon="⭐"
                number={shortlistedCount}
                title="Shortlisted"
                text="Interview stage"
              />

              <DashboardStat
                icon="🎉"
                number={selectedCount}
                title="Selected"
                text="Successful applications"
              />

            </div>

          </section>

          {/* ================= QUICK ACTIONS ================= */}

          <section className="dashboard-section">

            <div className="dashboard-section-heading">

              <div>
                <span className="dashboard-section-label">
                  QUICK ACCESS
                </span>

                <h2>
                  What would you like to do?
                </h2>
              </div>

            </div>

            <div className="row g-4">

              <QuickAction
                icon="🔍"
                title="Explore Jobs"
                description="Find jobs that match your skills."
                link="/jobs"
                button="Find Jobs"
              />

              <QuickAction
                icon="📄"
                title="My Applications"
                description="Track your application progress."
                link="/applications"
                button="View Applications"
              />

              <QuickAction
                icon="❤️"
                title="Saved Jobs"
                description="View jobs you've saved for later."
                link="/saved-jobs"
                button="View Saved Jobs"
              />

            </div>

          </section>

          {/* ================= RECENT APPLICATIONS ================= */}

          <section className="dashboard-section">

            <div className="dashboard-section-heading">

              <div>
                <span className="dashboard-section-label">
                  APPLICATION ACTIVITY
                </span>

                <h2>
                  Recent Applications
                </h2>
              </div>

              {applications.length > 0 && (
                <Link
                  to="/applications"
                  className="dashboard-view-all"
                >
                  View All →
                </Link>
              )}

            </div>

            {applications.length === 0 ? (

              <EmptyState
                icon="📄"
                title="No Applications Yet"
                text="Start applying to jobs that match your skills."
                link="/jobs"
                button="Browse Jobs"
              />

            ) : (

              <div className="dashboard-application-list">

                {applications
                  .slice(0, 5)
                  .map((application) => {

                    const job =
                      application.job || {};

                    return (
                      <div
                        className="dashboard-application"
                        key={application._id}
                      >

                        <div className="dashboard-job-logo">
                          {job.company
                            ?.charAt(0)
                            ?.toUpperCase() || "H"}
                        </div>

                        <div className="dashboard-application-info">

                          <h4>
                            {job.title ||
                              "Job unavailable"}
                          </h4>

                          <p className="company">
                            {job.company ||
                              "Company unavailable"}
                          </p>

                          <p className="location">
                            📍{" "}
                            {job.location ||
                              "Location unavailable"}
                          </p>

                        </div>

                        <div className="dashboard-application-right">

                          <span
                            className={`dashboard-status ${getStatusClass(
                              application.status
                            )}`}
                          >
                            {application.status ||
                              "Applied"}
                          </span>

                          {job._id && (
                            <Link
                              to={`/jobs/${job._id}`}
                            >
                              View Job →
                            </Link>
                          )}

                        </div>

                      </div>
                    );
                  })}

              </div>

            )}

          </section>

        </div>

      </main>
    );
  }

  /* =========================================================
     RECRUITER DASHBOARD
  ========================================================= */

  return (
    <main className="dashboard-page">

      <div className="container py-5">

        {/* ================= HERO ================= */}

        <section className="dashboard-hero recruiter-hero">

          <div className="dashboard-hero-content">

            <span className="dashboard-eyebrow">
              RECRUITER DASHBOARD
            </span>

            <h1>
              Welcome back,{" "}
              <span>
                {user.name || "Recruiter"}
              </span>{" "}
              🏢
            </h1>

            <p>
              Manage your job postings, review candidates
              and find the right talent for your team.
            </p>

            <div className="dashboard-hero-actions">

              <Link
                to="/post-job"
                className="btn btn-primary"
              >
                + Post a Job
              </Link>

              <Link
                to="/applicants"
                className="btn dashboard-secondary-btn"
              >
                View Applicants
              </Link>

            </div>

          </div>

          <div className="dashboard-hero-visual">

            <div className="dashboard-hero-circle">
              👥
            </div>

            <div className="dashboard-floating-card">
              <strong>
                {totalApplicants}
              </strong>

              <span>
                Applicants
              </span>
            </div>

          </div>

        </section>

        <ErrorMessage />

        {/* ================= RECRUITER STATS ================= */}

        <section className="dashboard-stats-section">

          <div className="row g-4">

            <DashboardStat
              icon="💼"
              number={totalJobs}
              title="Jobs Posted"
              text="Your job postings"
            />

            <DashboardStat
              icon="🟢"
              number={activeJobs}
              title="Active Jobs"
              text="Currently available"
            />

            <DashboardStat
              icon="👥"
              number={totalApplicants}
              title="Applicants"
              text="Candidate applications"
            />

            <DashboardStat
              icon="🎉"
              number={selectedApplicants}
              title="Hires"
              text="Selected candidates"
            />

          </div>

        </section>

        {/* ================= RECRUITER ACTIONS ================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <span className="dashboard-section-label">
                RECRUITER TOOLS
              </span>

              <h2>
                Manage your hiring
              </h2>
            </div>

          </div>

          <div className="row g-4">

            <QuickAction
              icon="➕"
              title="Post a Job"
              description="Create a new job opportunity."
              link="/post-job"
              button="Post Job"
            />

            <QuickAction
              icon="👥"
              title="Manage Applicants"
              description="Review and manage candidates."
              link="/applicants"
              button="View Applicants"
            />

            <QuickAction
              icon="👤"
              title="Recruiter Profile"
              description="Manage your recruiter profile."
              link="/profile"
              button="View Profile"
            />

          </div>

        </section>

        {/* ================= POSTED JOBS ================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>
              <span className="dashboard-section-label">
                JOB MANAGEMENT
              </span>

              <h2>
                Your Posted Jobs
              </h2>
            </div>

            <Link
              to="/post-job"
              className="dashboard-view-all"
            >
              + Post Job
            </Link>

          </div>

          {jobs.length === 0 ? (

            <EmptyState
              icon="💼"
              title="No Jobs Posted"
              text="Create your first job posting to start finding candidates."
              link="/post-job"
              button="Post Your First Job"
            />

          ) : (

            <div className="row g-4">

              {jobs
                .slice(0, 6)
                .map((job) => (

                  <div
                    className="col-lg-6"
                    key={job._id}
                  >

                    <div className="recruiter-job-card">

                      <div className="recruiter-job-top">

                        <div className="dashboard-job-logo">
                          {job.company
                            ?.charAt(0)
                            ?.toUpperCase() || "H"}
                        </div>

                        <div className="recruiter-job-title">

                          <h4>
                            {job.title}
                          </h4>

                          <p>
                            {job.company}
                          </p>

                        </div>

                        <span className="job-active-badge">
                          Active
                        </span>

                      </div>

                      <div className="recruiter-job-meta">

                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💼 {job.jobType}
                        </span>

                      </div>

                      <div className="recruiter-job-skills">

                        {(job.skills || [])
                          .slice(0, 4)
                          .map((skill, index) => (
                            <span
                              key={`${skill}-${index}`}
                            >
                              {skill}
                            </span>
                          ))}

                      </div>

                      <div className="recruiter-job-actions">

                        <Link
                          to={`/jobs/${job._id}`}
                          className="btn btn-outline-primary"
                        >
                          View Job
                        </Link>

                        <Link
                          to={`/jobs/${job._id}/edit`}
                          className="btn btn-primary"
                        >
                          Edit Job
                        </Link>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          )}

        </section>

        {/* ================= RECRUITER SUMMARY ================= */}

        <section className="dashboard-section">

          <div className="row g-4">

            <div className="col-lg-6">

              <div className="dashboard-panel">

                <div className="dashboard-panel-header">

                  <div className="dashboard-panel-icon">
                    👥
                  </div>

                  <div>
                    <h3>
                      Candidate Overview
                    </h3>

                    <p>
                      Current application pipeline
                    </p>
                  </div>

                </div>

                <div className="candidate-stat">
                  <span>Total Applicants</span>
                  <strong>
                    {totalApplicants}
                  </strong>
                </div>

                <div className="candidate-stat">
                  <span>Shortlisted</span>
                  <strong className="text-warning">
                    {shortlistedApplicants}
                  </strong>
                </div>

                <div className="candidate-stat">
                  <span>Selected</span>
                  <strong className="text-success">
                    {selectedApplicants}
                  </strong>
                </div>

                <Link
                  to="/applicants"
                  className="btn btn-primary w-100 mt-3"
                >
                  Manage Applicants →
                </Link>

              </div>

            </div>

            <div className="col-lg-6">

              <div className="dashboard-panel">

                <div className="dashboard-panel-header">

                  <div className="dashboard-panel-icon">
                    💡
                  </div>

                  <div>
                    <h3>
                      Hiring Tips
                    </h3>

                    <p>
                      Improve your recruitment process
                    </p>
                  </div>

                </div>

                <div className="hiring-tip">
                  <span>✓</span>
                  Keep job descriptions clear and specific.
                </div>

                <div className="hiring-tip">
                  <span>✓</span>
                  Mention the skills required for the role.
                </div>

                <div className="hiring-tip">
                  <span>✓</span>
                  Review cover letters carefully.
                </div>

                <div className="hiring-tip">
                  <span>✓</span>
                  Update candidate status regularly.
                </div>

              </div>

            </div>

          </div>

        </section>

      </div>

    </main>
  );
}


/* =========================================================
   STAT COMPONENT
========================================================= */

function DashboardStat({
  icon,
  number,
  title,
  text,
}) {
  return (
    <div className="col-md-6 col-lg-3">

      <div className="dashboard-stat-card">

        <div className="dashboard-stat-icon">
          {icon}
        </div>

        <div className="dashboard-stat-content">

          <strong>
            {number}
          </strong>

          <h4>
            {title}
          </h4>

          <p>
            {text}
          </p>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   QUICK ACTION COMPONENT
========================================================= */

function QuickAction({
  icon,
  title,
  description,
  link,
  button,
}) {
  return (
    <div className="col-md-6 col-lg-4">

      <Link
        to={link}
        className="quick-action-link"
      >

        <div className="dashboard-action-card">

          <div className="dashboard-action-icon">
            {icon}
          </div>

          <h3>
            {title}
          </h3>

          <p>
            {description}
          </p>

          <span>
            {button} →
          </span>

        </div>

      </Link>

    </div>
  );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  icon,
  title,
  text,
  link,
  button,
}) {
  return (
    <div className="dashboard-empty-state">

      <div className="dashboard-empty-icon">
        {icon}
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {text}
      </p>

      <Link
        to={link}
        className="btn btn-primary"
      >
        {button}
      </Link>

    </div>
  );
}


/* =========================================================
   STATUS
========================================================= */

function getStatusClass(status) {
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
}

export default Dashboard;