import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { path: "/", label: "Home" },
      { path: "/jobs", label: "Find Jobs" },
      { path: "/companies", label: "Companies" },
      { path: "/about", label: "About Us" },
    ],

    jobSeekers: [
      { path: "/jobs", label: "Browse Jobs" },
      { path: "/register", label: "Create Account" },
      { path: "/applications", label: "My Applications" },
      { path: "/profile", label: "My Profile" },
    ],

    recruiters: [
      { path: "/post-job", label: "Post a Job" },
      { path: "/dashboard", label: "Manage Jobs" },
      { path: "/applicants", label: "Manage Applicants" },
      { path: "/register", label: "Recruiter Account" },
    ],
  };

  return (
    <footer className="hirehub-footer">

      {/* =================================================
          MAIN FOOTER
      ================================================= */}

      <div className="container py-5">

        <div className="row g-5">

          {/* =================================================
              BRAND
          ================================================= */}

          <div className="col-lg-4 col-md-6">

            <Link
              to="/"
              className="footer-brand text-decoration-none"
            >

              <div className="d-flex align-items-center gap-3">

                <div className="footer-logo">
                  H
                </div>

                <div className="footer-brand-name">
                  Hire<span>Hub</span>
                </div>

              </div>

            </Link>

            <p className="footer-description mt-4">

              Connecting talented people with great
              opportunities. Find your dream job or hire
              the right talent with HireHub.

            </p>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="footer-socials mt-4">

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label="LinkedIn"
              >
                in
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label="GitHub"
              >
                GH
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
                aria-label="X"
              >
                X
              </a>

            </div>

          </div>


          {/* =================================================
              QUICK LINKS
          ================================================= */}

          <div className="col-lg-2 col-md-6">

            <h5 className="footer-heading">
              Quick Links
            </h5>

            <ul className="footer-links">

              {footerLinks.quickLinks.map((link) => (

                <li key={link.path}>

                  <Link to={link.path}>
                    {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              JOB SEEKERS
          ================================================= */}

          <div className="col-lg-3 col-md-6">

            <h5 className="footer-heading">
              For Job Seekers
            </h5>

            <ul className="footer-links">

              {footerLinks.jobSeekers.map((link) => (

                <li key={link.label}>

                  <Link to={link.path}>
                    {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>


          {/* =================================================
              RECRUITERS
          ================================================= */}

          <div className="col-lg-3 col-md-6">

            <h5 className="footer-heading">
              For Recruiters
            </h5>

            <ul className="footer-links">

              {footerLinks.recruiters.map((link) => (

                <li key={link.label}>

                  <Link to={link.path}>
                    {link.label}
                  </Link>

                </li>

              ))}

            </ul>

          </div>

        </div>


        {/* =================================================
            DIVIDER
        ================================================= */}

        <div className="footer-divider"></div>


        {/* =================================================
            BOTTOM
        ================================================= */}

        <div className="footer-bottom">

          <p>
            © {currentYear} HireHub. All rights reserved.
          </p>

          <div className="footer-tech">

            <span>Built with React</span>

            <span className="footer-dot">
              •
            </span>

            <span>MERN Stack</span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;