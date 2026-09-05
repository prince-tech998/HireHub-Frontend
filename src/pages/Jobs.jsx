import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import API from "../api/axios";

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState(
    searchParams.get("search") || ""
  );

  const [location, setLocation] = useState(
    searchParams.get("location") || ""
  );

  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hirehubSavedJobs") || "[]"
      );
    } catch {
      return [];
    }
  });


  /* =========================================================
     FETCH JOBS
  ========================================================= */

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("/jobs");

        setJobs(response.data.jobs || []);
      } catch (err) {
        console.error("Jobs Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load jobs. Please try again."
        );

        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  /* =========================================================
     SALARY PARSER
  ========================================================= */

  const parseSalary = (salary) => {
    if (!salary) return 0;

    const numbers = String(salary).match(
      /[\d,]+/g
    );

    if (!numbers || numbers.length === 0) {
      return 0;
    }

    const values = numbers.map((value) =>
      Number(value.replace(/,/g, ""))
    );

    return Math.max(...values);
  };


  /* =========================================================
     FILTER JOBS
  ========================================================= */

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    const keyword = search
      .trim()
      .toLowerCase();

    const locationValue = location
      .trim()
      .toLowerCase();


    /* SEARCH */

    if (keyword) {
      result = result.filter((job) => {
        const title =
          job.title?.toLowerCase() || "";

        const company =
          job.company?.toLowerCase() || "";

        const description =
          job.description?.toLowerCase() || "";

        const skills =
          (job.skills || [])
            .join(" ")
            .toLowerCase();

        return (
          title.includes(keyword) ||
          company.includes(keyword) ||
          description.includes(keyword) ||
          skills.includes(keyword)
        );
      });
    }


    /* LOCATION */

    if (locationValue) {
      result = result.filter((job) =>
        job.location
          ?.toLowerCase()
          .includes(locationValue)
      );
    }


    /* JOB TYPE */

    if (jobType) {
      result = result.filter(
        (job) => job.jobType === jobType
      );
    }


    /* EXPERIENCE */

    if (experience) {
      result = result.filter((job) =>
        job.experience
          ?.toLowerCase()
          .includes(experience.toLowerCase())
      );
    }


    /* SORT */

    if (sortBy === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    if (sortBy === "salary-high") {
      result.sort(
        (a, b) =>
          parseSalary(b.salary) -
          parseSalary(a.salary)
      );
    }

    if (sortBy === "salary-low") {
      result.sort(
        (a, b) =>
          parseSalary(a.salary) -
          parseSalary(b.salary)
      );
    }

    return result;
  }, [
    jobs,
    search,
    location,
    jobType,
    experience,
    sortBy,
  ]);


  /* =========================================================
     SEARCH SUBMIT
  ========================================================= */

  const handleSearch = (e) => {
    e.preventDefault();

    const params = {};

    if (search.trim()) {
      params.search = search.trim();
    }

    if (location.trim()) {
      params.location = location.trim();
    }

    setSearchParams(params);
  };


  /* =========================================================
     CLEAR FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setJobType("");
    setExperience("");
    setSortBy("newest");

    setSearchParams({});
  };


  /* =========================================================
     SAVE JOB
  ========================================================= */

  const toggleSaveJob = (jobId) => {
    let updatedSavedJobs;

    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter(
        (id) => id !== jobId
      );
    } else {
      updatedSavedJobs = [
        ...savedJobs,
        jobId,
      ];
    }

    setSavedJobs(updatedSavedJobs);

    localStorage.setItem(
      "hirehubSavedJobs",
      JSON.stringify(updatedSavedJobs)
    );
  };


  /* =========================================================
     ACTIVE FILTER COUNT
  ========================================================= */

  const activeFilters = [
    search,
    location,
    jobType,
    experience,
  ].filter(Boolean).length;


  /* =========================================================
     JOB CARD
  ========================================================= */

  const JobCard = ({ job }) => {
    const isSaved = savedJobs.includes(job._id);

    return (
      <div className="job-list-card h-100">

        <div className="card-body p-4">

          {/* TOP */}

          <div className="d-flex justify-content-between align-items-start gap-3">

            <div className="d-flex gap-3">

              <div className="job-company-logo">
                {job.company
                  ?.charAt(0)
                  ?.toUpperCase() || "H"}
              </div>

              <div>

                <h5 className="fw-bold mb-1">
                  {job.title}
                </h5>

                <p className="text-primary fw-semibold mb-1">
                  {job.company}
                </p>

              </div>

            </div>


            {/* SAVE */}

            <button
              type="button"
              className={`job-save-button ${
                isSaved
                  ? "saved"
                  : ""
              }`}
              onClick={() =>
                toggleSaveJob(job._id)
              }
              aria-label={
                isSaved
                  ? "Remove saved job"
                  : "Save job"
              }
            >
              {isSaved ? "♥" : "♡"}
            </button>

          </div>


          {/* JOB TYPE */}

          <div className="mt-3">

            <span className="job-type-badge">
              {job.jobType}
            </span>

          </div>


          {/* META */}

          <div className="job-meta mt-4">

            <span>
              📍 {job.location}
            </span>

            <span>
              💰 {job.salary || "Not disclosed"}
            </span>

            <span>
              🎯 {job.experience || "Experience not specified"}
            </span>

          </div>


          {/* DESCRIPTION */}

          <p className="job-description mt-3 mb-3">
            {job.description?.length > 130
              ? `${job.description.substring(
                  0,
                  130
                )}...`
              : job.description}
          </p>


          {/* SKILLS */}

          <div className="job-skills mb-4">

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


          {/* BUTTON */}

          <Link
            to={`/jobs/${job._id}`}
            className="btn btn-primary w-100"
          >
            View Job Details →
          </Link>

        </div>

      </div>
    );
  };


  return (
    <div className="jobs-page">

      {/* =====================================================
          PAGE HERO
      ===================================================== */}

      <section className="jobs-hero">

        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-8">

              <span className="section-label">
                CAREER OPPORTUNITIES
              </span>

              <h1 className="jobs-page-title mt-2">
                Find your next
                <span> opportunity.</span>
              </h1>

              <p className="jobs-page-description">
                Explore opportunities from growing
                companies and discover a role that
                matches your skills and career goals.
              </p>

            </div>

            <div className="col-lg-4 d-none d-lg-block">

              <div className="jobs-hero-stat">

                <div className="jobs-hero-stat-icon">
                  💼
                </div>

                <div>

                  <strong>
                    {jobs.length}
                  </strong>

                  <span>
                    Jobs available
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <section className="jobs-search-section">

        <div className="container">

          <form
            onSubmit={handleSearch}
            className="jobs-search-card"
          >

            <div className="row g-3 align-items-end">

              {/* SEARCH */}

              <div className="col-lg-5">

                <label className="jobs-filter-label">
                  Search jobs
                </label>

                <div className="jobs-input-wrapper">

                  <span>
                    🔎
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Job title, company or skill"
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* LOCATION */}

              <div className="col-lg-4">

                <label className="jobs-filter-label">
                  Location
                </label>

                <div className="jobs-input-wrapper">

                  <span>
                    📍
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="City or location"
                    value={location}
                    onChange={(e) =>
                      setLocation(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>


              {/* BUTTON */}

              <div className="col-lg-3">

                <button
                  type="submit"
                  className="btn btn-primary w-100 jobs-search-button"
                >
                  Search Jobs
                </button>

              </div>

            </div>

          </form>

        </div>

      </section>


      {/* =====================================================
          FILTERS
      ===================================================== */}

      <section className="jobs-content">

        <div className="container">

          <div className="row g-4">

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <div className="col-lg-3">

              <div className="jobs-filter-card">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>

                    <h5 className="fw-bold mb-1">
                      Filters
                    </h5>

                    <small className="text-muted">
                      Refine your search
                    </small>

                  </div>

                  {activeFilters > 0 && (
                    <span className="filter-count">
                      {activeFilters}
                    </span>
                  )}

                </div>


                {/* JOB TYPE */}

                <div className="mb-4">

                  <label className="jobs-filter-label">
                    Job Type
                  </label>

                  <select
                    className="form-select"
                    value={jobType}
                    onChange={(e) =>
                      setJobType(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      All Job Types
                    </option>

                    <option value="Full-time">
                      Full-time
                    </option>

                    <option value="Part-time">
                      Part-time
                    </option>

                    <option value="Internship">
                      Internship
                    </option>

                    <option value="Contract">
                      Contract
                    </option>

                  </select>

                </div>


                {/* EXPERIENCE */}

                <div className="mb-4">

                  <label className="jobs-filter-label">
                    Experience
                  </label>

                  <select
                    className="form-select"
                    value={experience}
                    onChange={(e) =>
                      setExperience(
                        e.target.value
                      )
                    }
                  >

                    <option value="">
                      All Experience
                    </option>

                    <option value="0-2">
                      0-2 years
                    </option>

                    <option value="2-4">
                      2-4 years
                    </option>

                    <option value="4-6">
                      4-6 years
                    </option>

                    <option value="6+">
                      6+ years
                    </option>

                  </select>

                </div>


                {/* SORT */}

                <div className="mb-4">

                  <label className="jobs-filter-label">
                    Sort By
                  </label>

                  <select
                    className="form-select"
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(
                        e.target.value
                      )
                    }
                  >

                    <option value="newest">
                      Newest First
                    </option>

                    <option value="salary-high">
                      Salary: High to Low
                    </option>

                    <option value="salary-low">
                      Salary: Low to High
                    </option>

                  </select>

                </div>


                {/* CLEAR */}

                {activeFilters > 0 && (
                  <button
                    type="button"
                    className="btn btn-outline-primary w-100"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </button>
                )}

              </div>

            </div>


            {/* =================================================
                JOB RESULTS
            ================================================= */}

            <div className="col-lg-9">

              <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                  <h4 className="fw-bold mb-1">
                    Latest Opportunities
                  </h4>

                  <p className="text-muted mb-0">
                    {loading
                      ? "Loading jobs..."
                      : `${filteredJobs.length} ${
                          filteredJobs.length === 1
                            ? "job"
                            : "jobs"
                        } found`}
                  </p>

                </div>

              </div>


              {/* LOADING */}

              {loading && (
                <div className="jobs-state-card text-center">

                  <div
                    className="spinner-border text-primary"
                    role="status"
                  ></div>

                  <h5 className="mt-3 fw-bold">
                    Finding opportunities...
                  </h5>

                  <p className="text-muted mb-0">
                    Please wait while we load
                    the latest jobs.
                  </p>

                </div>
              )}


              {/* ERROR */}

              {!loading && error && (
                <div className="jobs-state-card text-center">

                  <div className="jobs-state-icon">
                    ⚠️
                  </div>

                  <h5 className="fw-bold">
                    Something went wrong
                  </h5>

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


              {/* NO RESULTS */}

              {!loading &&
                !error &&
                filteredJobs.length === 0 && (
                  <div className="jobs-state-card text-center">

                    <div className="jobs-state-icon">
                      🔎
                    </div>

                    <h4 className="fw-bold">
                      No jobs found
                    </h4>

                    <p className="text-muted">
                      Try changing your search
                      or clearing some filters.
                    </p>

                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={clearFilters}
                    >
                      Clear Filters
                    </button>

                  </div>
                )}


              {/* JOB GRID */}

              {!loading &&
                !error &&
                filteredJobs.length > 0 && (

                  <div className="row g-4">

                    {filteredJobs.map(
                      (job) => (
                        <div
                          className="col-md-6"
                          key={job._id}
                        >
                          <JobCard job={job} />
                        </div>
                      )
                    )}

                  </div>

                )}

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Jobs;