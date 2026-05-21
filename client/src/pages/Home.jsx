import React from "react";
import { Search, Briefcase, Users, MapPin } from "lucide-react";
import Testimonials from "../components/Testimonials";
import JobNewsletter from "../components/JobNewsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-16 bg-gray-50 overflow-hidden">

      {/* HERO */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
            Find the job that fits your life
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-600 text-center md:text-left">
            Search thousands of verified jobs from top employers
          </p>

          {/* SMALL SEARCH BOX (LinkedIn style) */}
          <div className="mt-5 max-w-3xl bg-white border border-gray-300 rounded-full shadow-sm flex flex-col md:flex-row overflow-hidden">

            {/* Job title */}
            <div className="flex items-center flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Job title"
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Location */}
            <div className="flex items-center flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Button */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 text-sm font-semibold transition w-full md:w-auto">
              Search Jobs
            </button>
          </div>

          {/* STATS (SIDE BY SIDE PILL STYLE) */}
          <div className="mt-5 flex flex-row flex-wrap justify-center md:justify-start gap-3 text-sm">

            <div className="flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-full">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span className="text-gray-700">
                <b className="text-gray-900">10K+</b> Jobs
              </span>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-full">
              <Users className="w-4 h-4 text-indigo-600" />
              <span className="text-gray-700">
                <b className="text-gray-900">5K+</b> Employers
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Live hiring now
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* CATEGORY CHIPS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">

          {["IT Jobs", "Marketing", "Design", "Finance", "Remote", "Internships"].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl py-2 px-3 text-center text-sm hover:shadow-md hover:border-indigo-300 cursor-pointer transition"
            >
              {item}
            </div>
          ))}

        </div>

        {/* SECTIONS */}
        <div className="mt-10">
          <Testimonials />
        </div>

        <div className="mt-10">
          <JobNewsletter />
        </div>

      </section>

      <Footer />
    </div>
  );
};

export default Home;