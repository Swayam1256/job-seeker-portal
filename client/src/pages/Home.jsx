import React from "react";
import { Search, Briefcase, Users, MapPin } from "lucide-react";
import Testimonials from "../components/Testimonials";
import JobNewsletter from "../components/JobNewsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-16 bg-gray-50 overflow-hidden">

      {/* HERO SECTION */}
      <section className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* LEFT SIDE */}
            <div>

              {/* TITLE */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center md:text-left">
                Find the job that fits your life
              </h1>

              {/* SUBTITLE */}
              <p className="mt-2 text-sm sm:text-base text-gray-600 text-center md:text-left">
                Search thousands of verified jobs from top employers
              </p>

              {/* SEARCH BOX */}
              <div className="mt-5 max-w-2xl bg-white border border-gray-300 rounded-xl shadow-sm flex flex-col md:flex-row overflow-hidden">

                {/* JOB TITLE */}
                <div className="flex items-center flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                  <Search className="text-gray-400 w-4 h-4 mr-2" />
                  <input
                    type="text"
                    placeholder="Job title"
                    className="w-full outline-none text-sm"
                  />
                </div>

                {/* LOCATION */}
                <div className="flex items-center flex-1 px-3 py-2 border-b md:border-b-0 md:border-r border-gray-200">
                  <MapPin className="text-gray-400 w-4 h-4 mr-2" />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full outline-none text-sm"
                  />
                </div>

                {/* BUTTON */}
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 text-sm font-semibold w-full md:w-auto">
                  Search Jobs
                </button>

              </div>

              {/* STATS */}
              <div className="mt-5 flex flex-wrap justify-center md:justify-start gap-3 text-sm">

                <div className="flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-full">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>
                    <b className="text-gray-900">10K+</b> Jobs
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-full">
                  <Users className="w-4 h-4 text-indigo-600" />
                  <span>
                    <b className="text-gray-900">5K+</b> Employers
                  </span>
                </div>

              </div>

            </div>

            {/* RIGHT IMAGE */}
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80"
                alt="Job search"
                className="w-full max-w-sm md:max-w-md rounded-2xl shadow-lg"
              />
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

        {/* TESTIMONIALS */}
        <div className="mt-10">
          <Testimonials />
        </div>

        {/* NEWSLETTER */}
        <div className="mt-10">
          <JobNewsletter />
        </div>

      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;