import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

function EditJob() {
  const { id } = useParams();
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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /* =========================================
     FETCH JOB
  ========================================= */

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/jobs/${id}`);

        const job = response.data.job || response.data;

        setFormData({
          title: job.title || "",
          company: job.company || "",
          location: job.location || "",
          jobType: job.jobType || "Full-time",
          salary: job.salary || "",
          experience: job.experience || "0-2 years",
          skills: Array.isArray(job.skills)
            ? job.skills.join(", ")
            : "",
          description: job.description || "",
        });
      } catch (err) {
        console.error("Fetch Job Error:", err);

        setError(
          err.response?.data?.message ||
            "Unable to load job details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  /* =========================================
     VALIDATION
  ========================================= */

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Job title is required.";
    }

    if (!formData.company.trim()) {
      return "Company name is required.";
    }

    if (!formData.location.trim()) {
      return "Location is required.";
    }

    if (!formData.description.trim()) {
      return "Job description is required.";
    }

    if (formData.description.trim().length < 30) {
      return "Job description must be at least 30 characters.";
    }

    const skills = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    if (skills.length === 0) {
      return "Please enter at least one skill.";
    }

    return "";
  };

  /* =========================================
     UPDATE JOB
  ========================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);

      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);

      const jobData = {
        title: formData.title.trim(),
        company: formData.company.trim(),
        location: formData.location.trim(),
        jobType: formData.jobType,
        salary: formData.salary.trim() || "Not disclosed",
        experience: formData.experience.trim(),
        skills,
        description: formData.description.trim(),
      };

      await API.put(`/jobs/${id}`, jobData);

      setSuccess("Job updated successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Update Job Error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to update job. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="edit-job-page">
        <div className="container">
          <div className="edit-job-loading">
            <div className="loading-spinner"></div>

            <h5>Loading job details...</h5>

            <p>Please wait a moment.</p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================================
     UI
  ========================================= */

  return (
    <div className="edit-job-page">
      <div className="container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="edit-job-header">

          <Link
            to="/dashboard"
            className="edit-job-back"
          >
            ← Back to Dashboard
          </Link>

          <div className="edit-job-title-row">

            <div>
              <span className="edit-job-eyebrow">
                RECRUITER PANEL
              </span>

              <h1>Edit Job Posting</h1>

              <p>
                Update your job posting and keep the information
                accurate for potential candidates.
              </p>
            </div>

            <div className="edit-job-header-icon">
              ✏️
            </div>

          </div>
        </div>

        <div className="row g-4">

          {/* =================================
              MAIN FORM
          ================================= */}

          <div className="col-lg-8">

            <div className="edit-job-card">

              <div className="edit-job-card-header">

                <div>
                  <h3>Job Information</h3>

                  <p>
                    Update the details of your job opportunity.
                  </p>
                </div>

                <span className="edit-job-badge">
                  Editing
                </span>

              </div>

              <div className="edit-job-card-body">

                {/* ERROR */}

                {error && (
                  <div className="edit-job-alert edit-job-alert-error">
                    <div className="edit-job-alert-icon">
                      !
                    </div>

                    <div>
                      <strong>Update failed</strong>
                      <p>{error}</p>
                    </div>
                  </div>
                )}

                {/* SUCCESS */}

                {success && (
                  <div className="edit-job-alert edit-job-alert-success">
                    <div className="edit-job-alert-icon">
                      ✓
                    </div>

                    <div>
                      <strong>Success</strong>
                      <p>{success}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  {/* =========================
                      BASIC INFORMATION
                  ========================= */}

                  <div className="edit-job-section">

                    <div className="edit-job-section-title">

                      <span className="edit-job-section-number">
                        01
                      </span>

                      <div>
                        <h4>Basic Information</h4>

                        <p>
                          Provide the main details about this position.
                        </p>
                      </div>

                    </div>

                    <div className="row g-4">

                      {/* TITLE */}

                      <div className="col-12">

                        <label htmlFor="title">
                          Job Title <span>*</span>
                        </label>

                        <input
                          id="title"
                          type="text"
                          name="title"
                          className="edit-job-input"
                          placeholder="e.g. Senior MERN Stack Developer"
                          value={formData.title}
                          onChange={handleChange}
                          disabled={saving}
                        />

                      </div>

                      {/* COMPANY */}

                      <div className="col-md-6">

                        <label htmlFor="company">
                          Company Name <span>*</span>
                        </label>

                        <input
                          id="company"
                          type="text"
                          name="company"
                          className="edit-job-input"
                          placeholder="e.g. HireHub Technologies"
                          value={formData.company}
                          onChange={handleChange}
                          disabled={saving}
                        />

                      </div>

                      {/* LOCATION */}

                      <div className="col-md-6">

                        <label htmlFor="location">
                          Location <span>*</span>
                        </label>

                        <input
                          id="location"
                          type="text"
                          name="location"
                          className="edit-job-input"
                          placeholder="e.g. Bangalore"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={saving}
                        />

                      </div>

                    </div>

                  </div>

                  <div className="edit-job-divider"></div>

                  {/* =========================
                      JOB DETAILS
                  ========================= */}

                  <div className="edit-job-section">

                    <div className="edit-job-section-title">

                      <span className="edit-job-section-number">
                        02
                      </span>

                      <div>
                        <h4>Job Details</h4>

                        <p>
                          Define the type, experience and compensation.
                        </p>
                      </div>

                    </div>

                    <div className="row g-4">

                      {/* JOB TYPE */}

                      <div className="col-md-6">

                        <label htmlFor="jobType">
                          Job Type
                        </label>

                        <select
                          id="jobType"
                          name="jobType"
                          className="edit-job-input edit-job-select"
                          value={formData.jobType}
                          onChange={handleChange}
                          disabled={saving}
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
                          className="edit-job-input edit-job-select"
                          value={formData.experience}
                          onChange={handleChange}
                          disabled={saving}
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

                        <input
                          id="salary"
                          type="text"
                          name="salary"
                          className="edit-job-input"
                          placeholder="e.g. ₹8-12 LPA"
                          value={formData.salary}
                          onChange={handleChange}
                          disabled={saving}
                        />

                        <small>
                          Leave empty if salary is not disclosed.
                        </small>

                      </div>

                    </div>

                  </div>

                  <div className="edit-job-divider"></div>

                  {/* =========================
                      SKILLS
                  ========================= */}

                  <div className="edit-job-section">

                    <div className="edit-job-section-title">

                      <span className="edit-job-section-number">
                        03
                      </span>

                      <div>
                        <h4>Required Skills</h4>

                        <p>
                          Add the technologies and skills candidates
                          should know.
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
                      className="edit-job-input"
                      placeholder="React, Node.js, MongoDB, Express"
                      value={formData.skills}
                      onChange={handleChange}
                      disabled={saving}
                    />

                    <small>
                      Separate multiple skills with commas.
                    </small>

                    {/* SKILL PREVIEW */}

                    {formData.skills.trim() && (
                      <div className="edit-job-skill-preview">

                        <span className="edit-job-preview-label">
                          Skills:
                        </span>

                        {formData.skills
                          .split(",")
                          .map((skill) => skill.trim())
                          .filter(Boolean)
                          .map((skill, index) => (
                            <span
                              className="edit-job-skill"
                              key={`${skill}-${index}`}
                            >
                              {skill}
                            </span>
                          ))}

                      </div>
                    )}

                  </div>

                  <div className="edit-job-divider"></div>

                  {/* =========================
                      DESCRIPTION
                  ========================= */}

                  <div className="edit-job-section">

                    <div className="edit-job-section-title">

                      <span className="edit-job-section-number">
                        04
                      </span>

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
                      className="edit-job-textarea"
                      rows="9"
                      placeholder="Describe the role, responsibilities and requirements..."
                      value={formData.description}
                      onChange={handleChange}
                      disabled={saving}
                    ></textarea>

                    <div className="edit-job-character-row">

                      <small>
                        Minimum 30 characters required.
                      </small>

                      <span
                        className={
                          formData.description.trim().length >= 30
                            ? "character-valid"
                            : ""
                        }
                      >
                        {formData.description.trim().length} characters
                      </span>

                    </div>

                  </div>

                  {/* =========================
                      ACTIONS
                  ========================= */}

                  <div className="edit-job-actions">

                    <Link
                      to="/dashboard"
                      className="edit-job-cancel"
                    >
                      Cancel
                    </Link>

                    <button
                      type="submit"
                      className="edit-job-submit"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="edit-job-spinner"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          ✓ Update Job
                        </>
                      )}
                    </button>

                  </div>

                </form>

              </div>
            </div>

          </div>

          {/* =================================
              SIDEBAR
          ================================= */}

          <div className="col-lg-4">

            <div className="edit-job-sidebar">

              <div className="edit-job-sidebar-icon">
                💡
              </div>

              <h3>Editing Tips</h3>

              <p>
                Make sure your job posting is clear, accurate and
                attractive to potential candidates.
              </p>

              <div className="edit-job-tip">
                <span>01</span>

                <div>
                  <h5>Clear Job Title</h5>

                  <p>
                    Use a specific title that clearly explains the
                    position.
                  </p>
                </div>
              </div>

              <div className="edit-job-tip">
                <span>02</span>

                <div>
                  <h5>Relevant Skills</h5>

                  <p>
                    Add technologies and skills required for the role.
                  </p>
                </div>
              </div>

              <div className="edit-job-tip">
                <span>03</span>

                <div>
                  <h5>Detailed Description</h5>

                  <p>
                    Explain responsibilities and expectations clearly.
                  </p>
                </div>
              </div>

              <div className="edit-job-tip">
                <span>04</span>

                <div>
                  <h5>Accurate Information</h5>

                  <p>
                    Keep location, salary and experience information
                    updated.
                  </p>
                </div>
              </div>

            </div>

            {/* JOB FIELDS */}

            <div className="edit-job-info-card">

              <div className="edit-job-info-icon">
                📋
              </div>

              <h4>Job Fields</h4>

              <p>
                This posting contains the following information:
              </p>

              <div className="edit-job-fields">

                <span>Title</span>
                <span>Company</span>
                <span>Location</span>
                <span>Job Type</span>
                <span>Salary</span>
                <span>Experience</span>
                <span>Skills</span>
                <span>Description</span>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default EditJob;