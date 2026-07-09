"use client";

import { ProfilePage } from "@/components/profile-page";

export default function LibraryProfilePage() {
  return (
    <ProfilePage
      profile={{
        name: "Librarian",
        email: "library@mnhs.edu",
        phone: "09171234567",
        department: "Library",
        role: "Librarian",
      }}
      onUpdate={(data) => {
        console.log("Profile updated:", data);
      }}
    />
  );
}
