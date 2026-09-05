import { Link } from "react-router-dom";

function About() {
  return (
    <div className="bg-light">

      {/* HERO */}

      <section
        className="text-white py-5"
        style={{
          background:
            "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <div className="container py-5">
          <div className="row justify-content-center text-center">

            <div className="col-lg-8">

              <span className="badge bg-white text-primary px-3 py-2 mb-3">
                🚀 About HireHub
              </span>

              <h1 className="display-4 fw-bold mb-3">
                Connecting Talent With Opportunity
              </h1>

              <p className="lead opacity-75 mb-0">
                HireHub is a modern job platform designed to
                connect talented professionals with companies
                looking for great people.
              </p>

            </div>

          </div>
        </div>
      </section>

      {/* MISSION */}

      <section className="py-5">
        <div className="container">

          <div className="row align-items-center g-5">

            <div className="col-lg-6">

              <span className="text-primary fw-bold">
                OUR MISSION
              </span>

              <h2 className="display-6 fw-bold mt-2 mb-4">
                Making Job Search Simple
              </h2>

              <p className="text-muted">
                Finding the right job should not be complicated.
                HireHub brings job seekers and recruiters
                together through a simple, intuitive and
                professional platform.
              </p>

              <p className="text-muted">
                Whether you are searching for your first
                opportunity, changing careers or building a
                talented team, HireHub helps make the process
                easier.
              </p>

              <Link
                to="/jobs"
                className="btn btn-primary mt-2 px-4"
              >
                Explore Jobs →
              </Link>

            </div>

            <div className="col-lg-6">

              <div className="row g-3">

                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4 h-100">
                    <div className="display-5 mb-2">
                      🎯
                    </div>

                    <h5 className="fw-bold">
                      Career Focus
                    </h5>

                    <p className="text-muted small mb-0">
                      Helping candidates find meaningful
                      opportunities.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4 h-100">
                    <div className="display-5 mb-2">
                      🤝
                    </div>

                    <h5 className="fw-bold">
                      Easy Hiring
                    </h5>

                    <p className="text-muted small mb-0">
                      Helping companies discover talented
                      candidates.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4 h-100">
                    <div className="display-5 mb-2">
                      ⚡
                    </div>

                    <h5 className="fw-bold">
                      Fast Process
                    </h5>

                    <p className="text-muted small mb-0">
                      Simple tools for a smoother job search.
                    </p>
                  </div>
                </div>

                <div className="col-6">
                  <div className="card border-0 shadow-sm text-center p-4 h-100">
                    <div className="display-5 mb-2">
                      🔒
                    </div>

                    <h5 className="fw-bold">
                      Trusted Platform
                    </h5>

                    <p className="text-muted small mb-0">
                      Built with security and reliability in
                      mind.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="py-5 bg-white">
        <div className="container">

          <div className="text-center mb-5">

            <span className="text-primary fw-bold">
              HOW IT WORKS
            </span>

            <h2 className="fw-bold mt-2">
              Simple. Fast. Effective.
            </h2>

            <p className="text-muted">
              Everything you need to move your career forward.
            </p>

          </div>

          <div className="row g-4">

            {/* STEP 1 */}

            <div className="col-md-4">

              <div className="text-center">

                <div
                  className="mx-auto rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "24px",
                  }}
                >
                  1
                </div>

                <h4 className="fw-bold">
                  Create an Account
                </h4>

                <p className="text-muted">
                  Register as a job seeker or recruiter and
                  create your HireHub profile.
                </p>

              </div>

            </div>

            {/* STEP 2 */}

            <div className="col-md-4">

              <div className="text-center">

                <div
                  className="mx-auto rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "24px",
                  }}
                >
                  2
                </div>

                <h4 className="fw-bold">
                  Find or Post Jobs
                </h4>

                <p className="text-muted">
                  Candidates can explore jobs while recruiters
                  can post new opportunities.
                </p>

              </div>

            </div>

            {/* STEP 3 */}

            <div className="col-md-4">

              <div className="text-center">

                <div
                  className="mx-auto rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold mb-3"
                  style={{
                    width: "65px",
                    height: "65px",
                    fontSize: "24px",
                  }}
                >
                  3
                </div>

                <h4 className="fw-bold">
                  Connect & Grow
                </h4>

                <p className="text-muted">
                  Apply for opportunities, manage applications
                  and build your career.
                </p>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOR JOB SEEKERS / RECRUITERS */}

      <section className="py-5">
        <div className="container">

          <div className="row g-4">

            <div className="col-lg-6">

              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 p-lg-5">

                  <div className="display-5 mb-3">
                    👨‍💻
                  </div>

                  <h3 className="fw-bold mb-3">
                    For Job Seekers
                  </h3>

                  <p className="text-muted">
                    Discover relevant opportunities, apply
                    with confidence and track your applications
                    from one convenient dashboard.
                  </p>

                  <ul className="list-unstyled text-muted mb-4">

                    <li className="mb-2">
                      ✓ Browse available jobs
                    </li>

                    <li className="mb-2">
                      ✓ Apply with a cover letter
                    </li>

                    <li className="mb-2">
                      ✓ Track application status
                    </li>

                    <li className="mb-2">
                      ✓ Manage your profile
                    </li>

                  </ul>

                  <Link
                    to="/jobs"
                    className="btn btn-outline-primary"
                  >
                    Find Jobs →
                  </Link>

                </div>
              </div>

            </div>

            <div className="col-lg-6">

              <div className="card border-0 shadow-sm h-100">
                <div className="card-body p-4 p-lg-5">

                  <div className="display-5 mb-3">
                    🏢
                  </div>

                  <h3 className="fw-bold mb-3">
                    For Recruiters
                  </h3>

                  <p className="text-muted">
                    Reach talented professionals and manage
                    your hiring process through a centralized
                    recruiter dashboard.
                  </p>

                  <ul className="list-unstyled text-muted mb-4">

                    <li className="mb-2">
                      ✓ Post job opportunities
                    </li>

                    <li className="mb-2">
                      ✓ Manage posted jobs
                    </li>

                    <li className="mb-2">
                      ✓ Review applicants
                    </li>

                    <li className="mb-2">
                      ✓ Update application status
                    </li>

                  </ul>

                  <Link
                    to="/register"
                    className="btn btn-outline-primary"
                  >
                    Start Hiring →
                  </Link>

                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* CTA */}

      <section className="pb-5">
        <div className="container">

          <div
            className="rounded-4 text-white text-center p-5"
            style={{
              background:
                "linear-gradient(135deg, #0d6efd, #6610f2)",
            }}
          >

            <h2 className="fw-bold mb-3">
              Your Next Opportunity Starts Here
            </h2>

            <p className="lead opacity-75 mb-4">
              Join HireHub and take the next step toward
              your career goals.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">

              <Link
                to="/jobs"
                className="btn btn-light btn-lg px-4"
              >
                Browse Jobs
              </Link>

              <Link
                to="/register"
                className="btn btn-outline-light btn-lg px-4"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default About;