const skills = [
  { name: "Architectural Drafting Technology", icon: "📐", level: 85 },
  { name: "Drawing", icon: "✏️", level: 90 },
  { name: "Graphic Design", icon: "🖌️", level: 80 },
  { name: "Photography", icon: "📷", level: 78 },
  { name: "Singing", icon: "🎤", level: 88 },
  { name: "Design Principles", icon: "🎨", level: 82 },
];

const projects = [
  {
    title: "Architectural Drafting Portfolio",
    description:
      "A collection of architectural drawings and drafting projects showcasing technical design skills.",
    tags: ["Architectural Drafting", "Design"],
    icon: "📐",
  },
  {
    title: "Upcoming Project",
    description:
      "Space reserved for the next big idea. Improvement is built from wisdom gained through repetition.",
    tags: ["Coming Soon"],
    icon: "🚀",
  },
];

const skillsGrid = document.getElementById("skills-grid");
const projectsGrid = document.getElementById("projects-grid");

skills.forEach((skill) => {
  const card = document.createElement("article");
  card.className = "skill-card reveal";

  card.innerHTML = `
    <div class="skill-icon">${skill.icon}</div>
    <h3 class="skill-name">${skill.name}</h3>
    <div class="skill-level">
      <div class="skill-level-fill" style="width: ${skill.level}%;"></div>
    </div>
  `;
  skillsGrid.appendChild(card);
});

projects.forEach((project) => {
  const card = document.createElement("article");
  card.className = "project-card reveal";

  let cover = `<div class="project-cover">${project.icon}</div>`;

  card.innerHTML = `
    ${cover}
    <div class="project-body">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>
  `;
  projectsGrid.appendChild(card);
});

document.getElementById("year").textContent = new Date().getFullYear();

const themeToggle = document.getElementById("theme-toggle");
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

function setTheme(theme) {
  const isLight = theme === "light";
  document.documentElement.toggleAttribute("data-theme", isLight);
  if (themeToggle) themeToggle.textContent = isLight ? "🌙" : "☀️";
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {}
}

if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(prefersLight ? "light" : "dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.documentElement.hasAttribute("data-theme");
    setTheme(isLight ? "dark" : "light");
  });
}

const nav = document.getElementById("nav");
const toggle = document.getElementById("nav-toggle");
const links = document.getElementById("nav-links");
const navLinkEls = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

toggle.addEventListener("click", () => {
  const isOpen = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinkEls.forEach((link) => {
  link.addEventListener("click", () => {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const sections = document.querySelectorAll("section[id]");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinkEls.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    }
  });
}, { rootMargin: "-40% 0px -50% 0px" });

sections.forEach((section) => observer.observe(section));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));