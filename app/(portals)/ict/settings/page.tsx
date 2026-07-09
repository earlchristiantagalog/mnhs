"use client";

import { useState } from "react";
import { sanitizeGeneral } from "@/lib/sanitize";

const tabs = [
  { id: "homepage", label: "Homepage", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "programs", label: "Programs", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { id: "contacts", label: "Contacts", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "global", label: "Global", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

interface SettingsData {
  homepage: { heroTitle: string; heroSubtitle: string; statsLabel1: string; statsValue1: string; statsLabel2: string; statsValue2: string; statsLabel3: string; statsValue3: string; statsLabel4: string; statsValue4: string; };
  about: { title: string; mission: string; vision: string; coreValues: string; history: string; };
  programs: { shsTitle: string; shsDesc: string; stemTitle: string; stemDesc: string; abmTitle: string; abmDesc: string; humssTitle: string; humssDesc: string; tvlTitle: string; tvlDesc: string; };
  contacts: { email: string; phone: string; address: string; facebook: string; website: string; officeHours: string; };
  global: { schoolName: string; syLabel: string; tagline: string; footerText: string; primaryColor: string; };
}

const initialData: SettingsData = {
  homepage: {
    heroTitle: "Mabolo National High School",
    heroSubtitle: "Empowering minds, building character, and shaping the future through quality education since 1985.",
    statsLabel1: "Students", statsValue1: "2,500+",
    statsLabel2: "Faculty & Staff", statsValue2: "120+",
    statsLabel3: "Years of Excellence", statsValue3: "40",
    statsLabel4: "Pass Rate", statsValue4: "98%",
  },
  about: {
    title: "A Legacy of Learning Since 1985",
    mission: "To provide quality basic education that develops holistically Filipino learners equipped with 21st-century skills.",
    vision: "A premier institution of learning producing globally competitive, morally upright, and socially responsible citizens.",
    coreValues: "Maka-Diyos, Maka-Tao, Makakalikasan, at Makabansa.",
    history: "Mabolo National High School has been a pillar of academic excellence in Cebu City for over four decades.",
  },
  programs: {
    shsTitle: "Senior High School Academic Programs",
    shsDesc: "Choose the strand that aligns with your passion and career goals.",
    stemTitle: "STEM", stemDesc: "Science, Technology, Engineering, and Mathematics.",
    abmTitle: "ABM", abmDesc: "Accountancy, Business, and Management.",
    humssTitle: "HUMSS", humssDesc: "Humanities and Social Sciences.",
    tvlTitle: "TVL", tvlDesc: "Technical-Vocational-Livelihood.",
  },
  contacts: {
    email: "info@mnhs.edu.ph",
    phone: "(032) 123-4567",
    address: "Mabolo, Cebu City, Philippines",
    facebook: "facebook.com/mnhs",
    website: "mnhs.edu.ph",
    officeHours: "7:00 AM - 4:00 PM (Mon - Fri)",
  },
  global: {
    schoolName: "Mabolo National High School",
    syLabel: "2025–2026",
    tagline: "Empowering minds, building character, and shaping the future.",
    footerText: "© 2026 MNHS. All rights reserved.",
    primaryColor: "#8B1010",
  },
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("homepage");
  const [data, setData] = useState<SettingsData>(initialData);
  const [successMsg, setSuccessMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (tab: keyof SettingsData, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: sanitizeGeneral(value).slice(0, 500) },
    }));
  };

  const handleSave = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      setSuccessMsg(`${tabs.find((t) => t.id === activeTab)?.label} settings saved successfully!`);
      setTimeout(() => setSuccessMsg(""), 3000);
    } finally {
      setSubmitting(false);
    }
  };

  const renderInput = (label: string, field: string, value: string, tab: keyof SettingsData, type = "text", placeholder = "") => (
    <div>
      <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => update(tab, field, e.target.value)}
        placeholder={placeholder}
        className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors"
      />
    </div>
  );

  const renderTextarea = (label: string, field: string, value: string, tab: keyof SettingsData, placeholder = "") => (
    <div>
      <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">{label}</label>
      <textarea
        value={value}
        onChange={(e) => update(tab, field, e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="font-sans w-full px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors resize-none"
      />
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "homepage":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Hero Section</h3>
              <p className="text-[11px] text-gray-400 mb-4">Configure the main hero banner on the homepage</p>
              <div className="space-y-4">
                {renderInput("Hero Title", "heroTitle", data.homepage.heroTitle, "homepage", "text", "School name")}
                {renderTextarea("Hero Subtitle", "heroSubtitle", data.homepage.heroSubtitle, "homepage", "Tagline or description")}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-800 mb-1">Statistics Bar</h3>
              <p className="text-[11px] text-gray-400 mb-4">Configure the stats displayed below the hero</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderInput("Stat 1 Label", "statsLabel1", data.homepage.statsLabel1, "homepage", "text", "e.g. Students")}
                {renderInput("Stat 1 Value", "statsValue1", data.homepage.statsValue1, "homepage", "text", "e.g. 2,500+")}
                {renderInput("Stat 2 Label", "statsLabel2", data.homepage.statsLabel2, "homepage", "text", "e.g. Faculty")}
                {renderInput("Stat 2 Value", "statsValue2", data.homepage.statsValue2, "homepage", "text", "e.g. 120+")}
                {renderInput("Stat 3 Label", "statsLabel3", data.homepage.statsLabel3, "homepage", "text", "e.g. Years")}
                {renderInput("Stat 3 Value", "statsValue3", data.homepage.statsValue3, "homepage", "text", "e.g. 40")}
                {renderInput("Stat 4 Label", "statsLabel4", data.homepage.statsLabel4, "homepage", "text", "e.g. Pass Rate")}
                {renderInput("Stat 4 Value", "statsValue4", data.homepage.statsValue4, "homepage", "text", "e.g. 98%")}
              </div>
            </div>
          </div>
        );
      case "about":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">About Section</h3>
              <p className="text-[11px] text-gray-400 mb-4">Configure the about page content</p>
              <div className="space-y-4">
                {renderInput("Section Title", "title", data.about.title, "about", "text", "About section title")}
                {renderTextarea("Mission", "mission", data.about.mission, "about", "School mission statement")}
                {renderTextarea("Vision", "vision", data.about.vision, "about", "School vision statement")}
                {renderTextarea("Core Values", "coreValues", data.about.coreValues, "about", "Core values")}
                {renderTextarea("History", "history", data.about.history, "about", "Brief school history")}
              </div>
            </div>
          </div>
        );
      case "programs":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Programs Section</h3>
              <p className="text-[11px] text-gray-400 mb-4">Configure the SHS programs and strands</p>
              <div className="space-y-4">
                {renderInput("Programs Title", "shsTitle", data.programs.shsTitle, "programs", "text", "Section title")}
                {renderTextarea("Programs Description", "shsDesc", data.programs.shsDesc, "programs", "Section description")}
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Strand Details</h3>
              <div className="space-y-4">
                {renderInput("STEM Title", "stemTitle", data.programs.stemTitle, "programs", "text", "Strand name")}
                {renderTextarea("STEM Description", "stemDesc", data.programs.stemDesc, "programs", "Strand description")}
                {renderInput("ABM Title", "abmTitle", data.programs.abmTitle, "programs", "text", "Strand name")}
                {renderTextarea("ABM Description", "abmDesc", data.programs.abmDesc, "programs", "Strand description")}
                {renderInput("HUMSS Title", "humssTitle", data.programs.humssTitle, "programs", "text", "Strand name")}
                {renderTextarea("HUMSS Description", "humssDesc", data.programs.humssDesc, "programs", "Strand description")}
                {renderInput("TVL Title", "tvlTitle", data.programs.tvlTitle, "programs", "text", "Strand name")}
                {renderTextarea("TVL Description", "tvlDesc", data.programs.tvlDesc, "programs", "Strand description")}
              </div>
            </div>
          </div>
        );
      case "contacts":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Contact Information</h3>
              <p className="text-[11px] text-gray-400 mb-4">Configure school contact details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderInput("Email", "email", data.contacts.email, "contacts", "email", "info@mnhs.edu.ph")}
                {renderInput("Phone", "phone", data.contacts.phone, "contacts", "tel", "(032) 123-4567")}
                {renderInput("Office Hours", "officeHours", data.contacts.officeHours, "contacts", "text", "7:00 AM - 4:00 PM")}
                {renderInput("Website", "website", data.contacts.website, "contacts", "text", "mnhs.edu.ph")}
              </div>
              <div className="mt-4">
                {renderInput("Address", "address", data.contacts.address, "contacts", "text", "School address")}
              </div>
              <div className="mt-4">
                {renderInput("Facebook Page", "facebook", data.contacts.facebook, "contacts", "text", "facebook.com/mnhs")}
              </div>
            </div>
          </div>
        );
      case "global":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-gray-800 mb-1">Global Settings</h3>
              <p className="text-[11px] text-gray-400 mb-4">Configure global website settings</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {renderInput("School Name", "schoolName", data.global.schoolName, "global", "text", "School name")}
                {renderInput("School Year", "syLabel", data.global.syLabel, "global", "text", "2025–2026")}
              </div>
              <div className="mt-4">
                {renderTextarea("Tagline", "tagline", data.global.tagline, "global", "School tagline")}
              </div>
              <div className="mt-4">
                {renderInput("Footer Text", "footerText", data.global.footerText, "global", "text", "© 2026 MNHS")}
              </div>
              <div className="mt-4">
                <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={data.global.primaryColor}
                    onChange={(e) => update("global", "primaryColor", e.target.value)}
                    className="w-10 h-10 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={data.global.primaryColor}
                    onChange={(e) => update("global", "primaryColor", e.target.value)}
                    className="font-sans w-32 px-3.5 py-2.5 border-[1.5px] border-gray-200 rounded-lg text-sm outline-none focus:border-emerald-500 bg-gray-50 focus:bg-white transition-colors font-mono"
                  />
                  <div className="flex gap-2">
                    {["#8B1010", "#1E5631", "#1a56db", "#7c3aed"].map((c) => (
                      <button
                        key={c}
                        onClick={() => update("global", "primaryColor", c)}
                        className="w-8 h-8 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">WEBSITE SETTINGS</h1>
          <p className="text-sm text-gray-500 mt-0.5">Configure website content and appearance</p>
        </div>
        <button
          onClick={handleSave}
          disabled={submitting}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          {submitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-lg animate-[fadeUp_0.2s_ease_both]">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          {successMsg}
        </div>
      )}

      {/* Tabs + Content */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                activeTab === tab.id
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/50"
                  : "border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
