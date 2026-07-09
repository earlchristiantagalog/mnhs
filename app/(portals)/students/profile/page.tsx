"use client";

import { ProfilePage } from "@/components/profile-page";

export default function StudentsProfilePage() {
  return (
    <ProfilePage
      profile={{
        name: "Student",
        email: "student@mnhs.edu",
        phone: "09171234567",
        department: "Grade 7 - Emerald",
        role: "Student",
      }}
      onUpdate={(data) => {
        console.log("Profile updated:", data);
      }}
    />
  );
}
