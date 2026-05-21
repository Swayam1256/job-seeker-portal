import React from "react";
import { Search, Briefcase, Users, MapPin } from "lucide-react";
import Testimonials from "../components/Testimonials";
import JobNewsletter from "../components/JobNewsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-16 bg-gray-50 overflow-hidden">

      {/* HERO - LinkedIn style compact header */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
            Find the job that fits your life
          </h1>

          <p className="mt-2 text-sm sm:text-base text-gray-600 text-center md:text-left">
            Search thousands of verified jobs from top employers
          </p>

          {/* SEARCH BAR (LinkedIn style) */}
          <div className="mt-6 bg-white border border-gray-300 rounded-full shadow-sm flex flex-col md:flex-row items-stretch md:items-center overflow-hidden">

            {/* Job Title */}
            <div className="flex items-center flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <Search className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Job title or keyword"
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Location */}
            <div className="flex items-center flex-1 px-4 py-3 border-b md:border-b-0 md:border-r border-gray-200">
              <MapPin className="text-gray-400 w-4 h-4 mr-2" />
              <input
                type="text"
                placeholder="Location"
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Button */}
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-sm font-semibold transition w-full md:w-auto">
              Search Jobs
            </button>
          </div>

          {/* QUICK STATS (Naukri style strip) */}
          <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">

            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-indigo-600" />
              <span><b className="text-gray-900">10K+</b> Jobs</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600" />
              <span><b className="text-gray-900">5K+</b> Employers</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Live hiring now</span>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT (clean spacing like job portals) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Optional: quick categories like LinkedIn */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">

          {["IT Jobs", "Marketing", "Design", "Finance", "Remote", "Internships"].map((item, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-3 text-center text-sm hover:shadow-md cursor-pointer transition"
            >
              {item}
            </div>
          ))}

        </div>

        {/* Sections */}
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