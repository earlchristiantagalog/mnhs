# Mabolo National High School — Web Portal System

A comprehensive school management web application built for **Mabolo National High School**, Cebu City, Philippines. Developed as a capstone/academic project to modernize school operations and streamline communication between administrators, teachers, students, and staff.

---

## About

The MNHS Web Portal System provides dedicated portals for different user roles, enabling efficient management of enrollment, student records, equipment tracking, library services, attendance, and academic grades — all in one unified platform.

---

## Features

### Public Pages
- **Home** — Hero section, school statistics, programs, news, and enrollment CTA
- **About** — School history, mission/vision, timeline, faculty
- **Programs** — Junior High School and Senior High School strand listings
- **News** — Announcements with category filtering and pagination
- **SSLG** — Student Supreme Leaders Guild org chart and representatives
- **Contact** — Contact form with input validation
- **Admissions** — Multi-step enrollment form with auto-calculated school year dates

### Portals
| Portal | Description |
|--------|-------------|
| **Registrar** | Applicant management, student details, account administration |
| **ICT** | Equipment tracking, inventory management, account administration |
| **Library** | Book catalog management, borrower transactions |
| **Teachers** | Attendance recording, class schedule viewing |
| **Students** | Grade viewing, schedule viewing |

### Authentication
- **Login** — Account/email + password authentication
- **Forgot Password** — Password recovery flow

---

## Tech Stack

| Technology | Version |
|------------|---------|
| Next.js | 16 |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | v4 |

---

## Getting Started

### Prerequisites
- Node.js 18+ (recommended: 20+)
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/earlchristiantagalog/mnhs.git

# Navigate to the project directory
cd mnhs

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
mnhs/
├── app/
│   ├── (root)/           # Public pages (home, about, programs, news, etc.)
│   ├── (portals)/        # Portal layouts and pages
│   │   ├── registrar/    # Registrar portal
│   │   ├── ict/          # ICT portal
│   │   ├── library/      # Library portal
│   │   ├── teachers/     # Teachers portal
│   │   └── students/     # Students portal
│   ├── login/            # Login page
│   ├── forgot-password/  # Password recovery
│   ├── not-found.tsx     # Custom 404 page
│   └── forbidden.tsx     # Custom 403 page
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and helpers
└── public/               # Static assets (images, icons)
```

---

## Key Implementation Details

- **Poppins Font** — Applied globally across all pages and components
- **Custom Components** — Custom select dropdowns and date pickers (no native browser inputs)
- **Input Sanitization** — All form inputs are validated and sanitized to prevent XSS
- **Auto-Calculated Dates** — Enrollment periods are dynamically computed (2nd Monday of May/June)
- **Hydration-Safe** — School year hook computes dates client-side to avoid SSR mismatches
- **Responsive Design** — Mobile-first with collapsible sidebar navigation in portals
- **Version Control Footer** — Sidebar version badge with modal showing full project details

---

## Authors

Developed by students of **Mabolo National High School** as part of their academic requirements.

---

## Acknowledgments

- Mabolo National High School administration and faculty
- Department of Education (DepEd) — Philippines
- Next.js and Tailwind CSS communities

---

&copy; 2026 Mabolo National High School. All rights reserved.
