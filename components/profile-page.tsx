"use client";

import { useState, useRef, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  department?: string;
  joinDate?: string;
}

interface ProfilePageProps {
  profile: ProfileData;
  onClose?: () => void;
  onUpdate?: (data: ProfileData) => void;
}

export function ProfilePage({ profile, onClose, onUpdate }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone || "",
    department: profile.department || "",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdate?.({ ...profile, ...form });
    setIsEditing(false);
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">MY PROFILE</h1>
          <p className="text-sm text-gray-500 mt-0.5">View and manage your account information</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Close
          </button>
        )}
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-lg animate-[fadeUp_0.2s_ease_both]">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              {profile.avatar ? (
                <img src={profile.avatar} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </div>
            <h2 className="text-lg font-bold text-gray-900">{profile.name}</h2>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 mt-2">
              {profile.role}
            </span>
            <p className="text-sm text-gray-500 mt-2">{profile.email}</p>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <span className="text-gray-600">{profile.department || "Registrar Department"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-gray-600">Joined {profile.joinDate || "June 2024"}</span>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-gray-800">Personal Information</h3>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setIsEditing(false); setForm({ name: profile.name, email: profile.email, phone: profile.phone || "", department: profile.department || "" }); }}
                  className="px-3 py-1.5 text-xs font-semibold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  disabled={!isEditing}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    isEditing ? "border-gray-200 focus:border-emerald-500 bg-white" : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  disabled={!isEditing}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    isEditing ? "border-gray-200 focus:border-emerald-500 bg-white" : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value.replace(/\D/g, "").slice(0, 11))}
                  disabled={!isEditing}
                  placeholder="09XXXXXXXXX"
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    isEditing ? "border-gray-200 focus:border-emerald-500 bg-white" : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                />
              </div>
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Department</label>
                <input
                  type="text"
                  value={form.department}
                  onChange={(e) => set("department", e.target.value)}
                  disabled={!isEditing}
                  className={`font-sans w-full px-3.5 py-2.5 border-[1.5px] rounded-lg text-sm outline-none transition-colors ${
                    isEditing ? "border-gray-200 focus:border-emerald-500 bg-white" : "border-transparent bg-gray-50 text-gray-700"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Change Password Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-white transition-colors"
                  />
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
