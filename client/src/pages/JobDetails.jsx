import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Briefcase, ArrowLeft } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api, toast, token, user } = useAppContext();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id, api, toast]);

  const hasApplied = () => {
    if (!user || !job?.applicants) return false;

    return job.applicants.some((a) =>
      typeof a === "string"
        ? a === user._id
        : a?.user === user._id
    );
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      await api.post(`/jobs/${id}/apply`);

      toast.success("Applied successfully");

      // refresh job details after applying
      const res = await api.get(`/jobs/${id}`);
      setJob(res.data.job);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to apply"
      );
    } finally {
      setApplying(false);
    }
  };

  if (loading)
    return (
      <p className="pt-28 text-center text-sm sm:text-base">
        Loading...
      </p>
    );

  if (!job)
    return (
      <p className="pt-28 text-center text-sm sm:text-base">
        Job not found
      </p>
    );

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8 md:p-10 border">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 mb-6 sm:mb-8 hover:underline text-sm sm:text-base"
        >
          <ArrowLeft size={18} />
          Back to Jobs
        </button>

        {/* Job Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
          {job.title}
        </h1>

        {/* Job Info */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-5 text-gray-600 mb-6 text-sm sm:text-base">
          <span className="flex items-center gap-2">
            <MapPin size={16} />
            {job.location || "Remote"}
          </span>

          <span className="flex items-center gap-2">
            <Briefcase size={16} />
            {job.postedBy?.name || "Company"}
          </span>

          <span className="font-semibold text-indigo-600">
            💰 {job.salary || "Not disclosed"}
          </span>
        </div>

        {/* Description */}
        <div className="bg-indigo-50 rounded-2xl p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-3">
            Job Description
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            {job.description}
          </p>
        </div>

        {/* Skills */}
        {job.skills?.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Required Skills
            </h2>

            <div className="flex flex-wrap gap-2 sm:gap-3">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 sm:px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs sm:text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        {token && user?.role === "seeker" && (
          <div className="mt-8 sm:mt-10">
            <button
              disabled={hasApplied() || applying}
              onClick={handleApply}
              className={`w-full sm:w-auto px-6 sm:px-8 py-3 rounded-2xl text-sm sm:text-lg font-semibold transition ${
                hasApplied()
                  ? "bg-green-100 text-green-700 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {hasApplied()
                ? "✅ Already Applied"
                : applying
                ? "Applying..."
                : "Apply for this Job"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}