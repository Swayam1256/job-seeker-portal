import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  PlusCircle,
  List,
  Trash2,
  Briefcase,
  Menu,
  X,
} from "lucide-react";

export default function EmployerDashboard() {
  const { api, user, loadingUser, toast } = useAppContext();

  const [active, setActive] = useState("post");

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    skills: "",
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= FETCH JOBS ================= */
  const fetchJobs = async () => {
    if (!user || user.role !== "employer") return;

    try {
      const res = await api.get("/jobs/employer");

      setJobs(res.data.jobs || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch jobs");
    }
  };

  useEffect(() => {
    if (!loadingUser && user?.role === "employer") {
      fetchJobs();
    }
  }, [loadingUser, user]);

  /* ================= POST JOB ================= */
  const handlePostJob = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description) {
      return toast.error("Title & description required");
    }

    try {
      setLoading(true);

      await api.post("/jobs", {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      });

      toast.success("Job posted successfully");

      setForm({
        title: "",
        description: "",
        location: "",
        salary: "",
        skills: "",
      });

      setActive("myjobs");

      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE JOB ================= */
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${jobId}`);

      toast.success("Job deleted");

      setJobs((prev) => prev.filter((j) => j._id !== jobId));
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  /* ================= UPDATE STATUS ================= */
  const handleStatusChange = async (appId, status) => {
    try {
      await api.patch(`/applications/${appId}/status`, {
        status,
      });

      toast.success(`Application ${status}`);

      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  /* ================= GUARDS ================= */
  if (loadingUser) {
    return <p className="pt-28 text-center">Loading...</p>;
  }

  if (!user || user.role !== "employer") {
    return (
      <p className="pt-28 text-center text-red-600">
        Access denied
      </p>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex">
      
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-24 left-4 z-50 bg-white p-2 rounded-lg shadow"
      >
        <Menu />
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-20 left-0 z-40 h-[calc(100vh-5rem)]
          w-72 bg-white/90 backdrop-blur-xl shadow-lg border
          p-6 transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* CLOSE BUTTON */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <h3 className="text-lg font-bold text-indigo-600">
            Employer Panel
          </h3>

          <button onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>

        <h3 className="hidden lg:block text-xl font-extrabold text-indigo-600 mb-6">
          Employer Panel
        </h3>

        <button
          onClick={() => {
            setActive("post");
            setSidebarOpen(false);
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full mb-3 transition ${
            active === "post"
              ? "bg-indigo-600 text-white"
              : "hover:bg-indigo-50"
          }`}
        >
          <PlusCircle /> Post Job
        </button>

        <button
          onClick={() => {
            setActive("myjobs");
            setSidebarOpen(false);
          }}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition ${
            active === "myjobs"
              ? "bg-indigo-600 text-white"
              : "hover:bg-indigo-50"
          }`}
        >
          <List /> Applications
        </button>
      </aside>

      {/* MAIN */}
      <main className="flex-1 lg:ml-72 p-4 sm:p-6 lg:p-8 w-full">

        {/* POST JOB */}
        {active === "post" && (
          <div className="bg-white rounded-3xl shadow-md p-5 sm:p-8 border max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6 flex items-center gap-2">
              <Briefcase /> Post a Job
            </h2>

            <form onSubmit={handlePostJob} className="space-y-4">
              {["title", "location", "salary", "skills"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      [field]: e.target.value,
                    })
                  }
                  className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
                />
              ))}

              <textarea
                rows={5}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-6 py-3 rounded-xl w-full sm:w-auto"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
            </form>
          </div>
        )}

        {/* APPLICATIONS */}
        {active === "myjobs" && (
          <div className="space-y-6 max-w-5xl mx-auto">

            {jobs.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow">
                No jobs/applications yet
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl p-4 sm:p-6 shadow border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="font-bold text-indigo-600 text-lg">
                      {job.title} ({job.applicants?.length || 0})
                    </h3>

                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-red-500 hover:text-red-700 self-start sm:self-auto"
                    >
                      <Trash2 />
                    </button>
                  </div>

                  {job.applicants?.length === 0 ? (
                    <p>No applicants yet</p>
                  ) : (
                    job.applicants.map((app) => (
                      <div
                        key={app._id}
                        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border p-4 rounded-xl mb-3"
                      >
                        <div className="break-all">
                          <p className="font-semibold">
                            {app.user?.name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {app.user?.email}
                          </p>

                          {app.user?.resume && (
                            <a
                              href={`https://job-seeker-portal-ef92.onrender.com${app.user.resume}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 text-sm underline"
                            >
                              View Resume
                            </a>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    app._id,
                                    "selected"
                                  )
                                }
                                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                              >
                                Select
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    app._id,
                                    "rejected"
                                  )
                                }
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {app.status === "selected" && (
                            <span className="text-green-600 font-medium">
                              Selected
                            </span>
                          )}

                          {app.status === "rejected" && (
                            <span className="text-red-600 font-medium">
                              Rejected
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}