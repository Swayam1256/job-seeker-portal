import React, { useState } from "react";
import {
  User,
  Briefcase,
  FileText,
  Menu,
  X,
} from "lucide-react";

import SeekerProfile from "./SeekerProfile";
import SeekerJobs from "./SeekerJobs";
import SeekerApplications from "./SeekerApplications";

export default function SeekerDashboard() {
  const [tab, setTab] = useState("profile");
  const [mobileMenu, setMobileMenu] = useState(false);

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "jobs", label: "Jobs", icon: Briefcase },
    { key: "applications", label: "Applications", icon: FileText },
  ];

  return (
    <div className="pt-24 sm:pt-28 min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* DASHBOARD CONTAINER */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/40 overflow-hidden">
          
          {/* HEADER */}
          <div className="p-5 sm:p-8 border-b border-gray-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Seeker Dashboard
                </h1>

                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Manage your profile, explore jobs, and track applications
                </p>
              </div>

              {/* MOBILE MENU BUTTON */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden p-2 rounded-lg border border-gray-200"
              >
                {mobileMenu ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            {/* DESKTOP TABS */}
            <div className="hidden md:flex flex-wrap gap-3 mt-8">
              {tabs.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all ${
                    tab === key
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* MOBILE TABS */}
            {mobileMenu && (
              <div className="md:hidden flex flex-col gap-3 mt-6">
                {tabs.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => {
                      setTab(key);
                      setMobileMenu(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                      tab === key
                        ? "bg-indigo-600 text-white shadow-md"
                        : "bg-white border border-gray-200 text-gray-700 hover:bg-indigo-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="p-4 sm:p-6 md:p-8 animate-fade-in">
            {tab === "profile" && <SeekerProfile />}
            {tab === "jobs" && <SeekerJobs />}
            {tab === "applications" && <SeekerApplications />}
          </div>
        </div>
      </div>
    </div>
  );
}