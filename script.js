const root = document.documentElement;
const body = document.body;
const loader = document.querySelector(".loader");
const cursorGlow = document.querySelector(".cursor-glow");
const themeToggle = document.querySelector(".theme-toggle");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const revealElements = document.querySelectorAll(".reveal");
const magneticButtons = document.querySelectorAll(".magnetic-button");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

const savedTheme = localStorage.getItem("pilupu-theme");
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  localStorage.setItem("pilupu-theme", theme);
}

setTheme(savedTheme || (prefersDark ? "dark" : "light"));

window.addEventListener("load", () => {
  window.setTimeout(() => {
    body.classList.add("loaded");
    if (loader) {
      loader.setAttribute("aria-hidden", "true");
    }
  }, 450);
});

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  setTheme(currentTheme === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");
  menuToggle.classList.toggle("active", isOpen);
  body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "మెనూ మూసివేయండి" : "మెనూ తెరవండి");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "మెనూ తెరవండి");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
    body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "మెనూ తెరవండి");
    menuToggle.focus();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -40px 0px"
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
  revealObserver.observe(element);
});

let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let glowX = pointerX;
let glowY = pointerY;

window.addEventListener("pointermove", (event) => {
  pointerX = event.clientX;
  pointerY = event.clientY;
});

function animateGlow() {
  glowX += (pointerX - glowX) * 0.08;
  glowY += (pointerY - glowY) * 0.08;

  if (cursorGlow) {
    cursorGlow.style.transform = `translate3d(${glowX - 170}px, ${glowY - 170}px, 0)`;
  }

  requestAnimationFrame(animateGlow);
}

animateGlow();

magneticButtons.forEach((button) => {
  button.addEventListener("pointermove", (event) => {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px) translateY(-3px)`;
  });

  button.addEventListener("pointerleave", () => {
    button.style.transform = "";
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelectorAll(".hero-aurora, .portrait-scene").forEach((element, index) => {
    const speed = index === 0 ? 0.08 : 0.04;
    element.style.translate = `0 ${scrolled * speed}px`;
  });
}, { passive: true });

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "ధన్యవాదాలు. మీ ఆలోచన ఈ ప్రయాణానికి విలువైనది.";
  contactForm.reset();
});

document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});