import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import SignupComponent from "./pages/SignupComponent";
import LoginPage from "./pages/LoginPage";
import { useState } from "react";
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const AppContent = () => {
  // Add New Job
  const addJob = async (newJob) => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Get the user from sessionStorage
    const token = user ? user.token : null; // Extract the token

    if (!token) {
      console.error("No token found, user not authenticated");
      return false;
    }

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });

    if (res.ok) {
      const createdJob = await res.json();
      console.log("Job created successfully:", createdJob);
      return createdJob;
    } else {
      const errorData = await res.json();
      console.error("Failed to add job:", errorData);
      return false;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Get the user from sessionStorage
    const token = user ? user.token : null; // Extract the token

    if (!token) {
      console.error("No token found, user not authenticated");
      return false;
    }

    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header with the token
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Job deleted successfully");
      return true;
    } else {
      const errorData = await res.json();
      console.error("Failed to delete job:", errorData);
      return false;
    }
  };

  // Update Job
  const updateJob = async (job) => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Get the user from sessionStorage
    const token = user ? user.token : null; // Extract the token

    if (!token) {
      console.error("No token found, user not authenticated");
      return false;
    }

    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    if (res.ok) {
      const updatedJob = await res.json();
      console.log("Job updated successfully:", updatedJob);
      return updatedJob;
    } else {
      const errorData = await res.json();
      console.error("Failed to update job:", errorData);
      return false;
    }
  };

  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob}/>}
          loader={jobLoader}
        />
        
        <Route path="/add-job" element={
          <ProtectedRoute>
            <AddJobPage addJobSubmit={addJob} />
          </ProtectedRoute>
        } />

        <Route path="/edit-job/:id" element={
          <ProtectedRoute>
            <EditJobPage updateJobSubmit={updateJob} />
          </ProtectedRoute>
        }
          loader={jobLoader}
        />

        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
