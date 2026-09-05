import { Link } from 'react-router-dom';

function RecruiterDashboard() {
  const jobs = [
    {
      id: 1,
      title: 'MERN Stack Developer',
      location: 'Hyderabad',
      applications: 24,
      status: 'Active',
      posted: '20 Aug 2026',
    },
    {
      id: 2,
      title: 'Frontend Developer',
      location: 'Bangalore',
      applications: 18,
      status: 'Active',
      posted: '18 Aug 2026',
    },
    {
      id: 3,
      title: 'Backend Developer',
      location: 'Pune',
      applications: 12,
      status: 'Closed',
      posted: '10 Aug 2026',
    },
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              Recruiter Dashboard 🏢
            </h2>

            <p className="text-secondary mb-0">
              Manage your jobs and find the right candidates.
            </p>
          </div>

          <Link
            to="/recruiter/post-job"
            className="btn btn-primary mt-3 mt-md-0"
          >
            + Post New Job
          </Link>

        </div>


        {/* Statistics */}
        <div className="row g-4 mb-5">

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="fs-2 mb-2">💼</div>

                <h3 className="fw-bold mb-1">
                  12
                </h3>

                <p className="text-secondary mb-0">
                  Total Jobs
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="fs-2 mb-2">🟢</div>

                <h3 className="fw-bold mb-1">
                  8
                </h3>

                <p className="text-secondary mb-0">
                  Active Jobs
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="fs-2 mb-2">👥</div>

                <h3 className="fw-bold mb-1">
                  85
                </h3>

                <p className="text-secondary mb-0">
                  Applications
                </p>
              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">
                <div className="fs-2 mb-2">⭐</div>

                <h3 className="fw-bold mb-1">
                  18
                </h3>

                <p className="text-secondary mb-0">
                  Shortlisted
                </p>
              </div>
            </div>
          </div>

        </div>


        {/* Jobs Section */}
        <div className="card border-0 shadow-sm">

          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

              <div>
                <h4 className="fw-bold mb-1">
                  My Posted Jobs
                </h4>

                <p className="text-secondary mb-0">
                  Manage your current job postings.
                </p>
              </div>

              <Link
                to="/recruiter/post-job"
                className="btn btn-outline-primary"
              >
                Post Job
              </Link>

            </div>


            {/* Desktop Table */}
            <div className="table-responsive">

              <table className="table align-middle">

                <thead>
                  <tr>
                    <th>Job</th>
                    <th>Location</th>
                    <th>Applications</th>
                    <th>Status</th>
                    <th>Posted</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {jobs.map((job) => (

                    <tr key={job.id}>

                      <td>
                        <strong>
                          {job.title}
                        </strong>
                      </td>

                      <td>
                        📍 {job.location}
                      </td>

                      <td>
                        <span className="badge bg-primary-subtle text-primary">
                          {job.applications} Applicants
                        </span>
                      </td>

                      <td>

                        {job.status === 'Active' ? (
                          <span className="badge bg-success-subtle text-success">
                            Active
                          </span>
                        ) : (
                          <span className="badge bg-secondary-subtle text-secondary">
                            Closed
                          </span>
                        )}

                      </td>

                      <td>
                        {job.posted}
                      </td>

                      <td>

                        <div className="d-flex gap-2">

                          <Link
                            to={`/jobs/${job.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            View
                          </Link>

                          <button
                            className="btn btn-sm btn-outline-secondary"
                            type="button"
                          >
                            Edit
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>


        {/* Quick Actions */}
        <div className="row g-4 mt-1">

          <div className="col-md-4">

            <Link
              to="/recruiter/post-job"
              className="text-decoration-none"
            >
              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="fs-2 mb-2">
                    📝
                  </div>

                  <h5 className="fw-bold">
                    Post a New Job
                  </h5>

                  <p className="text-secondary mb-0">
                    Create a new job opportunity and find candidates.
                  </p>

                </div>

              </div>
            </Link>

          </div>


          <div className="col-md-4">

            <div className="card border-0 shadow-sm h-100">

              <div className="card-body p-4">

                <div className="fs-2 mb-2">
                  👥
                </div>

                <h5 className="fw-bold">
                  Review Applicants
                </h5>

                <p className="text-secondary mb-0">
                  View applications and find the best candidates.
                </p>

              </div>

            </div>

          </div>


          <div className="col-md-4">

            <Link
              to="/profile"
              className="text-decoration-none"
            >
              <div className="card border-0 shadow-sm h-100">

                <div className="card-body p-4">

                  <div className="fs-2 mb-2">
                    ⚙️
                  </div>

                  <h5 className="fw-bold">
                    Company Profile
                  </h5>

                  <p className="text-secondary mb-0">
                    Update your company and recruiter information.
                  </p>

                </div>

              </div>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
}

export default RecruiterDashboard;