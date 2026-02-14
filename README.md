# 🎬 AI Video Platform


![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=nextdotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-green?style=flat&logo=mongodb)
![ImageKit](https://img.shields.io/badge/ImageKit-orange?style=flat)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwindcss)

A modern full-stack video platform built with **Next.js (App Router)**, **ImageKit CDN**, and a scalable API architecture.  
This project demonstrates production-level structure with authentication, secure video uploads, protected routes, and modular API handling.

---

## 🚀 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios (Centralized API Client)
- Lucide React (Icons)

### Backend (API Routes)
- Next.js API Routes
- MongoDB (Mongoose Models)
- Session-based Authentication

### Media Handling
- ImageKit CDN
- Secure Signed Upload
- Optimized Video/Image Delivery

---

## 📂 Project Structure
app/
├── components/
│ ├── Header.tsx
│ ├── VideoComponent.tsx
│ ├── VideoFeed.tsx
│ ├── VideoUpload.tsx
│ └── Notification.tsx
│
├── login/
├── register/
├── api/
│ ├── auth/
│ └── videos/
│
lib/
├── api-client.ts
└── db.ts
│
models/
└── Video.ts

---

## ✨ Features

- 🔐 Authentication System
- 📹 Secure Video Upload via ImageKit
- 🖼 Thumbnail Upload Support
- 🎞 Video Feed Page
- 📄 Individual Video Pages
- 🧩 Modular API Client Architecture
- 🛡 Middleware-Based Route Protection
- 📡 Centralized Axios API Handling
- 📱 Responsive UI

---
