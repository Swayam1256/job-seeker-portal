import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  GraduationCap,
  FileText,
  Image,
  Edit,
  HelpCircle,
  Mail,
  Briefcase,
  Upload,
  Camera,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";

export default function SeekerProfile() {
  const { api, setUser, toast } = useAppContext();

  // CHANGE THIS AFTER DEPLOYMENT
  const baseURL = "http://localhost:5000";

  const [mode, setMode] = useState("details");
  const [savedProfile, setSavedProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
  });

  // FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/profile/me");

        setSavedProfile(res.data.user);
        setUser(res.data.user);

        setForm({
          name: res.data.user.name || "",
          phone: res.data.user.phone || "",
          skills: res.data.user.skills?.join(", ") || "",
          education: res.data.user.education || "",
          experience: res.data.user.experience || "",
        });
      } catch (err) {
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  // PROFILE COMPLETENESS
  const completeness = (() => {
    if (!savedProfile) return 0;

    const fields = [
      savedProfile.name,
      savedProfile.phone,
      savedProfile.skills?.length,
      savedProfile.education,
      savedProfile.experience,
    ];

    return Math.round(
      (fields.filter(Boolean).length / 5) * 100
    );
  })();

  // SAVE PROFILE
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      };

      const res = await api.post(
        "/profile/update",
        payload
      );

      setSavedProfile(res.data.user);
      setUser(res.data.user);

      toast.success("Profile updated successfully");

      setMode("details");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // FILE UPLOAD
  const handleFileUpload = async (e, type) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const fd = new FormData();

      fd.append(type, file);

      const endpoint =
        type === "resume"
          ? "/profile/upload-resume"
          : "/profile/upload-photo";

      await api.post(endpoint, fd);

      const me = await api.get("/profile/me");

      setSavedProfile(me.data.user);
      setUser(me.data.user);

      toast.success(
        `${
          type === "resume"
            ? "Resume"
            : "Profile photo"
        } uploaded successfully`
      );
    } catch (err) {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/40 p-4 sm:p-6 lg:p-8">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Profile
          </h2>

          <p className="text-gray-600 text-sm mt-1">
            Manage your personal information
          </p>
        </div>

        {/* EDIT BUTTON */}
        {mode === "details" && (
          <button
            onClick={() => setMode("edit")}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        )}
      </div>

      {/* COMPLETENESS */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">
            Profile Completeness
          </p>

          <span className="text-sm font-semibold text-indigo-600">
            {completeness}%
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/* EDIT MODE */}
      {mode === "edit" && (
        <form
          onSubmit={handleSave}
          className="space-y-6"
        >
          {/* INPUT GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* NAME */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Phone Number
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      phone: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* EDUCATION */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Education
              </label>

              <div className="relative">
                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Enter education"
                  value={form.education}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      education: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* SKILLS */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Skills
              </label>

              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={form.skills}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      skills: e.target.value,
                    })
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Experience
            </label>

            <textarea
              rows={5}
              placeholder="Describe your experience..."
              value={form.experience}
              onChange={(e) =>
                setForm({
                  ...form,
                  experience: e.target.value,
                })
              }
              className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
            />
          </div>

          {/* FILE UPLOADS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* RESUME */}
            <div className="border border-dashed border-gray-300 rounded-2xl p-5 text-center hover:border-indigo-400 transition">
              <Upload className="w-8 h-8 text-indigo-600 mx-auto mb-3" />

              <h4 className="font-semibold text-gray-800">
                Upload Resume
              </h4>

              <p className="text-sm text-gray-500 mb-4">
                PDF format recommended
              </p>

              <label className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl cursor-pointer hover:bg-indigo-700 transition">
                Choose File

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, "resume")
                  }
                />
              </label>
            </div>

            {/* PHOTO */}
            <div className="border border-dashed border-gray-300 rounded-2xl p-5 text-center hover:border-indigo-400 transition">
              <Camera className="w-8 h-8 text-indigo-600 mx-auto mb-3" />

              <h4 className="font-semibold text-gray-800">
                Upload Photo
              </h4>

              <p className="text-sm text-gray-500 mb-4">
                JPG, PNG supported
              </p>

              <label className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-xl cursor-pointer hover:bg-indigo-700 transition">
                Choose Photo

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleFileUpload(e, "photo")
                  }
                />
              </label>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setMode("details")}
              className="px-5 py-3 border rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}

      {/* DETAILS MODE */}
      {mode === "details" && savedProfile && (
        <div className="space-y-8">
          {/* PROFILE CARD */}
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* PROFILE PHOTO */}
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-gray-100 border-4 border-indigo-100 shadow-md">
                {savedProfile.profilePhoto ? (
                  <img
                    src={`${baseURL}${savedProfile.profilePhoto}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-14 h-14 text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* INFO */}
            <div className="flex-1 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-gray-900">
                {savedProfile.name || "No Name"}
              </h3>

              <div className="space-y-3 mt-5">
                <p className="flex items-center justify-center lg:justify-start gap-3 text-gray-600">
                  <Phone className="w-4 h-4 text-indigo-600" />
                  {savedProfile.phone || "Not added"}
                </p>

                <p className="flex items-center justify-center lg:justify-start gap-3 text-gray-600">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  {savedProfile.education || "Not added"}
                </p>

                <p className="flex items-center justify-center lg:justify-start gap-3 text-gray-600">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  {savedProfile.email}
                </p>
              </div>

              {/* FILE LINKS */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {savedProfile.resume && (
                  <a
                    href={`${baseURL}${savedProfile.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition"
                  >
                    <FileText className="w-4 h-4" />
                    View Resume
                  </a>
                )}

                {savedProfile.profilePhoto && (
                  <a
                    href={`${baseURL}${savedProfile.profilePhoto}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition"
                  >
                    <Image className="w-4 h-4" />
                    View Photo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div className="bg-indigo-50 rounded-2xl p-5">
            <h4 className="font-semibold text-lg mb-4">
              Skills
            </h4>

            {savedProfile.skills?.length > 0 ? (
              <div className="flex flex-wrap gap-3">
                {savedProfile.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-white text-indigo-700 rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No skills added yet
              </p>
            )}
          </div>

          {/* EXPERIENCE */}
          <div className="bg-white border rounded-2xl p-5">
            <h4 className="font-semibold text-lg mb-3">
              Experience
            </h4>

            <p className="text-gray-700 leading-relaxed">
              {savedProfile.experience ||
                "No experience added yet"}
            </p>
          </div>

          {/* HELP BUTTON */}
          <div className="flex justify-center sm:justify-start">
            <button
              onClick={() =>
                alert(
                  "Update your profile, upload resume/photo and keep your skills updated for better job matches."
                )
              }
              className="flex items-center gap-2 px-5 py-3 border rounded-xl hover:bg-gray-50 transition"
            >
              <HelpCircle className="w-4 h-4" />
              Help
            </button>
          </div>
        </div>
      )}
    </div>
  );
}