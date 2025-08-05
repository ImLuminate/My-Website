document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-toggle");
  const navLinks = document.getElementById("nav-links");

  document.getElementById("hamburger-toggle").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("open");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger-toggle");
  const navLinks = document.getElementById("nav-links");
  const lightToggle = document.getElementById("light-toggle");

  // Toggle nav menu
  document.getElementById("hamburger-toggle").addEventListener("click", () => {
    document.getElementById("nav-links").classList.toggle("open");
  });

  // Toggle light/dark mode
  lightToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    // Optional: persist theme across reloads
    if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
  console.log("hamburger JS loaded");

  document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.getElementById("hamburger-toggle");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
      console.log("hamburger clicked");
      navLinks.classList.toggle("open");
    });

    const lightToggle = document.getElementById("light-toggle");

    lightToggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light-mode") ? "light" : "dark"
      );
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("light-mode");
    }
  });
});
