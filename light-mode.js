document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-toggle");
  const navLinks = document.getElementById("nav-links");
  const lightToggle = document.getElementById("light-toggle");
  const root = document.documentElement; // <html>

  // --- NAV MENU TOGGLE ---
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      console.log("hamburger clicked");
    });
  }

  // --- THEME HELPERS ---
  function applyTheme(theme) {
    const isLight = theme === "light";

    // Toggle on <html> AND <body> so scrollbar + rest of site update
    root.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("light-mode", isLight);

    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    applyTheme("dark"); // default
  }

  // --- THEME BUTTON ---
  if (lightToggle) {
    lightToggle.addEventListener("click", () => {
      const isCurrentlyLight = root.classList.contains("light-mode");
      applyTheme(isCurrentlyLight ? "dark" : "light");
    });
  }

  console.log("JS loaded");
});
