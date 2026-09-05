import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function Home() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  /* =====================================================
     FETCH JOBS
  ===================================================== */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        const response = await API.get("/jobs");

        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Home Jobs Error:", error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.set("search", keyword.trim());
    }

    if (location.trim()) {
      params.set("location", location.trim());
    }

    const query = params.toString();

    navigate(query ? `/jobs?${query}` : "/jobs");
  };

  /* =====================================================
     POPULAR SEARCH
  ===================================================== */

  const handlePopularSearch = (value) => {
    setKeyword(value);

    navigate(`/jobs?search=${encodeURIComponent(value)}`);
  };

  /* =====================================================
     FEATURED JOBS
  ===================================================== */

  const featuredJobs = jobs.slice(0, 6);

  /* =====================================================
     UNIQUE COMPANIES
  ===================================================== */

  const companies = [
    ...new Set(
      jobs
        .map((job) => job.company)
        .filter(Boolean)
    ),
  ];

  /* =====================================================
     STATS
  ===================================================== */

  const totalJobs = jobs.length;
  const totalCompanies = companies.length;

  /* =====================================================
     CATEGORIES
  ===================================================== */

  const categories = [
    {
      name: "Technology",
      icon: "💻",
      search: "Technology",
    },
    {
      name: "Design",
      icon: "🎨",
      search: "Design",
    },
    {
      name: "Marketing",
      icon: "📢",
      search: "Marketing",
    },
    {
      name: "Business",
      icon: "💼",
      search: "Business",
    },
    {
      name: "Finance",
      icon: "💰",
      search: "Finance",
    },
    {
      name: "Healthcare",
      icon: "🏥",
      search: "Healthcare",
    },
    {
      name: "Education",
      icon: "🎓",
      search: "Education",
    },
    {
      name: "Engineering",
      icon: "⚙️",
      search: "Engineering",
    },
  ];

  return (
    <main className="main-content">

      {/* =================================================
          HERO SECTION
      ================================================= */}

      <section className="hero-section py-5">

        {/* Decorative circles */}

        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="container py-5">

          <div className="row align-items-center g-5">

            {/* LEFT CONTENT */}

            <div className="col-lg-7 text-white">

              {/* Badge */}

              <div className="mb-4">

                <span className="badge rounded-pill hero-badge px-3 py-2">

                  <span className="me-2">🚀</span>

                  Find your next opportunity

                </span>

              </div>

              {/* Heading */}

              <h1 className="display-3 fw-bold mb-4">

                Find the job that

                <br />

                <span className="hero-highlight">
                  moves you forward.
                </span>

              </h1>

              {/* Description */}

              <p className="lead hero-description mb-4">

                Discover meaningful opportunities from
                growing companies and take the next step
                toward the career you deserve.

              </p>

              {/* SEARCH BOX */}

              <form
                onSubmit={handleSearch}
                className="hero-search-box p-2 rounded-4 shadow-lg"
              >

                <div className="row g-2 align-items-center">

                  {/* KEYWORD */}

                  <div className="col-md-5">

                    <div className="search-input-wrapper">

                      <span className="search-icon">
                        🔎
                      </span>

                      <input
                        type="text"
                        className="form-control border-0 shadow-none"
                        placeholder="Job title, company or skills"
                        value={keyword}
                        onChange={(e) =>
                          setKeyword(e.target.value)
                        }
                      />

                    </div>

                  </div>

                  {/* LOCATION */}

                  <div className="col-md-4">

                    <div className="search-input-wrapper">

                      <span className="search-icon">
                        📍
                      </span>

                      <input
                        type="text"
                        className="form-control border-0 shadow-none"
                        placeholder="Location"
                        value={location}
                        onChange={(e) =>
                          setLocation(e.target.value)
                        }
                      />

                    </div>

                  </div>

                  {/* BUTTON */}

                  <div className="col-md-3">

                    <button
                      type="submit"
                      className="btn btn-primary w-100 search-button"
                    >
                      Search Jobs
                      <span className="ms-2">→</span>
                    </button>

                  </div>

                </div>

              </form>

              {/* POPULAR SEARCHES */}

              <div className="popular-searches mt-3">

                <span className="me-2">
                  Popular:
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handlePopularSearch("React")
                  }
                >
                  React
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handlePopularSearch("MERN")
                  }
                >
                  MERN
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handlePopularSearch("JavaScript")
                  }
                >
                  JavaScript
                </button>

              </div>

              {/* HERO TRUST */}

              <div className="hero-trust mt-5">

                <div className="d-flex flex-wrap gap-4">

                  <div>
                    <strong>✓</strong>
                    <span>Verified opportunities</span>
                  </div>

                  <div>
                    <strong>✓</strong>
                    <span>Easy applications</span>
                  </div>

                  <div>
                    <strong>✓</strong>
                    <span>Career focused</span>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT HERO VISUAL */}

            <div className="col-lg-5 d-none d-lg-block">

              <div className="hero-visual">

                {/* Main card */}

                <div className="hero-main-card">

                  <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                      <small className="text-muted">
                        Featured opportunity
                      </small>

                      <h5 className="fw-bold mt-1 mb-0">
                        Software Developer
                      </h5>

                    </div>

                    <div className="hero-card-icon">
                      💼
                    </div>

                  </div>

                  <div className="hero-company">
                    HireHub Technologies
                  </div>

                  <div className="small text-muted mt-2">
                    📍 Remote · Full-time
                  </div>

                  <div className="d-flex gap-2 flex-wrap mt-4">

                    <span className="skill-badge">
                      React
                    </span>

                    <span className="skill-badge">
                      Node.js
                    </span>

                    <span className="skill-badge">
                      MongoDB
                    </span>

                  </div>

                  <div className="d-flex justify-content-between align-items-center mt-4">

                    <strong className="text-primary">
                      ₹6L - ₹12L
                    </strong>

                    <span className="badge bg-success-subtle text-success">
                      Open
                    </span>

                  </div>

                </div>

                {/* Floating card 1 */}

                <div className="hero-floating-card hero-floating-one">

                  <div className="floating-icon">
                    🎯
                  </div>

                  <div>

                    <strong>
                      Perfect Match
                    </strong>

                    <small>
                      Skills matched
                    </small>

                  </div>

                </div>

                {/* Floating card 2 */}

                <div className="hero-floating-card hero-floating-two">

                  <div className="floating-icon">
                    ⚡
                  </div>

                  <div>

                    <strong>
                      Easy Apply
                    </strong>

                    <small>
                      Apply in minutes
                    </small>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          STATS
      ================================================= */}

      <section className="stats-section">

        <div className="container">

          <div className="stats-card">

            <div className="row text-center g-4">

              <div className="col-6 col-md-3">

                <div className="stat-item">

                  <div className="stat-icon">
                    💼
                  </div>

                  <h3>
                    {loading ? "..." : totalJobs}
                  </h3>

                  <p>
                    Live Jobs
                  </p>

                </div>

              </div>

              <div className="col-6 col-md-3">

                <div className="stat-item">

                  <div className="stat-icon">
                    🏢
                  </div>

                  <h3>
                    {loading ? "..." : totalCompanies}
                  </h3>

                  <p>
                    Hiring Companies
                  </p>

                </div>

              </div>

              <div className="col-6 col-md-3">

                <div className="stat-item">

                  <div className="stat-icon">
                    ⚡
                  </div>

                  <h3>
                    24/7
                  </h3>

                  <p>
                    Job Discovery
                  </p>

                </div>

              </div>

              <div className="col-6 col-md-3">

                <div className="stat-item">

                  <div className="stat-icon">
                    🎯
                  </div>

                  <h3>
                    100%
                  </h3>

                  <p>
                    Career Focused
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CATEGORIES
      ================================================= */}

      <section className="py-5 categories-section">

        <div className="container py-4">

          <div className="section-heading text-center mb-5">

            <span className="section-label">
              EXPLORE OPPORTUNITIES
            </span>

            <h2 className="section-title mt-2">
              Explore Job Categories
            </h2>

            <p className="section-description">
              Discover opportunities across popular
              career fields and industries.
            </p>

          </div>

          <div className="row g-4">

            {categories.map((category) => (

              <div
                className="col-6 col-md-3"
                key={category.name}
              >

                <button
                  type="button"
                  className="category-card card border-0 w-100 h-100 p-4 text-center"
                  onClick={() =>
                    navigate(
                      `/jobs?search=${encodeURIComponent(
                        category.search
                      )}`
                    )
                  }
                >

                  <div className="category-icon fs-1">
                    {category.icon}
                  </div>

                  <h5 className="fw-bold mt-3 mb-2">
                    {category.name}
                  </h5>

                  <p className="small mb-0">
                    Explore opportunities
                  </p>

                  <div className="category-arrow mt-3">
                    →
                  </div>

                </button>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* =================================================
          FEATURED JOBS
      ================================================= */}

      <section className="py-5 featured-jobs-section">

        <div className="container py-4">

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-5">

            <div>

              <span className="section-label">
                FEATURED OPPORTUNITIES
              </span>

              <h2 className="section-title mt-2 mb-2">
                Latest Jobs
              </h2>

              <p className="section-description mb-0">
                Explore the latest opportunities
                available on HireHub.
              </p>

            </div>

            <Link
              to="/jobs"
              className="btn btn-outline-primary px-4"
            >
              View All Jobs →
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
                Finding the latest opportunities...
              </p>

            </div>

          )}

          {/* EMPTY */}

          {!loading && featuredJobs.length === 0 && (

            <div className="empty-jobs-card text-center p-5">

              <div className="empty-icon">
                💼
              </div>

              <h4 className="fw-bold mt-3">
                No jobs available yet
              </h4>

              <p className="text-muted">
                New opportunities will appear here soon.
              </p>

              <Link
                to="/jobs"
                className="btn btn-primary px-4"
              >
                Browse Jobs
              </Link>

            </div>

          )}

          {/* JOB CARDS */}

          {!loading && featuredJobs.length > 0 && (

            <div className="row g-4">

              {featuredJobs.map((job) => (

                <div
                  className="col-md-6 col-lg-4"
                  key={job._id}
                >

                  <div className="job-list-card card border-0 h-100">

                    <div className="card-body p-4">

                      {/* JOB TOP */}

                      <div className="d-flex justify-content-between align-items-start gap-3">

                        <div className="job-company-logo">

                          {job.company
                            ?.charAt(0)
                            ?.toUpperCase() || "H"}

                        </div>

                        <span className="badge bg-light">
                          {job.jobType}
                        </span>

                      </div>

                      {/* TITLE */}

                      <h5 className="fw-bold mt-4 mb-1">

                        {job.title}

                      </h5>

                      {/* COMPANY */}

                      <p className="text-primary fw-semibold mb-3">

                        {job.company}

                      </p>

                      {/* LOCATION */}

                      <div className="job-meta">

                        <span>
                          📍 {job.location}
                        </span>

                        <span>
                          💰 {job.salary || "Not disclosed"}
                        </span>

                      </div>

                      {/* SKILLS */}

                      <div className="mt-4 mb-4">

                        {(job.skills || [])
                          .slice(0, 4)
                          .map((skill) => (

                            <span
                              key={skill}
                              className="skill-badge me-1 mb-2"
                            >
                              {skill}
                            </span>

                          ))}

                      </div>

                      {/* FOOTER */}

                      <div className="mt-auto">

                        <Link
                          to={`/jobs/${job._id}`}
                          className="btn btn-outline-primary w-100"
                        >
                          View Details
                          <span className="ms-2">
                            →
                          </span>
                        </Link>

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

      {/* =================================================
          COMPANIES
      ================================================= */}

      {companies.length > 0 && (

        <section className="py-5 companies-section">

          <div className="container py-4">

            <div className="text-center mb-5">

              <span className="section-label">
                TOP EMPLOYERS
              </span>

              <h2 className="section-title mt-2">
                Companies Hiring
              </h2>

              <p className="section-description">
                Explore companies currently looking
                for talented people.
              </p>

            </div>

            <div className="row g-4">

              {companies
                .slice(0, 6)
                .map((company) => {

                  const companyJobs =
                    jobs.filter(
                      (job) =>
                        job.company === company
                    );

                  return (

                    <div
                      className="col-md-6 col-lg-4"
                      key={company}
                    >

                      <div className="company-card card border-0 h-100">

                        <div className="card-body p-4">

                          <div className="d-flex align-items-center gap-3">

                            {/* COMPANY LOGO */}

                            <div className="company-logo">

                              {company
                                .charAt(0)
                                .toUpperCase()}

                            </div>

                            {/* COMPANY INFO */}

                            <div className="flex-grow-1">

                              <h5 className="fw-bold mb-1">

                                {company}

                              </h5>

                              <p className="text-muted small mb-0">

                                {companyJobs.length}{" "}

                                open{" "}

                                {companyJobs.length === 1
                                  ? "position"
                                  : "positions"}

                              </p>

                            </div>

                          </div>

                          <div className="company-divider my-4"></div>

                          <Link
                            to={`/companies/${encodeURIComponent(
                              company
                            )}`}
                            className="btn btn-outline-primary w-100"
                          >
                            View Company
                            <span className="ms-2">
                              →
                            </span>
                          </Link>

                        </div>

                      </div>

                    </div>

                  );
                })}

            </div>

            {companies.length > 6 && (

              <div className="text-center mt-5">

                <Link
                  to="/companies"
                  className="btn btn-outline-primary px-4"
                >
                  Explore All Companies →
                </Link>

              </div>

            )}

          </div>

        </section>

      )}

      {/* =================================================
          WHY HIREHUB
      ================================================= */}

      <section className="py-5 why-section">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="section-label">
              WHY HIREHUB
            </span>

            <h2 className="section-title mt-2">
              Everything you need for your career
            </h2>

            <p className="section-description">
              A simple platform designed to make
              your job search easier.
            </p>

          </div>

          <div className="row g-4">

            {/* CARD 1 */}

            <div className="col-md-4">

              <div className="feature-card card border-0 h-100 p-4">

                <div className="feature-icon">
                  🔎
                </div>

                <h5 className="fw-bold mt-4">
                  Find Better Jobs
                </h5>

                <p className="mb-0">
                  Search opportunities using job title,
                  skills, location, experience and job type.
                </p>

              </div>

            </div>

            {/* CARD 2 */}

            <div className="col-md-4">

              <div className="feature-card card border-0 h-100 p-4">

                <div className="feature-icon">
                  ⚡
                </div>

                <h5 className="fw-bold mt-4">
                  Apply Easily
                </h5>

                <p className="mb-0">
                  Apply to suitable jobs quickly and
                  manage your applications from one place.
                </p>

              </div>

            </div>

            {/* CARD 3 */}

            <div className="col-md-4">

              <div className="feature-card card border-0 h-100 p-4">

                <div className="feature-icon">
                  🚀
                </div>

                <h5 className="fw-bold mt-4">
                  Grow Your Career
                </h5>

                <p className="mb-0">
                  Connect with employers and move closer
                  to your next professional opportunity.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          HOW IT WORKS
      ================================================= */}

      <section className="py-5 process-section">

        <div className="container py-4">

          <div className="text-center mb-5">

            <span className="section-label">
              SIMPLE PROCESS
            </span>

            <h2 className="section-title mt-2">
              How HireHub Works
            </h2>

            <p className="section-description">
              Finding your next opportunity is simple.
            </p>

          </div>

          <div className="row g-4">

            {/* STEP 1 */}

            <div className="col-md-4">

              <div className="process-card text-center">

                <div className="process-number">
                  01
                </div>

                <div className="process-icon">
                  🔎
                </div>

                <h5 className="fw-bold mt-4">
                  Search
                </h5>

                <p className="text-muted mb-0">
                  Find jobs that match your skills,
                  location and career goals.
                </p>

              </div>

            </div>

            {/* STEP 2 */}

            <div className="col-md-4">

              <div className="process-card text-center">

                <div className="process-number">
                  02
                </div>

                <div className="process-icon">
                  📝
                </div>

                <h5 className="fw-bold mt-4">
                  Apply
                </h5>

                <p className="text-muted mb-0">
                  Submit your application with a
                  personalized cover letter.
                </p>

              </div>

            </div>

            {/* STEP 3 */}

            <div className="col-md-4">

              <div className="process-card text-center">

                <div className="process-number">
                  03
                </div>

                <div className="process-icon">
                  🎯
                </div>

                <h5 className="fw-bold mt-4">
                  Get Hired
                </h5>

                <p className="text-muted mb-0">
                  Connect with employers and take
                  the next step in your career.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="cta-section py-5">

        <div className="container py-4">

          <div className="cta-card text-center">

            <div className="cta-glow"></div>

            <div className="position-relative">

              <span className="cta-icon">
                🚀
              </span>

              <h2 className="fw-bold mt-4 mb-3">

                Ready to find your next job?

              </h2>

              <p className="mb-4">

                Explore opportunities and take
                the next step in your career today.

              </p>

              <div className="d-flex justify-content-center flex-wrap gap-3">

                <Link
                  to="/jobs"
                  className="btn btn-primary btn-lg px-4"
                >
                  Explore Jobs
                  <span className="ms-2">
                    →
                  </span>
                </Link>

                <Link
                  to="/register"
                  className="btn btn-outline-primary btn-lg px-4"
                >
                  Create Account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;