import React, { useState } from "react";
import { PlusCircle, List, Menu, X } from "lucide-react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false);

  const tabs = [
    {
      key: "post-job",
      label: "Post Job",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      key: "my-jobs",
      label: "My Jobs",
      icon: <List className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
        <h2 className="text-lg font-bold text-indigo-600">
          Employer Dashboard
        </h2>

        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg bg-indigo-50 text-indigo-600"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          h-screen md:min-h-screen
          w-72 sm:w-64
          bg-white shadow-lg
          rounded-r-2xl md:rounded-tr-2xl md:rounded-br-2xl
          p-6 flex flex-col gap-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <div className="flex items-center justify-between md:block">
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">
            Employer Dashboard
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              setOpen(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all w-full text-sm sm:text-base ${
              activeTab === tab.key
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-700 hover:bg-indigo-50"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </aside>
    </>
  );
};

export default Sidebar;