import React from "react";
import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      message:
        "I got my first job within 2 weeks using this platform!",
    },
    {
      name: "Ananya Verma",
      role: "UI/UX Designer",
      message:
        "Very easy to use and employers respond quickly.",
    },
    {
      name: "Amit Singh",
      role: "Backend Developer",
      message:
        "Clean UI and genuine job postings. Highly recommended.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700">
            What Job Seekers Say
          </h2>

          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Thousands of users trust our platform to find their dream jobs
            and connect with top employers.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-5 sm:p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Stars */}
              <div className="flex items-center flex-wrap mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1"
                  />
                ))}
              </div>

              {/* Message */}
              <p className="text-gray-700 text-sm sm:text-base italic leading-relaxed mb-6">
                “{r.message}”
              </p>

              {/* User */}
              <div>
                <h4 className="font-semibold text-indigo-600 text-base sm:text-lg">
                  {r.name}
                </h4>

                <span className="text-sm text-gray-500">
                  {r.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}