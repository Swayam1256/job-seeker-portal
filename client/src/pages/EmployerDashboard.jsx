import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  PlusCircle,
  List,
  Users,
  Search,
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
  const [query, setQuery] = useState("");

  /* ================= FETCH JOB APPLICATIONS ================= */
  const fetchJobs = async () => {
    if (!user || user.role !== "employer") return;
    try {
      const res = await api.get("/jobs/employer/applications");
      setJobs(res.data.jobs || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch applications");
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
    if (!form.title || !form.description)
      return toast.error("Title & description required");

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

  /* ================= UPDATE APPLICATION STATUS ================= */
  const handleStatusChange = async (appId, status) => {
    try {
      await api.patch(`/applications/${appId}/status`, { status });
      toast.success(`Application ${status}`);
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  if (loadingUser) return <p className="pt-28 text-center">Loading...</p>;
  if (!user || user.role !== "employer")
    return (
      <p className="pt-28 text-center text-red-600">Access denied</p>
    );

  return (
    <div className="pt-24 min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex">
      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 fixed left-0 top-24 h-[calc(100vh-6rem)] bg-white/80 backdrop-blur-xl rounded-tr-3xl rounded-br-3xl p-6 shadow-lg border">
        <h3 className="text-xl font-extrabold text-indigo-600 mb-6">
          Employer Panel
        </h3>

        <button
          onClick={() => setActive("post")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full mb-3 transition ${
            active === "post"
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-700 hover:bg-indigo-50"
          }`}
        >
          <PlusCircle /> Post Job
        </button>

        <button
          onClick={() => setActive("myjobs")}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl w-full transition ${
            active === "myjobs"
              ? "bg-indigo-600 text-white shadow"
              : "text-gray-700 hover:bg-indigo-50"
          }`}
        >
          <List /> Applications
        </button>

        <button
          onClick={fetchJobs}
          className="mt-6 flex items-center gap-3 px-4 py-3 w-full rounded-xl bg-white border hover:shadow transition"
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
              <Briefcase /> Post a New Job
            </h2>

            <form className="space-y-4" onSubmit={handlePostJob}>
              {["title", "location", "salary", "skills"].map((field) => (
                <input
                  key={field}
                  placeholder={field}
                  value={form[field]}
                  onChange={(e) =>
                    setForm({ ...form, [field]: e.target.value })
                  }
                  className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-300"
                />
              ))}

              <textarea
                rows={5}
                placeholder="Job Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-4 rounded-xl border focus:ring-2 focus:ring-indigo-300"
              />

              <div className="flex justify-end gap-4">
                <button
                  type="reset"
                  onClick={() =>
                    setForm({
                      title: "",
                      description: "",
                      location: "",
                      salary: "",
                      skills: "",
                    })
                  }
                  className="px-5 py-2 rounded-xl border"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  {loading ? "Posting..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ================= APPLICATIONS ================= */}
        {active === "myjobs" && (
          <div className="space-y-6">
            {jobs.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl shadow">
                No applications received yet.
              </div>
            ) : (
              jobs.map((job) => (
                <div
                  key={job.jobId}
                  className="bg-white rounded-3xl p-6 shadow border"
                >
                  <h3 className="text-lg font-bold text-indigo-600 mb-4">
                    {job.title} ({job.totalApplicants})
                  </h3>

                  {job.applicants.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No applicants yet
                    </p>
                  ) : (
                    job.applicants.map((app) => (
                      <div
                        key={app.applicationId}
                        className="flex justify-between items-center p-4 rounded-xl border mb-3"
                      >
                        <div>
                          <p className="font-medium">{app.name}</p>
                          <p className="text-sm text-gray-500">
                            {app.email}
                          </p>
                          {app.resume && (
                            <a
                              href={app.resume}
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
                                  handleStatusChange(
                                    app.applicationId,
                                    "selected"
                                  )
                                }
                                className="px-3 py-1 bg-green-500 text-white rounded-lg"
                              >
                                Select
                              </button>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    app.applicationId,
                                    "rejected"
                                  )
                                }
                                className="px-3 py-1 bg-red-500 text-white rounded-lg"
                              >
                                Reject
                              </button>
                            </>
                          )}

                          {app.status === "selected" && (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg">
                              Selected
                            </span>
                          )}

                          {app.status === "rejected" && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg">
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
