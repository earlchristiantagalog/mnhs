"use client";

import { ProfilePage } from "@/components/profile-page";

const defaultProfile = {
  name: "Registrar Admin",
  email: "admin@mnhs.edu",
  role: "Registrar",
  phone: "09171234567",
  department: "Registrar Department",
  joinDate: "June 2024",
};

export default function RegistrarProfilePage() {
  return (
    <ProfilePage
      profile={defaultProfile}
      onUpdate={(data) => {
        console.log("Profile updated:", data);
      }}
    />
  );
}
