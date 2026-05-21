import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import {
  X,
  MapPin,
  Briefcase,
  Search,
  Menu,
} from "lucide-react";

export default function SeekerJobs() {
  const { api, token, user, toast } = useAppContext();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);

  const [search, setSearch] = useState("");
  const [mobileFilter, setMobileFilter] = useState(false);

  // FETCH JOBS
  const fetchJobs = async () => {
    setLoading(true);

    try {
      const res = await api.get("/jobs/all");
      setJobs(res.data.jobs || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [api]);

  // CHECK APPLIED
  const hasApplied = (job) => {
    if (!user || !job.applicants) return false;

    return job.applicants.some((a) =>
      typeof a === "string"
        ? a === user._id
        : a?._id === user._id
    );
  };

  // APPLY JOB
  const applyJob = async (jobId) => {
    if (!token) return toast.error("Please login to apply");

    try {
      setApplyingId(jobId);

      const res = await api.post(
        `/applications/apply/${jobId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message || "Applied successfully ✅");

      setJobs((prev) =>
        prev.map((job) =>
          job._id === jobId
            ? {
                ...job,
                applicants: [
                  ...(job.applicants || []),
                  user._id,
                ],
              }
            : job
        )
      );
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply"
      );
    } finally {
      setApplyingId(null);
    }
  };

  // FILTER JOBS
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <p className="pt-20 text-center text-gray-500 animate-pulse">
        Loading jobs...
      </p>
    );

  return (
    <>
      <div className="pt-4 sm:pt-6 max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
              Available Jobs
            </h2>

            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Explore jobs and apply instantly
            </p>
          </div>

          {/* SEARCH */}
          <div className="flex items-center gap-3 bg-white border rounded-2xl px-4 py-3 shadow-sm w-full lg:max-w-md">
            <Search className="text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm sm:text-base"
            />
          </div>
        </div>

        {/* EMPTY */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-8 text-center text-gray-500">
            No jobs found
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 p-5 sm:p-6"
              >
                {/* TOP */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
                  {/* LEFT */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-indigo-600">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={15} />
                        {job.location}
                      </span>

                      <span className="flex items-center gap-1">
                        <Briefcase size={15} />
                        {job.salary}
                      </span>
                    </div>

                    <p className="text-gray-700 mt-4 line-clamp-3 text-sm sm:text-base">
                      {job.description}
                    </p>

                    {/* SKILLS */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills?.map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-row lg:flex-col gap-3 lg:min-w-[170px]">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-indigo-200 text-indigo-600 font-semibold hover:bg-indigo-50 transition"
                    >
                      Details
                    </button>

                    <button
                      onClick={() => applyJob(job._id)}
                      disabled={
                        applyingId === job._id ||
                        hasApplied(job)
                      }
                      className={`flex-1 px-4 py-2.5 rounded-xl text-white font-semibold transition ${
                        hasApplied(job)
                          ? "bg-green-500 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      {hasApplied(job)
                        ? "✅ Applied"
                        : applyingId === job._id
                        ? "Applying..."
                        : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-6">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* CLOSE */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
            >
              <X />
            </button>

            {/* CONTENT */}
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-indigo-600 mb-3">
                {selectedJob.title}
              </h3>

              <div className="flex flex-wrap gap-4 text-gray-500 mb-6 text-sm sm:text-base">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {selectedJob.location}
                </span>

                <span className="flex items-center gap-1">
                  <Briefcase size={16} />
                  {selectedJob.salary}
                </span>
              </div>

              <div className="bg-indigo-50 rounded-2xl p-5 mb-6">
                <h4 className="font-semibold text-lg mb-2">
                  Job Description
                </h4>

                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {selectedJob.description}
                </p>
              </div>

              {/* SKILLS */}
              {selectedJob.skills?.length > 0 && (
                <>
                  <h4 className="font-semibold text-lg mb-3">
                    Required Skills
                  </h4>

                  <div className="flex flex-wrap gap-2">
                    {selectedJob.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* APPLY BUTTON */}
              <button
                onClick={() => applyJob(selectedJob._id)}
                disabled={
                  applyingId === selectedJob._id ||
                  hasApplied(selectedJob)
                }
                className={`w-full mt-8 py-3 rounded-2xl text-white font-semibold transition ${
                  hasApplied(selectedJob)
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {hasApplied(selectedJob)
                  ? "✅ Already Applied"
                  : applyingId === selectedJob._id
                  ? "Applying..."
                  : "Apply Now"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}