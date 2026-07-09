"use client";

import Link from "next/link";
import { useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";

const contactItems = [
  {
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    label: "Address",
    value: "Mabolo, Cebu City, Philippines",
    href: null,
  },
  {
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    label: "Phone",
    value: "(063) 266-5526",
    href: "tel:0632665526",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    label: "Email",
    value: "mabolonhs.cebucity@deped.gov.ph",
    href: "mailto:mabolonhs.cebucity@deped.gov.ph",
  },
  {
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    label: "Office Hours",
    value: "Monday – Friday, 7:00 AM – 5:00 PM",
    href: null,
  },
  {
    icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
    label: "Facebook",
    value: "MNHS Facebook Page",
    href: "https://facebook.com",
  },
];

const subjects = [
  "Enrollment Inquiry",
  "Academic Programs",
  "School Activities",
  "General Concerns",
  "Feedback & Suggestions",
  "Other",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id.replace("cf_", "")]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: "52vh" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black" />
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/bg.jpg')" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-red-800/20 blur-3xl pointer-events-none" style={{ transform: "translate(50%, -50%)" }} />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-yellow-400/5 blur-2xl pointer-events-none" style={{ transform: "translateY(50%)" }} />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-20 md:py-28">
          <nav className="flex items-center gap-2 font-sans text-xs text-white/45 mb-6 animate-fade-in">
            <Link href="/" className="hover:text-white/80 transition-colors no-underline">Home</Link>
            <span>/</span>
            <span className="text-white/75">Contact</span>
          </nav>

          <div className="max-w-2xl animate-fade-up">
            <div className="flex items-center gap-2 font-sans bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-[0.65rem] sm:text-xs font-semibold tracking-[3px] uppercase px-4 py-2 rounded-sm mb-5 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-300 flex-shrink-0" />
              We&apos;d Love to Hear From You
            </div>
            <h1 className="font-sans text-[2.2rem] sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-4">
              Get in <span className="text-yellow-300">Touch</span>
            </h1>
            <p className="font-sans text-white/65 text-sm sm:text-base leading-relaxed font-light max-w-lg">
              Have questions about enrollment, programs, or school activities? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — Contact Info + Map */}
            <div>
              <div className="flex flex-col gap-5 mb-8">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4 group">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "#8B10101a" }}>
                      <svg className="w-5 h-5" style={{ color: "#8B1010" }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <strong className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">{item.label}</strong>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="font-sans text-gray-800 text-sm hover:text-red-800 transition-colors no-underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-sans text-gray-800 text-sm">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="rounded-xl overflow-hidden border border-gray-200 h-64 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.3167!2d123.9456!3d10.3157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMMKwMTgnNTYuNSJOIDEyM8KwNTYnNDQuMiJF!5e0!3m2!1sen!2sph!4v1"
                  width="100%"
                  height="256"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mabolo National High School Location"
                />
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="font-sans text-xl font-bold text-gray-900 mb-1">Send a Message</h3>
              <p className="font-sans text-gray-400 text-sm font-light mb-6">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">First Name</label>
                    <input
                      type="text"
                      id="cf_first"
                      placeholder="Juan"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-800 transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Last Name</label>
                    <input
                      type="text"
                      id="cf_last"
                      placeholder="dela Cruz"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-800 transition-colors bg-white"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    id="cf_email"
                    placeholder="juan@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-800 transition-colors bg-white"
                  />
                </div>

                <CustomSelect
                  label="Subject"
                  options={subjects.map((s) => ({ label: s, value: s }))}
                  placeholder="Select a topic..."
                  value={formData.subject}
                  onChange={(val) => setFormData({ ...formData, subject: val })}
                />

                <div className="mb-5">
                  <label className="block font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1.5">Message</label>
                  <textarea
                    id="cf_message"
                    placeholder="Write your message here..."
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="font-sans w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-red-800 transition-colors bg-white resize-y min-h-[100px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-sm tracking-wide py-3 rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: "#8B1010" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
