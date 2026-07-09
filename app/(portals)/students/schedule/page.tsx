"use client";

import { useState } from "react";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const scheduleData: Record<string, { time: string; subject: string; teacher: string; room: string }[]> = {
  Monday: [
    { time: "7:00 - 7:45", subject: "Mathematics", teacher: "Juan Dela Cruz", room: "Room 101" },
    { time: "8:00 - 8:45", subject: "Science", teacher: "Maria Garcia", room: "Room 203" },
    { time: "9:00 - 9:45", subject: "English", teacher: "Ana Reyes", room: "Room 105" },
    { time: "10:00 - 10:45", subject: "Filipino", teacher: "Pedro Santos", room: "Room 108" },
    { time: "1:00 - 1:45", subject: "Araling Panlipunan", teacher: "Sofia Lim", room: "Room 201" },
    { time: "2:00 - 2:45", subject: "MAPEH", teacher: "Carlos Torres", room: "Gym" },
  ],
  Tuesday: [
    { time: "7:00 - 7:45", subject: "English", teacher: "Ana Reyes", room: "Room 105" },
    { time: "8:00 - 8:45", subject: "Mathematics", teacher: "Juan Dela Cruz", room: "Room 101" },
    { time: "9:00 - 9:45", subject: "TLE", teacher: "Isabella Cruz", room: "Computer Lab" },
    { time: "10:00 - 10:45", subject: "Science", teacher: "Maria Garcia", room: "Room 203" },
    { time: "1:00 - 1:45", subject: "Values Education", teacher: "Miguel Santos", room: "Room 110" },
    { time: "2:00 - 2:45", subject: "Filipino", teacher: "Pedro Santos", room: "Room 108" },
  ],
  Wednesday: [
    { time: "7:00 - 7:45", subject: "Science", teacher: "Maria Garcia", room: "Room 203" },
    { time: "8:00 - 8:45", subject: "Filipino", teacher: "Pedro Santos", room: "Room 108" },
    { time: "9:00 - 9:45", subject: "Mathematics", teacher: "Juan Dela Cruz", room: "Room 101" },
    { time: "10:00 - 10:45", subject: "Araling Panlipunan", teacher: "Sofia Lim", room: "Room 201" },
    { time: "1:00 - 1:45", subject: "English", teacher: "Ana Reyes", room: "Room 105" },
  ],
  Thursday: [
    { time: "7:00 - 7:45", subject: "Filipino", teacher: "Pedro Santos", room: "Room 108" },
    { time: "8:00 - 8:45", subject: "English", teacher: "Ana Reyes", room: "Room 105" },
    { time: "9:00 - 9:45", subject: "Araling Panlipunan", teacher: "Sofia Lim", room: "Room 201" },
    { time: "10:00 - 10:45", subject: "TLE", teacher: "Isabella Cruz", room: "Computer Lab" },
    { time: "1:00 - 1:45", subject: "MAPEH", teacher: "Carlos Torres", room: "Gym" },
    { time: "2:00 - 2:45", subject: "Values Education", teacher: "Miguel Santos", room: "Room 110" },
  ],
  Friday: [
    { time: "7:00 - 7:45", subject: "Mathematics", teacher: "Juan Dela Cruz", room: "Room 101" },
    { time: "8:00 - 8:45", subject: "TLE", teacher: "Isabella Cruz", room: "Computer Lab" },
    { time: "9:00 - 9:45", subject: "Science", teacher: "Maria Garcia", room: "Room 203" },
    { time: "10:00 - 10:45", subject: "MAPEH", teacher: "Carlos Torres", room: "Gym" },
  ],
};

const subjectColors: Record<string, string> = {
  Mathematics: "bg-blue-100 text-blue-700 border-blue-200",
  Science: "bg-emerald-100 text-emerald-700 border-emerald-200",
  English: "bg-purple-100 text-purple-700 border-purple-200",
  Filipino: "bg-pink-100 text-pink-700 border-pink-200",
  "Araling Panlipunan": "bg-amber-100 text-amber-700 border-amber-200",
  MAPEH: "bg-orange-100 text-orange-700 border-orange-200",
  "Values Education": "bg-cyan-100 text-cyan-700 border-cyan-200",
  TLE: "bg-indigo-100 text-indigo-700 border-indigo-200",
};

export default function SchedulePage() {
  const today = new Date().getDay();
  const initialDay = today >= 1 && today <= 5 ? days[today - 1] : "Monday";
  const [selectedDay, setSelectedDay] = useState(initialDay);

  const daySchedule = scheduleData[selectedDay] || [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">SCHEDULE</h1>
        <p className="text-sm text-gray-500 mt-0.5">Your weekly class schedule</p>
      </div>

      {/* Day Tabs */}
      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`font-sans px-4 py-2.5 border text-sm font-semibold rounded-lg transition-all ${
              selectedDay === day
                ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200"
                : "border-gray-200 text-gray-500 hover:border-emerald-300 hover:text-emerald-600 bg-white"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-800">{selectedDay}&apos;s Schedule</h2>
          <p className="text-[11px] text-gray-400">{daySchedule.length} classes</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Time</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Subject</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Teacher</th>
                <th className="text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider px-5 py-3">Room</th>
              </tr>
            </thead>
            <tbody>
              {daySchedule.map((item, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-4 text-sm font-mono text-gray-600">{item.time}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider border ${subjectColors[item.subject] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                      {item.subject}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-gray-600">{item.teacher}</td>
                  <td className="px-5 py-4 text-sm text-gray-500">{item.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {daySchedule.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-400">No classes scheduled for {selectedDay}.</div>
        )}
      </div>

      {/* Weekly Summary */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h2 className="text-sm font-bold text-gray-800 mb-4">Weekly Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {days.map((day) => (
            <div key={day} className={`p-3 rounded-lg border ${selectedDay === day ? "border-emerald-300 bg-emerald-50" : "border-gray-200 bg-gray-50"}`}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{day.slice(0, 3)}</div>
              <div className="text-lg font-black text-gray-900">{(scheduleData[day] || []).length}</div>
              <div className="text-[11px] text-gray-400">classes</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
