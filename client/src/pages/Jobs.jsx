import React, { useEffect, useState } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Jobs() {
  const { api, toast, loadingUser } = useAppContext();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  /* ================= FETCH JOBS ================= */
  useEffect(() => {
    if (loadingUser) return;

    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs/all");

        setJobs(res.data.jobs || []);
        setFilteredJobs(res.data.jobs || []);
      } catch {
        toast.error("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [api, loadingUser, toast]);

  /* ================= FILTER JOBS ================= */
  useEffect(() => {
    let results = jobs;

    if (search) {
      results = results.filter((j) =>
        j.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      results = results.filter((j) =>
        j.location?.toLowerCase().includes(location.toLowerCase())
      );
    }

    setFilteredJobs(results);
  }, [search, location, jobs]);

  /* ================= LOADING ================= */
  if (loadingUser || loading) {
    return (
      <p className="pt-28 text-center text-gray-500 text-sm sm:text-base">
        Loading jobs...
      </p>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Explore Job Opportunities
          </h1>

          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Find roles that match your skills & passion
          </p>
        </div>

        {/* ================= FILTER BAR ================= */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-md p-4 mb-8 sm:mb-10 flex flex-col lg:flex-row gap-4 border border-gray-100">

          {/* Search */}
          <div className="flex items-center gap-3 w-full bg-gray-50 rounded-xl px-4 py-3">
            <Search className="text-gray-400" size={18} />

            <input
              className="w-full bg-transparent outline-none text-sm sm:text-base"
              placeholder="Search job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 w-full lg:w-72 bg-gray-50 rounded-xl px-4 py-3">
            <MapPin className="text-gray-400" size={18} />

            <input
              className="w-full bg-transparent outline-none text-sm sm:text-base"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        {/* ================= JOB GRID ================= */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow text-center text-gray-600 text-sm sm:text-base">
            No jobs found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 p-5 sm:p-6 flex flex-col justify-between hover:-translate-y-1"
              >
                {/* Top */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-indigo-600 mb-2 line-clamp-2">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-3 flex flex-wrap gap-2">
                    <span>{job.location || "Remote"}</span>
                    <span>•</span>
                    <span>{job.salary || "Not disclosed"}</span>
                  </p>

                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                    {job.description}
                  </p>

                  {/* Skills */}
                  {job.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {job.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}

                      {job.skills.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{job.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom */}
                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Briefcase size={16} />
                    <span className="truncate">
                      {job.postedBy?.name || "Company"}
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}