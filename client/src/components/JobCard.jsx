import React from "react";
import { MapPin, Briefcase, IndianRupee } from "lucide-react";

const JobCard = ({ job }) => {
  return (
    <div className="group bg-white border border-gray-100 rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between h-full">
      
      {/* TOP */}
      <div>
        {/* TITLE + TYPE */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <h3 className="text-xl font-bold text-indigo-600 group-hover:text-indigo-700 transition line-clamp-2">
            {job.title}
          </h3>

          {job.type && (
            <span className="w-fit bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {job.type}
            </span>
          )}
        </div>

        {/* COMPANY */}
        <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
          <Briefcase size={16} />
          <p className="line-clamp-1">{job.company}</p>
        </div>

        {/* LOCATION */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <MapPin size={15} />
          <p className="line-clamp-1">{job.location}</p>
        </div>

        {/* SALARY */}
        {job.salary && (
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium mb-4">
            <IndianRupee size={15} />
            <p>{job.salary}</p>
          </div>
        )}

        {/* SKILLS */}
        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {job.skills.slice(0, 4).map((skill, idx) => (
              <span
                key={idx}
                className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}

            {job.skills.length > 4 && (
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                +{job.skills.length - 4} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300">
        View Details
      </button>
    </div>
  );
};

export default JobCard;