"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function SidebarFooter() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <>
      <div className="px-5 py-4 border-t border-white/10">
        <button
          onClick={() => setShowModal(true)}
          className="w-full text-left text-white/60 hover:text-white text-sm font-mono transition-colors cursor-pointer"
        >
          v1.0.0
        </button>
      </div>

      {showModal && createPortal(
        <WebsiteDetailsModal onClose={() => setShowModal(false)} />,
        document.body
      )}
    </>
  );
}

function WebsiteDetailsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden animate-[fadeUp_0.2s_ease_both]">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <img src="/image.png" alt="MNHS" className="w-7 h-7 rounded-full object-cover" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">MNHS Web Portal</h2>
              <p className="text-xs text-gray-400">Mabolo National High School</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[60vh] space-y-5">
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Current Version</span>
              <span className="px-2.5 py-0.5 bg-emerald-600 text-white text-xs font-bold rounded-full">v1.0.0</span>
            </div>
            <div className="text-xs text-emerald-600">
              Released: July 2026 &middot; Stable Release
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Website Details</h3>
            <div className="space-y-2">
              <DetailRow label="School" value="Mabolo National High School" />
              <DetailRow label="Address" value="Mabolo, Cebu City, Philippines" />
              <DetailRow label="Website" value="mnhs.edu.ph" />
              <DetailRow label="Email" value="info@mnhs.edu.ph" />
              <DetailRow label="Phone" value="(032) 123-4567" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Available Portals</h3>
            <div className="grid grid-cols-2 gap-2">
              <PortalBadge name="Registrar" />
              <PortalBadge name="ICT" />
              <PortalBadge name="Library" />
              <PortalBadge name="Teachers" />
              <PortalBadge name="Students" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Built With</h3>
            <div className="flex flex-wrap gap-2">
              <TechBadge name="Next.js 16" />
              <TechBadge name="React 19" />
              <TechBadge name="TypeScript" />
              <TechBadge name="Tailwind CSS v4" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Credits</h3>
            <div className="space-y-2 text-xs text-gray-600">
              <p>Developed for Mabolo National High School to modernize school management and student services.</p>
              <p className="text-gray-400">&copy; 2026 MNHS. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-semibold text-gray-700 text-right">{value}</span>
    </div>
  );
}

function PortalBadge({ name }: { name: string }) {
  return (
    <div className="flex items-center px-3 py-2 bg-gray-50 rounded-lg border border-gray-100">
      <span className="text-xs font-semibold text-gray-600">{name}</span>
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-lg">
      {name}
    </span>
  );
}
