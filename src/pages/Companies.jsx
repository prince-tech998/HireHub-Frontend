import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Companies() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/jobs");

      setJobs(response.data.jobs || response.data || []);
    } catch (err) {
      console.error("Companies Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load companies."
      );
    } finally {
      setLoading(false);
    }
  };

  const companies = useMemo(() => {
    const companyMap = new Map();

    jobs.forEach((job) => {
      const companyName = job.company?.trim();

      if (!companyName) return;

      if (!companyMap.has(companyName)) {
        companyMap.set(companyName, {
          name: companyName,
          jobs: [],
          locations: new Set(),
        });
      }

      const company = companyMap.get(companyName);

      company.jobs.push(job);

      if (job.location) {
        company.locations.add(job.location);
      }
    });

    return Array.from(companyMap.values()).map(
      (company) => ({
        ...company,
        locations: Array.from(company.locations),
      })
    );
  }, [jobs]);

  const filteredCompanies = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return companies;
    }

    return companies.filter((company) =>
      company.name.toLowerCase().includes(keyword)
    );
  }, [companies, search]);

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
          <div className="row justify-content-center text-center">

            <div className="col-lg-8">

              <span className="badge bg-white text-primary px-3 py-2 mb-3">
                🏢 Explore Companies
              </span>

              <h1 className="display-5 fw-bold mb-3">
                Discover Great Companies
              </h1>

              <p className="lead mb-0 opacity-75">
                Explore companies hiring on HireHub
                and find your next opportunity.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="py-4">
        <div className="container">

          <div className="card border-0 shadow-sm">
            <div className="card-body p-3">

              <div className="row align-items-center g-3">

                <div className="col-md-8">

                  <div className="input-group">

                    <span className="input-group-text bg-white">
                      🔍
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search companies..."
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
                    />

                  </div>

                </div>

                <div className="col-md-4 text-md-end">

                  <span className="text-muted">
                    {filteredCompanies.length}{" "}
                    {filteredCompanies.length === 1
                      ? "company"
                      : "companies"}{" "}
                    found
                  </span>

                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* COMPANIES */}

      <section className="pb-5">
        <div className="container">

          {loading ? (
            <div className="text-center py-5">

              <div
                className="spinner-border text-primary"
                role="status"
              ></div>

              <p className="text-muted mt-3 mb-0">
                Loading companies...
              </p>

            </div>
          ) : error ? (
            <div className="text-center py-5">

              <div className="alert alert-danger d-inline-block">
                {error}
              </div>

              <div>
                <button
                  className="btn btn-primary"
                  onClick={fetchJobs}
                >
                  Try Again
                </button>
              </div>

            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="card border-0 shadow-sm">

              <div className="card-body text-center py-5">

                <div className="display-4 mb-3">
                  🏢
                </div>

                <h3 className="fw-bold">
                  No Companies Found
                </h3>

                <p className="text-muted mb-4">
                  {search
                    ? "Try searching for another company."
                    : "No companies have posted jobs yet."}
                </p>

                {search && (
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => setSearch("")}
                  >
                    Clear Search
                  </button>
                )}

              </div>

            </div>
          ) : (
            <div className="row g-4">

              {filteredCompanies.map((company) => {

                const firstJob =
                  company.jobs[0];

                return (
                  <div
                    className="col-sm-6 col-lg-4"
                    key={company.name}
                  >

                    <div className="card border-0 shadow-sm h-100">

                      <div className="card-body p-4">

                        {/* COMPANY ICON */}

                        <div className="d-flex justify-content-between align-items-start mb-4">

                          <div
                            className="rounded-4 d-flex align-items-center justify-content-center text-white fw-bold"
                            style={{
                              width: "64px",
                              height: "64px",
                              fontSize: "24px",
                              background:
                                "linear-gradient(135deg, #0d6efd, #6610f2)",
                            }}
                          >
                            {company.name
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <span className="badge bg-primary-subtle text-primary">
                            {company.jobs.length}{" "}
                            {company.jobs.length === 1
                              ? "Job"
                              : "Jobs"}
                          </span>

                        </div>

                        {/* COMPANY NAME */}

                        <h4 className="fw-bold mb-2">
                          {company.name}
                        </h4>

                        {/* LOCATION */}

                        <p className="text-muted mb-3">
                          📍{" "}
                          {company.locations.length > 0
                            ? company.locations
                                .slice(0, 2)
                                .join(" • ")
                            : "Location not specified"}
                        </p>

                        {/* JOB INFO */}

                        <div className="border-top pt-3 mt-3">

                          <p className="small text-muted mb-1">
                            Latest opening
                          </p>

                          <p className="fw-semibold mb-3">
                            {firstJob?.title ||
                              "Job opportunity"}
                          </p>

                        </div>

                        {/* BUTTON */}

                        <Link
                          to={`/companies/${encodeURIComponent(
                            company.name
                          )}`}
                          className="btn btn-outline-primary w-100"
                        >
                          View Company Jobs →
                        </Link>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </section>

      {/* CTA */}

      <section className="pb-5">
        <div className="container">

          <div
            className="rounded-4 text-white text-center p-5"
            style={{
              background:
                "linear-gradient(135deg, #212529, #343a40)",
            }}
          >

            <h2 className="fw-bold mb-3">
              Ready to Find Your Next Opportunity?
            </h2>

            <p className="text-white-50 mb-4">
              Browse thousands of opportunities and
              take the next step in your career.
            </p>

            <Link
              to="/jobs"
              className="btn btn-primary btn-lg px-4"
            >
              Browse Jobs →
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

export default Companies;