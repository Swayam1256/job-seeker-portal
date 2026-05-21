import React from "react";

export default function Footer() {
  return (
    <footer className="bg-indigo-50 text-gray-700 py-10 sm:py-12 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 text-center sm:text-left">
          
          {/* ABOUT */}
          <div>
            <h3 className="text-2xl font-extrabold text-indigo-600 mb-3">
              JobSeeker
            </h3>

            <p className="text-sm leading-6 text-gray-600 max-w-sm mx-auto sm:mx-0">
              Find your dream job or hire the right talent effortlessly with
              our modern recruitment platform.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-indigo-600 mb-4 text-lg">
              Quick Links
            </h4>

            <ul className="space-y-3 text-sm">
              {["Jobs", "Employers", "Dashboard", "Contact"].map((item) => (
                <li
                  key={item}
                  className="hover:text-indigo-700 cursor-pointer transition duration-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-indigo-600 mb-4 text-lg">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-gray-600">
              <p className="break-all">📧 support@jobseeker.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 Bhubaneswar, Odisha, India</p>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} JobSeeker. All rights reserved.
        </div>
      </div>
    </footer>
  );
}