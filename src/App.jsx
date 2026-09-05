import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import MyApplications from "./pages/MyApplications";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import SavedJobs from "./pages/SavedJobs";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* =====================================
            PUBLIC ROUTES
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/companies"
          element={<Companies />}
        />

        <Route
          path="/companies/:id"
          element={<CompanyDetails />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* =====================================
            LOGGED-IN USERS
        ===================================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            JOB SEEKER ONLY
        ===================================== */}

        <Route
          path="/applications"
          element={
            <ProtectedRoute
              allowedRoles={["jobSeeker"]}
            >
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute
              allowedRoles={["jobSeeker"]}
            >
              <SavedJobs />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            RECRUITER ONLY
        ===================================== */}

        <Route
          path="/post-job"
          element={
            <ProtectedRoute
              allowedRoles={["recruiter"]}
            >
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicants"
          element={
            <ProtectedRoute
              allowedRoles={["recruiter"]}
            >
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id/edit"
          element={
            <ProtectedRoute
              allowedRoles={["recruiter"]}
            >
              <EditJob />
            </ProtectedRoute>
          }
        />

        {/* =====================================
            404 PAGE
        ===================================== */}

        <Route
          path="*"
          element={
            <div
              style={{
                minHeight: "60vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
                padding: "40px",
              }}
            >
              <h1
                style={{
                  fontSize: "80px",
                  fontWeight: "800",
                  marginBottom: "10px",
                }}
              >
                404
              </h1>

              <h2>
                Page Not Found
              </h2>

              <p className="text-muted">
                The page you are looking for
                does not exist.
              </p>
            </div>
          }
        />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;