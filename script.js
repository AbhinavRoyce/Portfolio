// ====== TYPING EFFECT IN HERO ======
const typedTextEl = document.getElementById("typed-text");
const cursorEl = document.querySelector(".cursor");

const typingPhrases = [
  "Building intelligent ML systems.",
  "Designing clean, minimal UIs.",
  "Solving DSA problems daily.",
  "Open to internships & collabs."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = typingPhrases[currentPhraseIndex];
  if (!typedTextEl) return;

  if (!isDeleting && currentCharIndex <= currentPhrase.length) {
    typedTextEl.textContent = currentPhrase.slice(0, currentCharIndex++);
  } else if (isDeleting && currentCharIndex >= 0) {
    typedTextEl.textContent = currentPhrase.slice(0, currentCharIndex--);
  }

  let speed = 80;

  if (currentCharIndex === currentPhrase.length) {
    isDeleting = true;
    speed = 1400; // pause at end
  } else if (currentCharIndex < 0) {
    isDeleting = false;
    currentPhraseIndex = (currentPhraseIndex + 1) % typingPhrases.length;
    speed = 400;
  }

  setTimeout(typeLoop, speed);
}

typeLoop();

// ====== NAV TOGGLE (MOBILE) ======
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("open");
    }
  });
}

// ====== BACK TO TOP BUTTON ======
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (!backToTopBtn) return;
  if (window.scrollY > 350) {
    backToTopBtn.classList.add("visible");
  } else {
    backToTopBtn.classList.remove("visible");
  }
});

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ====== ANIMATE SECTIONS ON SCROLL ======
const animatedEls = document.querySelectorAll("[data-animate]");

// Add data-animate attribute in JS so no need to clutter HTML
const sectionsToAnimate = [
  "#skills .skills-grid",
  "#certificates .card-grid",
  "#projects .card-grid",
  "#contact .contact-container"
];

sectionsToAnimate.forEach((selector) => {
  const el = document.querySelector(selector);
  if (el) el.setAttribute("data-animate", "true");
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
  { threshold: 0.15 }
);

document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));

// ====== SKILL BARS ANIMATION ======
const skillBars = document.querySelectorAll(".skill-bar span");
const skillSection = document.getElementById("skills");

if (skillSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const level = bar.getAttribute("data-level");
            bar.style.transform = `scaleX(${level / 100})`;
          });
          skillObserver.unobserve(skillSection);
        }
      });
    },
    { threshold: 0.35 }
  );

  skillObserver.observe(skillSection);
}

// ====== CONTACT FORM (FRONTEND ONLY) ======
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formStatus.textContent = "Thanks for reaching out! I'll get back to you soon.";
    setTimeout(() => {
      formStatus.textContent = "";
      contactForm.reset();
    }, 3000);
  });
}

// ====== FOOTER YEAR ======
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
