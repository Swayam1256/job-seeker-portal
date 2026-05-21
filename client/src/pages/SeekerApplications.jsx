import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CheckCircle, XCircle, Clock, MapPin } from "lucide-react";

export default function SeekerApplications() {
  const { api, toast, token } = useAppContext();

  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchApps = async () => {
      try {
        const res = await api.get("/applications/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApps(res.data.applications || []);
      } catch (err) {
        toast.error(
          err.response?.data?.message || "Failed to load applications"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, [api, token, toast]);

  const getStatusStyle = (status) => {
    switch (status) {
      case "selected":
        return {
          color: "bg-green-100 text-green-700",
          icon: CheckCircle,
        };

      case "rejected":
        return {
          color: "bg-red-100 text-red-700",
          icon: XCircle,
        };

      default:
        return {
          color: "bg-yellow-100 text-yellow-700",
          icon: Clock,
        };
    }
  };

  if (loading) {
    return (
      <div className="pt-28 min-h-screen flex items-center justify-center px-4">
        <p className="text-gray-500 text-center animate-pulse text-sm sm:text-base">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600">
            My Applications
          </h1>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Track the status of your job applications
          </p>
        </div>

        {/* EMPTY */}
        {apps.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 text-center">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Start applying for jobs to see updates here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {apps.map((app) => {
              const { color, icon: StatusIcon } = getStatusStyle(app.status);

              return (
                <div
                  key={app._id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5"
                >
                  {/* LEFT */}
                  <div className="flex-1">
                    <h2 className="text-lg sm:text-xl font-bold text-indigo-600">
                      {app.job?.title || "Job Title"}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-gray-500 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin size={15} />
                        {app.job?.location || "Location not available"}
                      </span>

                      <span>
                        💰 {app.job?.salary || "Salary not disclosed"}
                      </span>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm mt-3">
                      Applied on{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* STATUS */}
                  <div
                    className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold text-sm w-fit ${color}`}
                  >
                    <StatusIcon className="w-4 h-4" />

                    <span className="capitalize">
                      {app.status || "pending"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}