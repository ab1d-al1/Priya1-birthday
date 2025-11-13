# 🎉 Full React Birthday Website Project (GitHub Ready)

Below is a **complete project structure**, including **package.json, index.html, App.jsx, main.jsx, tailwind setup, and file structure**.

You can now **copy this entire project into your GitHub repo**, run `npm install`, and deploy using **GitHub Pages**.

---
# 📁 Project Structure
```
birthday-site/
 ├── public/
 │     ├── priya.jpg        ← you upload
 │     ├── birthday.mp4     ← you upload
 │     └── index.html
 ├── src/
 │     ├── App.jsx
 │     ├── main.jsx
 │     └── index.css
 ├── package.json
 ├── tailwind.config.js
 └── vite.config.js
```
---

# 📌 package.json
```json
{
  "name": "birthday-site",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^10.16.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "autoprefixer": "^10.4.2",
    "postcss": "^8.4.6",
    "tailwindcss": "^3.0.23",
    "vite": "^5.0.0"
  }
}
```
---
# 📌 vite.config.js
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // required for GitHub Pages
});
```
---
# 📌 tailwind.config.js
```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
};
```
---
# 📌 public/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Priya's 19th Birthday</title>
  </head>
  <body class="bg-pink-50">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
---
# 📌 src/index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
---
# 📌 src/main.jsx
```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
---
# 📌 src/App.jsx
```jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const priyaImage = "/priya.jpg";
const birthdayVideo = "/birthday.mp4";

export default function BirthdayPriya() {
  const getNextBirthday = () => {
    const now = new Date();
    const year = now.getFullYear();
    let bd = new Date(year, 10, 23);
    if (now > bd) bd = new Date(year + 1, 10, 23);
    return bd;
  };

  const [target] = useState(getNextBirthday);
  const [timeLeft, setTimeLeft] = useState(target - new Date());

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(target - new Date()), 1000);
    return () => clearInterval(t);
  }, [target]);

  const format = (ms) => {
    const total = Math.floor(ms / 1000);
    return {
      days: Math.floor(total / 86400),
      hours: Math.floor((total % 86400) / 3600),
      mins: Math.floor((total % 3600) / 60),
      secs: total % 60,
    };
  };

  const { days, hours, mins, secs } = format(timeLeft);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 py-10 flex flex-col items-center text-center px-4">
      <h1 className="text-5xl font-extrabold text-pink-700">Happy 19th Birthday, Priya!</h1>
      <p className="text-lg text-pink-600 mt-2">Celebrating her on 23 November 🎉</p>

      <div className="mt-8 bg-white shadow-lg rounded-2xl p-6">
        <img src={priyaImage} className="w-56 h-72 object-cover rounded-xl shadow border-4 border-white" />
        <h2 className="text-2xl mt-4 font-semibold">Priya</h2>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-pink-700 mb-4">Countdown</h3>
        <div className="grid grid-cols-4 gap-3">
          <Box label="Days" value={days} />
          <Box label="Hours" value={hours} />
          <Box label="Mins" value={mins} />
          <Box label="Secs" value={secs} />
        </div>
      </div>

      <div className="mt-8 bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h3 className="text-xl font-semibold text-pink-700 mb-4">Birthday Video</h3>
        <video controls className="rounded-xl w-full shadow border">
          <source src={birthdayVideo} type="video/mp4" />
        </video>
      </div>

      <section id="message" className="mt-8 bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">
        <h3 className="text-lg font-semibold text-pink-700">Messages for Priya</h3>
        <MessageBoard />
      </section>

      <footer className="mt-8 text-sm text-gray-500">Made with ❤️ for Priya</footer>
    </div>
  );
}

function Box({ label, value }) {
  return (
    <div className="bg-pink-50 rounded-lg p-3 text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}

function MessageBoard() {
  const [messages, setMessages] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("msgs") || "[]");
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("msgs", JSON.stringify(messages));
  }, [messages]);

  const post = () => {
    if (!text.trim()) return;
    setMessages([{ id: Date.now(), text }, ...messages]);
    setText("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
          placeholder="Write your wish..."
        />
        <button onClick={post} className="px-4 py-2 bg-pink-600 text-white rounded-lg">
          Post
        </button>
      </div>

      <div className="mt-4 space-y-3 max-h-40 overflow-y-auto">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3 bg-pink-50 rounded-lg border"
          >
            {m.text}
          </motion.div>
        ))}
      </div>
