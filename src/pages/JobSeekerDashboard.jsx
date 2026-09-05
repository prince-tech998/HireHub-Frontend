import { Link } from 'react-router-dom';

function JobSeekerDashboard() {
  const applications = [
    {
      id: 1,
      job: 'Frontend Developer',
      company: 'Tech Solutions Pvt. Ltd.',
      location: 'Bangalore',
      date: '20 Aug 2026',
      status: 'Pending',
    },
    {
      id: 2,
      job: 'MERN Stack Developer',
      company: 'Innovate Labs',
      location: 'Hyderabad',
      date: '18 Aug 2026',
      status: 'Accepted',
    },
    {
      id: 3,
      job: 'Backend Developer',
      company: 'Digital Systems',
      location: 'Pune',
      date: '15 Aug 2026',
      status: 'Rejected',
    },
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">

        {/* Dashboard Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">
              Welcome back, Job Seeker 👋
            </h2>

            <p className="text-secondary mb-0">
              Track your applications and discover new opportunities.
            </p>
          </div>

          <Link
            to="/jobs"
            className="btn btn-primary mt-3 mt-md-0"
          >
            Find Jobs
          </Link>

        </div>


        {/* Statistics */}
        <div className="row g-4 mb-5">

          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="fs-2 mb-2">📄</div>

                <h3 className="fw-bold mb-1">
                  8
                </h3>

                <p className="text-secondary mb-0">
                  Total Applications
                </p>

              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="fs-2 mb-2">⏳</div>

                <h3 className="fw-bold mb-1">
                  4
                </h3>

                <p className="text-secondary mb-0">
                  Pending
                </p>

              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="fs-2 mb-2">✅</div>

                <h3 className="fw-bold mb-1">
                  2
                </h3>

                <p className="text-secondary mb-0">
                  Accepted
                </p>

              </div>
            </div>
          </div>


          <div className="col-md-6 col-lg-3">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body p-4">

                <div className="fs-2 mb-2">❌</div>

                <h3 className="fw-bold mb-1">
                  2
                </h3>

                <p className="text-secondary mb-0">
                  Rejected
                </p>

              </div>
            </div>
          </div>

        </div>


        {/* Main Content */}
        <div className="row g-4">

          {/* Applications */}
          <div className="col-lg-8">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <div className="d-flex justify-content-between align-items-center mb-4">

                  <div>
                    <h4 className="fw-bold mb-1">
                      My Applications
                    </h4>

                    <p className="text-secondary mb-0">
                      Track your recent job applications.
                    </p>
                  </div>

                  <Link
                    to="/jobs"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Apply More
                  </Link>

                </div>


                {/* Application List */}

                {applications.map((application) => (

                  <div
                    key={application.id}
                    className="border rounded p-3 mb-3"
                  >

                    <div className="row align-items-center">

                      <div className="col-md-7">

                        <h5 className="fw-bold mb-1">
                          {application.job}
                        </h5>

                        <p className="text-secondary mb-1">
                          {application.company}
                        </p>

                        <small className="text-secondary">
                          📍 {application.location}
                        </small>

                        <br />

                        <small className="text-secondary">
                          Applied on {application.date}
                        </small>

                      </div>


                      <div className="col-md-5 text-md-end mt-3 mt-md-0">

                        {application.status === 'Pending' && (
                          <span className="badge bg-warning-subtle text-warning-emphasis px-3 py-2">
                            ⏳ Pending
                          </span>
                        )}

                        {application.status === 'Accepted' && (
                          <span className="badge bg-success-subtle text-success px-3 py-2">
                            ✅ Accepted
                          </span>
                        )}

                        {application.status === 'Rejected' && (
                          <span className="badge bg-danger-subtle text-danger px-3 py-2">
                            ❌ Rejected
                          </span>
                        )}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>


          {/* Profile Card */}
          <div className="col-lg-4">

            <div className="card border-0 shadow-sm">

              <div className="card-body p-4">

                <div className="text-center">

                  <div
                    className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{
                      width: '80px',
                      height: '80px',
                      fontSize: '30px',
                    }}
                  >
                    👤
                  </div>

                  <h4 className="fw-bold">
                    Job Seeker
                  </h4>

                  <p className="text-secondary">
                    MERN Stack Developer
                  </p>

                </div>

                <hr />

                <div className="mb-3">
                  <strong>Email</strong>
                  <p className="text-secondary mb-0">
                    user@example.com
                  </p>
                </div>

                <div className="mb-3">
                  <strong>Location</strong>
                  <p className="text-secondary mb-0">
                    India
                  </p>
                </div>

                <div className="mb-3">
                  <strong>Skills</strong>

                  <div className="mt-2">

                    <span className="badge bg-light text-dark border me-1">
                      React
                    </span>

                    <span className="badge bg-light text-dark border me-1">
                      Node.js
                    </span>

                    <span className="badge bg-light text-dark border">
                      MongoDB
                    </span>

                  </div>

                </div>

                <Link
                  to="/profile"
                  className="btn btn-outline-primary w-100"
                >
                  Edit Profile
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default JobSeekerDashboard;