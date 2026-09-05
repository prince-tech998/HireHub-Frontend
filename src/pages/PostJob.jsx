import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

function PostJob() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    experience: "0-2 years",
    skills: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const title = formData.title.trim();
    const company = formData.company.trim();
    const location = formData.location.trim();
    const salary = formData.salary.trim();
    const description = formData.description.trim();

    if (!title || !company || !location || !description) {
      setError("Please fill all required fields.");
      return;
    }

    if (description.length < 30) {
      setError("Job description should contain at least 30 characters.");
      return;
    }

    const skills = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length === 0) {
      setError("Please enter at least one required skill.");
      return;
    }

    try {
      setLoading(true);

      await API.post("/jobs", {
        title,
        company,
        location,
        jobType: formData.jobType,
        salary: salary || "Not disclosed",
        experience: formData.experience,
        skills,
        description,
      });

      setSuccess("Job posted successfully!");

      setFormData({
        title: "",
        company: "",
        location: "",
        jobType: "Full-time",
        salary: "",
        experience: "0-2 years",
        skills: "",
        description: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      console.error("Post Job Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to post job. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">
      <div className="container py-5">

        {/* PAGE HEADER */}
        <div className="post-job-header">

          <Link to="/dashboard" className="post-job-back">
            ← Back to Dashboard
          </Link>

          <div className="post-job-title-row">
            <div>
              <span className="post-job-eyebrow">
                RECRUITER CENTER
              </span>

              <h1>Post a New Job</h1>

              <p>
                Find the right talent by creating a clear and
                professional job listing.
              </p>
            </div>

            <div className="post-job-header-icon">
              💼
            </div>
          </div>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="post-job-alert post-job-alert-error">
            <div className="post-job-alert-icon">!</div>

            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="post-job-alert post-job-alert-success">
            <div className="post-job-alert-icon">✓</div>

            <div>
              <strong>Job Posted Successfully</strong>
              <p>{success} Redirecting to dashboard...</p>
            </div>
          </div>
        )}

        <div className="row g-4">

          {/* MAIN FORM */}
          <div className="col-lg-8">

            <div className="post-job-card">

              <div className="post-job-card-header">
                <div>
                  <h3>Job Information</h3>
                  <p>
                    Provide the details candidates need to know.
                  </p>
                </div>

                <span className="post-job-step">
                  Step 1
                </span>
              </div>

              <form onSubmit={handleSubmit}>

                {/* BASIC INFORMATION */}
                <div className="post-job-section">

                  <div className="post-job-section-title">
                    <span className="post-job-section-number">01</span>

                    <div>
                      <h4>Basic Information</h4>
                      <p>Tell candidates about the position.</p>
                    </div>
                  </div>

                  <div className="row g-4">

                    {/* JOB TITLE */}
                    <div className="col-12">

                      <label htmlFor="title">
                        Job Title <span>*</span>
                      </label>

                      <input
                        id="title"
                        type="text"
                        name="title"
                        className="post-job-input"
                        placeholder="e.g. Senior MERN Stack Developer"
                        value={formData.title}
                        onChange={handleChange}
                        disabled={loading}
                      />

                      <small>
                        Use a clear and specific job title.
                      </small>
                    </div>

                    {/* COMPANY */}
                    <div className="col-md-6">

                      <label htmlFor="company">
                        Company Name <span>*</span>
                      </label>

                      <div className="post-job-input-wrapper">
                        <span>🏢</span>

                        <input
                          id="company"
                          type="text"
                          name="company"
                          className="post-job-input"
                          placeholder="e.g. HireHub Technologies"
                          value={formData.company}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* LOCATION */}
                    <div className="col-md-6">

                      <label htmlFor="location">
                        Location <span>*</span>
                      </label>

                      <div className="post-job-input-wrapper">
                        <span>📍</span>

                        <input
                          id="location"
                          type="text"
                          name="location"
                          className="post-job-input"
                          placeholder="e.g. Chandigarh, India"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* JOB TYPE */}
                    <div className="col-md-6">

                      <label htmlFor="jobType">
                        Job Type <span>*</span>
                      </label>

                      <select
                        id="jobType"
                        name="jobType"
                        className="post-job-input post-job-select"
                        value={formData.jobType}
                        onChange={handleChange}
                        disabled={loading}
                      >
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
                    <div className="col-md-6">

                      <label htmlFor="experience">
                        Experience
                      </label>

                      <select
                        id="experience"
                        name="experience"
                        className="post-job-input post-job-select"
                        value={formData.experience}
                        onChange={handleChange}
                        disabled={loading}
                      >
                        <option value="0-2 years">
                          0-2 years
                        </option>

                        <option value="2-4 years">
                          2-4 years
                        </option>

                        <option value="4-6 years">
                          4-6 years
                        </option>

                        <option value="6+ years">
                          6+ years
                        </option>
                      </select>
                    </div>

                    {/* SALARY */}
                    <div className="col-12">

                      <label htmlFor="salary">
                        Salary
                      </label>

                      <div className="post-job-input-wrapper">
                        <span>₹</span>

                        <input
                          id="salary"
                          type="text"
                          name="salary"
                          className="post-job-input"
                          placeholder="e.g. ₹6 - ₹10 LPA"
                          value={formData.salary}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>

                      <small>
                        Leave blank if salary is not disclosed.
                      </small>
                    </div>

                  </div>
                </div>

                <div className="post-job-divider"></div>

                {/* SKILLS */}
                <div className="post-job-section">

                  <div className="post-job-section-title">
                    <span className="post-job-section-number">02</span>

                    <div>
                      <h4>Required Skills</h4>
                      <p>
                        Add the technologies and skills candidates
                        should have.
                      </p>
                    </div>
                  </div>

                  <label htmlFor="skills">
                    Skills <span>*</span>
                  </label>

                  <input
                    id="skills"
                    type="text"
                    name="skills"
                    className="post-job-input"
                    placeholder="React, Node.js, MongoDB, Express"
                    value={formData.skills}
                    onChange={handleChange}
                    disabled={loading}
                  />

                  <small>
                    Separate multiple skills using commas.
                  </small>

                  {/* SKILL PREVIEW */}
                  {formData.skills.trim() && (
                    <div className="post-job-skill-preview">

                      <span className="post-job-preview-label">
                        Preview:
                      </span>

                      {formData.skills
                        .split(",")
                        .map((skill) => skill.trim())
                        .filter(Boolean)
                        .map((skill, index) => (
                          <span
                            className="post-job-skill"
                            key={`${skill}-${index}`}
                          >
                            {skill}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                <div className="post-job-divider"></div>

                {/* DESCRIPTION */}
                <div className="post-job-section">

                  <div className="post-job-section-title">
                    <span className="post-job-section-number">03</span>

                    <div>
                      <h4>Job Description</h4>
                      <p>
                        Explain responsibilities, requirements and
                        expectations.
                      </p>
                    </div>
                  </div>

                  <label htmlFor="description">
                    Description <span>*</span>
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    className="post-job-textarea"
                    rows="10"
                    placeholder="Describe the role, responsibilities, requirements and expectations..."
                    value={formData.description}
                    onChange={handleChange}
                    disabled={loading}
                  ></textarea>

                  <div className="post-job-character-row">

                    <small>
                      Minimum 30 characters required.
                    </small>

                    <span
                      className={
                        formData.description.length >= 30
                          ? "character-valid"
                          : ""
                      }
                    >
                      {formData.description.length} characters
                    </span>

                  </div>
                </div>

                {/* ACTIONS */}
                <div className="post-job-actions">

                  <Link
                    to="/dashboard"
                    className="post-job-cancel"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    className="post-job-submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="post-job-spinner"></span>
                        Posting Job...
                      </>
                    ) : (
                      <>
                        🚀 Post Job
                      </>
                    )}
                  </button>

                </div>

              </form>
            </div>
          </div>

          {/* SIDEBAR */}
          <div className="col-lg-4">

            <div className="post-job-sidebar">

              <div className="post-job-sidebar-icon">
                💡
              </div>

              <h3>Tips for a Great Job Post</h3>

              <p>
                A well-written job post helps you attract better
                candidates.
              </p>

              <div className="post-job-tip">

                <span>01</span>

                <div>
                  <h5>Clear title</h5>

                  <p>
                    Use a specific job title candidates can
                    understand immediately.
                  </p>
                </div>

              </div>

              <div className="post-job-tip">

                <span>02</span>

                <div>
                  <h5>Relevant skills</h5>

                  <p>
                    Mention the technologies and skills required
                    for the position.
                  </p>
                </div>

              </div>

              <div className="post-job-tip">

                <span>03</span>

                <div>
                  <h5>Detailed description</h5>

                  <p>
                    Clearly explain responsibilities and
                    expectations.
                  </p>
                </div>

              </div>

              <div className="post-job-tip">

                <span>04</span>

                <div>
                  <h5>Salary transparency</h5>

                  <p>
                    Adding salary information can help attract
                    relevant candidates.
                  </p>
                </div>

              </div>

            </div>

            {/* QUICK INFO */}
            <div className="post-job-info-card">

              <div className="post-job-info-icon">
                ✓
              </div>

              <div>
                <strong>You're almost there!</strong>

                <p>
                  Complete the form and your job will be visible
                  to candidates.
                </p>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;