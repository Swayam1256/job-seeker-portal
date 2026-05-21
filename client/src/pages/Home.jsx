import React from "react";
import { Search, Briefcase, Users } from "lucide-react";
import Testimonials from "../components/Testimonials";
import JobNewsletter from "../components/JobNewsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-16 overflow-hidden">

      {/* HERO SECTION (FIXED STRUCTURE ONLY) */}
      <section className="relative bg-linear-to-br from-indigo-50 via-blue-50 to-sky-100">

        {/* Blobs (unchanged) */}
        <div className="absolute top-10 left-0 md:left-10 w-40 md:w-72 h-40 md:h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 right-0 md:right-10 w-40 md:w-72 h-40 md:h-72 bg-sky-200 rounded-full blur-3xl opacity-30"></div>

        {/* MAIN WRAPPER (FIXED PADDING + MOBILE FLOW) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-0 md:min-h-screen flex items-center">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center w-full">

            {/* LEFT CONTENT */}
            <div className="flex flex-col justify-center text-center md:text-left">

              {/* TITLE */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                Find Your{" "}
                <span className="text-indigo-600">Dream Job</span>
                <br className="hidden sm:block" />
                With Confidence
              </h1>

              {/* PARAGRAPH */}
              <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
                Discover verified jobs, connect with trusted employers, and take
                the next step in your career journey — all in one place.
              </p>

              {/* SEARCH (FIXED MOBILE SPACING) */}
              <div className="mt-6 sm:mt-8 bg-white flex flex-col sm:flex-row items-stretch shadow-xl rounded-2xl p-2 sm:p-3 border border-gray-200 gap-2 sm:gap-0">

                <div className="flex items-center flex-1">
                  <Search className="text-gray-400 w-5 h-5 ml-3" />
                  <input
                    type="text"
                    placeholder="Search jobs by title or keyword..."
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 outline-none text-gray-700 rounded-2xl text-sm sm:text-base"
                  />
                </div>

                <button className="w-full sm:w-auto px-5 py-2 sm:py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition">
                  Search
                </button>

              </div>

              {/* STATS (FIXED MOBILE ALIGNMENT) */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-10 max-w-md mx-auto md:mx-0">

                <div className="flex items-center justify-center md:justify-start gap-3 bg-white rounded-2xl p-4 shadow-md w-full">
                  <Briefcase className="text-indigo-600" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      10K+
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Jobs Posted
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-3 bg-white rounded-2xl p-4 shadow-md w-full">
                  <Users className="text-indigo-600" />
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      5K+
                    </h2>
                    <p className="text-gray-600 text-sm">
                      Trusted Employers
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT IMAGE (FIXED MOBILE SIZE CONTROL) */}
            <div className="flex justify-center md:justify-end mt-6 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=700&q=80"
                alt="Job search platform illustration"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-2xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* OTHER SECTIONS (UNCHANGED) */}
      <Testimonials />
      <JobNewsletter />
      <Footer />
    </div>
  );
};

export default Home;