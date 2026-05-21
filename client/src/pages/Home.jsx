import React from "react";
import { Search, Briefcase, Users } from "lucide-react";
import Testimonials from "../components/Testimonials";
import JobNewsletter from "../components/JobNewsletter";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="mt-16 overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] md:min-h-screen bg-linear-to-br from-indigo-50 via-blue-50 to-sky-100 flex items-center py-10 sm:py-12 md:py-0">

        {/* Decorative Blobs (hidden on small screens for performance) */}
        <div className="hidden sm:block absolute top-10 left-0 md:left-10 w-52 md:w-72 h-52 md:h-72 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>
        <div className="hidden sm:block absolute bottom-10 right-0 md:right-10 w-52 md:w-72 h-52 md:h-72 bg-sky-200 rounded-full blur-3xl opacity-30"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Left Content */}
          <div className="flex flex-col justify-center text-center md:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Find Your{" "}
              <span className="text-indigo-600">Dream Job</span>
              <br className="hidden sm:block" />
              With Confidence
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
              Discover verified jobs, connect with trusted employers, and take
              the next step in your career journey — all in one place.
            </p>

            {/* Search Bar */}
            <div className="mt-6 sm:mt-8 bg-white flex flex-col sm:flex-row items-stretch shadow-lg rounded-2xl p-2 sm:p-3 border border-gray-200 gap-2 sm:gap-0">

              <div className="flex items-center flex-1">
                <Search className="text-gray-400 w-5 h-5 ml-3" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 outline-none text-gray-700 rounded-2xl text-sm sm:text-base"
                />
              </div>

              <button className="w-full sm:w-auto px-5 py-2 sm:py-3 bg-indigo-600 text-white font-semibold rounded-2xl hover:bg-indigo-700 transition">
                Search
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 sm:gap-5 mt-8 max-w-md mx-auto md:mx-0">

              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Briefcase className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    10K+
                  </h2>
                </div>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base text-center md:text-left">
                  Jobs Posted
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <Users className="text-indigo-600 w-5 h-5 sm:w-6 sm:h-6" />
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                    5K+
                  </h2>
                </div>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm md:text-base text-center md:text-left">
                  Trusted Employers
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center mt-6 md:mt-0">
            <img
              src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=700&q=80"
              alt="Job search platform illustration"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* Extra Sections */}
      <Testimonials />
      <JobNewsletter />
      <Footer />
    </div>
  );
};

export default Home;