document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-toggle");
  const navLinks = document.getElementById("nav-links");
  const lightToggle = document.getElementById("light-toggle");

  const root = document.documentElement; // <html>

  // --- NAV MENU TOGGLE ---
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    console.log("hamburger clicked");
  });

  // Helper: apply a theme string: "light" or "dark"
  function applyTheme(theme) {
    const isLight = theme === "light";

    root.classList.toggle("light-mode", isLight);
    document.body.classList.toggle("light-mode", isLight);

    localStorage.setItem("theme", isLight ? "light" : "dark");
  }

  // --- APPLY SAVED THEME ON LOAD ---
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    applyTheme(savedTheme);
  } else {
    // default: dark
    applyTheme("dark");
  }

  // --- TOGGLE LIGHT/DARK MODE ---
  lightToggle.addEventListener("click", () => {
    const isCurrentlyLight = root.classList.contains("light-mode");
    applyTheme(isCurrentlyLight ? "dark" : "light");
  });

  console.log("JS loaded");
});
