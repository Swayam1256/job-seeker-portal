import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Briefcase, Menu, X } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { token, user, logout } = useAppContext();
  const location = useLocation();

  const navLink = (to, label) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className={`relative text-sm font-medium transition-all duration-300
          ${
            isActive
              ? "text-indigo-600"
              : "text-gray-700 hover:text-indigo-600"
          }
        `}
      >
        {label}

        {isActive && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 rounded-full"></span>
        )}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* ================= LOGO ================= */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 transition">
            <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
          </div>

          <span className="text-lg sm:text-xl font-extrabold text-gray-800 tracking-wide">
            JobSeeker
          </span>
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLink("/", "Home")}
          {navLink("/jobs", "Jobs")}
          {navLink("/about", "About")}

          <div className="flex items-center gap-3">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/seeker-dashboard"
                  }
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition shadow-md"
                >
                  Dashboard
                </Link>

                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200 px-5 py-6 flex flex-col gap-5 text-center shadow-lg">
          
          {/* NAV LINKS */}
          <div className="flex flex-col gap-5">
            {navLink("/", "Home")}
            {navLink("/jobs", "Jobs")}
            {navLink("/about", "About")}
          </div>

          {/* AUTH BUTTONS */}
          <div className="flex flex-col gap-3 pt-4 border-t">
            {!token ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-3 rounded-xl border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition font-medium"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={
                    user?.role === "employer"
                      ? "/employer-dashboard"
                      : "/seeker-dashboard"
                  }
                  onClick={() => setOpen(false)}
                  className="w-full px-4 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition font-medium"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-50 transition font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;