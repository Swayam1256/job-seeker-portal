import React, { useEffect, useState } from "react";
import {
  User,
  Phone,
  GraduationCap,
  FileText,
  Image,
  Edit,
  HelpCircle,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";

export default function SeekerProfile() {
  const { api, setUser, toast } = useAppContext();
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

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/profile/me");
      setSavedProfile(res.data.user);
      setUser(res.data.user);
    };
    fetchProfile();
  }, []);

  const completeness = (() => {
    if (!savedProfile) return 0;
    const fields = [
      savedProfile.name,
      savedProfile.phone,
      savedProfile.skills?.length,
      savedProfile.education,
      savedProfile.experience,
    ];
    return Math.round((fields.filter(Boolean).length / 5) * 100);
  })();

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      const res = await api.post("/profile/update", payload);
      setSavedProfile(res.data.user);
      setUser(res.data.user);
      setForm({
        name: "",
        phone: "",
        skills: "",
        education: "",
        experience: "",
      });
      toast.success("Profile updated successfully");
      setMode("details");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e, type) => {
    const fd = new FormData();
    fd.append(type, e.target.files[0]);
    const endpoint =
      type === "resume" ? "/profile/upload-resume" : "/profile/upload-photo";
    await api.post(endpoint, fd);
    const me = await api.get("/profile/me");
    setSavedProfile(me.data.user);
    setUser(me.data.user);
    toast.success(`${type} uploaded`);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/40 p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-600 text-sm">
          Manage your personal information
        </p>
      </div>

      {/* COMPLETENESS */}
      <div className="mb-8">
        <p className="text-sm text-gray-600 mb-2">
          Profile completeness: <b>{completeness}%</b>
        </p>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all"
            style={{ width: `${completeness}%` }}
          />
        </div>
      </div>

      {/*  EDIT MODE  */}
      {mode === "edit" && (
        <form onSubmit={handleSave} className="grid md:grid-cols-2 gap-6">
          {[
            ["Full Name", "name"],
            ["Phone", "phone"],
            ["Education", "education"],
            ["Skills (comma separated)", "skills"],
          ].map(([label, field]) => (
            <input
              key={field}
              placeholder={label}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
            />
          ))}

          <textarea
            placeholder="Experience"
            rows={4}
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="md:col-span-2 p-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
          />

          {/* UPLOADS */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <FileText className="w-4 h-4" /> Upload Resume
            </label>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, "resume")}
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1">
              <Image className="w-4 h-4" /> Upload Photo
            </label>
            <input type="file" onChange={(e) => handleFileUpload(e, "photo")} />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setMode("details")}
              className="px-4 py-2 border rounded-xl"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      )}

      {/*  DETAILS MODE  */}
      {mode === "details" && savedProfile && (
        <div className="space-y-8">
          {/* BASIC INFO */}
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {savedProfile.profilePhoto ? (
                <img
                  src={`${baseURL}${savedProfile.profilePhoto}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-gray-400" />
              )}
            </div>

            <div className="space-y-1">
              <p className="text-xl font-semibold">{savedProfile.name}</p>
              <p className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" /> {savedProfile.phone || "N/A"}
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <GraduationCap className="w-4 h-4" />{" "}
                {savedProfile.education || "N/A"}
              </p>

              <div className="flex flex-col gap-1">
                {savedProfile.resume && (
                  <a
                    href={`${baseURL}${savedProfile.resume}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline text-sm hover:text-indigo-700"
                  >
                    📄 View Resume
                  </a>
                )}

                {savedProfile.profilePhoto && (
                  <a
                    href={`${baseURL}${savedProfile.profilePhoto}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 underline text-sm hover:text-indigo-700"
                  >
                    🖼 View Photo
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* SKILLS */}
          <div>
            <h4 className="font-semibold mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {savedProfile.skills?.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* EXPERIENCE */}
          <div>
            <h4 className="font-semibold mb-1">Experience</h4>
            <p className="text-gray-700">
              {savedProfile.experience || "Not added yet"}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="flex gap-3">
            <button
              onClick={() => setMode("edit")}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              <Edit className="w-4 h-4" /> Edit Profile
            </button>

            <button
              className="flex items-center gap-2 px-5 py-2 border rounded-xl"
              onClick={() =>
                alert(
                  "Edit your profile, upload resume & photo. Everything auto-saves."
                )
              }
            >
              <HelpCircle className="w-4 h-4" /> Help
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
