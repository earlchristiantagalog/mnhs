"use client";

import { ProfilePage } from "@/components/profile-page";

export default function TeachersProfilePage() {
  return (
    <ProfilePage
      profile={{
        name: "Teacher",
        email: "teacher@mnhs.edu",
        phone: "09171234567",
        department: "Mathematics",
        role: "Teacher",
      }}
      onUpdate={(data) => {
        console.log("Profile updated:", data);
      }}
    />
  );
}
