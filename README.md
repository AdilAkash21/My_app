# NexusFlow

A modern, responsive SaaS landing page built with **React**, **Vite**, **Tailwind CSS v4**, and **JavaScript**. It features smooth 0.6s hover animations, a dark/light mode toggle with system preference detection, and a fully functional contact form.

---

## ✨ Features

- **Responsive Design** – Optimized for mobile, tablet, and desktop  
- **Dark Mode Toggle** – Smooth theme switching with 0.6s transition  
- **System Preference Detection** – Auto‑detects OS dark mode on first visit  
- **Persistent Theme** – Saves user preference in `localStorage.`  
- **No Flash on Load** – Theme applies instantly before React mounts  
- **Global Animations** – 0.6s transitions on all interactive elements  
- **Sticky Navigation** – Navbar with scroll‑activated blur effect  
- **Pricing Toggle** – Monthly/Annual pricing switcher  
- **Contact Form** – Validated form with success state  
- **Mobile Menu** – Hamburger menu with smooth open/close animation  

---

## 🛠 Tech Stack

| Technology   | Version |
|--------------|---------|
| React        | 18.x    |
| Vite         | 5.x / 6.x |
| Tailwind CSS | v4      |
| JavaScript   | ES6+    |
| Lucide React | Latest  |

---

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/AdilAkash21/nexusflow.git](https://github.com/AdilAkash21/My_app/tree/main/my-app)
   cd nexusflow

2. **Install dependencies**

   ```bash
   npm install

3. **Run development server**

   ```bash
   npm run dev
   
4. **Build for production**

   ```bash
   npm run build

## 📂 Project Structure

```plaintext
my-app/
├── index.html              # Root HTML entry + theme preload script
├── postcss.config.js       # PostCSS setup with @tailwindcss/postcss
├── src/                    # Application source code
│   ├── main.jsx            # React entry point
│   ├── App.jsx             # Main app component
│   ├── index.css           # Tailwind CSS + custom animations
│   ├── components/         # Reusable UI components (Navbar, Hero, etc.)
│   ├── pages/              # Page-level components (Home, Pricing, Contact)
│   └── assets/             # Static assets (images, icons)
└── package.json            # Project metadata + dependencies


