"use client";

import { ProfilePage } from "@/components/profile-page";

const defaultProfile = {
  name: "ICT Coordinator",
  email: "ict@mnhs.edu",
  role: "ICT Coordinator",
  phone: "09181234567",
  department: "ICT Department",
  joinDate: "August 2023",
};

export default function ICTProfilePage() {
  return (
    <ProfilePage
      profile={defaultProfile}
      onUpdate={(data) => {
        console.log("Profile updated:", data);
      }}
    />
  );
}
