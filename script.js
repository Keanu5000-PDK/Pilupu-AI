const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const revealItems = document.querySelectorAll(".reveal");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

const savedTheme = localStorage.getItem("pilupu-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("pilupu-theme", theme);
  themeIcon.textContent = theme === "dark" ? "☀" : "☾";
}

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "మెనూ మూసివేయండి" : "మెనూ తెరవండి");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "మెనూ తెరవండి");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealItems.forEach((item) => observer.observe(item));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formNote.textContent = "ధన్యవాదాలు. మా బృందం త్వరలో మీతో సంప్రదిస్తుంది.";
  contactForm.reset();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});