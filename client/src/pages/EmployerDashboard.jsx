import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  PlusCircle,
  List,
  Users,
  Trash2,
  Briefcase,
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

  /* ================= FETCH JOBS + APPLICATIONS ================= */
  const fetchJobs = async () => {
    if (!user || user.role !== "employer") return;

    try {
      const res = await api.get("/jobs/employer"); // ✅ FIXED
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

      toast.success("Job posted successfully ✅");

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

  /* ================= UPDATE APPLICATION STATUS ================= */
  const handleStatusChange = async (appId, status) => {
    try {
      await api.patch(`/applications/${appId}/status`, { status });
      toast.success(`Application ${status}`);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  /* ================= GUARDS ================= */
  if (loadingUser) return <p className="pt-28 text-center">Loading...</p>;

  if (!user || user.role !== "employer") {
    return (
      <p className="pt-28 text-center text-red-600">
        Access denied
      </p>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 fixed left-0 top-24 h-[calc(100vh-6rem)] bg-white/80 backdrop-blur-xl rounded-tr-3xl rounded-br-3xl p-6 shadow-lg border">
        <h3 className="text-xl font-extrabold text-indigo-600 mb-6">
          Employer Panel
        </h3>

        <button
          onClick={() => setActive("post")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full mb-3 ${
            active === "post"
              ? "bg-indigo-600 text-white"
              : "hover:bg-indigo-50"
          }`}
        >
          <PlusCircle /> Post Job
        </button>

        <button
          onClick={() => setActive("myjobs")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full ${
            active === "myjobs"
              ? "bg-indigo-600 text-white"
              : "hover:bg-indigo-50"
          }`}
        >
          <List /> Applications
        </button>

        <button
          onClick={fetchJobs}
          className="mt-6 flex items-center gap-3 px-4 py-3 w-full rounded-xl border hover:shadow"
        >
          <Users className="text-indigo-600" /> Refresh
        </button>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="ml-72 flex-1 p-8 max-w-5xl">
        
        {/* ================= POST JOB ================= */}
        {active === "post" && (
          <div className="bg-white rounded-3xl shadow-md p-8 border">
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
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="w-full p-4 border rounded-xl"
                />
              ))}

              <textarea
                rows={5}
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-4 border rounded-xl"
              />

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
              >
                {loading ? "Posting..." : "Post Job"}
              </button>
            </form>
          </div>
        )}

        {/* ================= APPLICATIONS ================= */}
        {active === "myjobs" && (
          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow">
                No jobs/applications yet
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-2xl p-6 shadow border"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-indigo-600">
                      {job.title} ({job.applicants?.length || 0})
                    </h3>

                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="text-red-500"
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
                        className="flex justify-between items-center border p-3 rounded-lg mb-2"
                      >
                        <div>
                          <p>{app.user?.name}</p>
                          <p className="text-sm text-gray-500">
                            {app.user?.email}
                          </p>

                          {app.user?.resume && (
                            <a
                              href={`http://localhost:5000${app.user.resume}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 text-sm underline"
                            >
                              View Resume
                            </a>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {app.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(app._id, "selected")
                                }
                                className="bg-green-500 text-white px-3 py-1 rounded"
                              >
                                Select
                              </button>

                              <button
                                onClick={() =>
                                  handleStatusChange(app._id, "rejected")
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {app.status === "selected" && (
                            <span className="text-green-600">Selected</span>
                          )}

                          {app.status === "rejected" && (
                            <span className="text-red-600">Rejected</span>
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
