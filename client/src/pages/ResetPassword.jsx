import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { api } = useAppContext();

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  /* ================= RESET PASSWORD ================= */
  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (password !== confirm) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      toast.success(res.data.message);

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid or expired link"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-white to-purple-100 px-4 sm:px-6 py-10">

      {/* CARD */}
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border border-white/40 p-6 sm:p-8 md:p-10">

        {/* HEADER */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-100 p-4 rounded-full">
              <ShieldCheck className="text-indigo-600 w-8 h-8" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Reset Password
          </h2>

          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Create a strong new password for your account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleReset} className="space-y-5">

          {/* NEW PASSWORD */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              className="w-full pl-11 pr-12 py-3 sm:py-3.5 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm sm:text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full pl-11 pr-12 py-3 sm:py-3.5 rounded-xl border border-gray-200 bg-white/70 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm sm:text-base"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showConfirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 sm:py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-70 text-sm sm:text-base"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-center mt-6 text-gray-700 text-sm sm:text-base">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;