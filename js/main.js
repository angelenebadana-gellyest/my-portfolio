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

const imageBase = "images/digital arts/";

const categoryLabels = {
  d: "Personal Art",
  collab: "Collaborations",
  painting: "Digital Paintings",
};

const galleryItems = [
  ...Array.from({ length: 4 }, (_, i) => ({
    src: `${imageBase}D${i + 1}.png`,
    title: `Artwork D${i + 1}`,
    category: "d",
  })),
  ...Array.from({ length: 10 }, (_, i) => ({
    src: `${imageBase}COLLAB${i + 1}.${i + 1 === 8 ? "jpg" : "png"}`,
    title: `Collaboration ${i + 1}`,
    category: "collab",
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    src: `${imageBase}PAINTING${i + 1}.png`,
    title: `Painting ${i + 1}`,
    category: "painting",
  })),
];

const certificateBase = "images/certificates/";

const certificateItems = [
  {
    src: `${certificateBase}CERT1.jpg`,
    title: "Poster Making Competition",
    category: "certificate",
    badge: "2nd Place",
    issuer: "Francisco C. Jongko National High School",
    date: "September 28, 2022",
    theme: "GENESCAPE: Priming Perspective, Amplifying Advancement",
    description:
      "Awarded 2nd Place in visual arts for synthesizing complex concepts in genetics, scientific progress, and mathematics into a cohesive poster design.",
  },
  {
    src: `${certificateBase}CERT2.jpg`,
    title: "Poster Making Competition",
    category: "certificate",
    badge: "2nd Place",
    issuer: "Science & Mathematics Department",
    date: "2025",
    theme: "SPATIALYZE: Surveying Societies, Sensing Solutions",
    description:
      "Earned 2nd Place for translating themes of spatial intelligence, data sensing, and societal problem-solving into a visual communication piece.",
  },
  {
    src: `${certificateBase}CERT3.jpg`,
    title: "Buwan ng Wika Poster Making Competition",
    category: "certificate",
    badge: "1st Place",
    issuer: "Cabadbaran City National High School — Filipino Department",
    date: "August 25, 2025",
    theme: "Paglinang sa Filipino at Katutubong Wika: Makaysaysayan sa Pagkakaisa ng Bansa",
    description:
      "Awarded 1st Place (Unang Gantimpala) for an illustration celebrating cultural heritage, indigenous languages, and national unity through visual storytelling.",
  },
  {
    src: `${certificateBase}CERT4.jpg`,
    title: "Virtual Division Schools Press Conference",
    category: "certificate",
    badge: "Certificate of Participation",
    issuer: "Department of Education — Schools Division Office of Cabadbaran City",
    date: "June 1–4, 2021",
    theme: "Strengthening Journalistic Skills towards Globally Resilient Campus Journalists amidst Pandemic Predicament",
    description:
      "Recognized for participating in division-level campus journalism, focusing on editorial illustration and visual communication during digital media workflows.",
  },
  {
    src: `${certificateBase}CERT5.jpg`,
    title: "Poster Making Competition",
    category: "certificate",
    badge: "1st Place",
    issuer: "Francisco C. Jongko National High School",
    date: "September 29, 2023",
    theme: "Siyensya, Teknolohiya at Inobasyon: Kabalikat sa Matatag, Maginhawa at Panatag na Kinabukasan",
    description:
      "Secured 1st Place by conceptualizing and designing a visual artwork that highlighted science, technology, and innovation as drivers of sustainable development.",
  },
];

const workTabs = document.getElementById("work-tabs");
const workGrid = document.getElementById("work-grid");

function getActiveFilter() {
  const active = workTabs.querySelector(".work-tab.active");
  return active ? active.dataset.filter : "all";
}

function renderGallery(filter) {
  workGrid.innerHTML = "";
  const items = galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );

  items.forEach((item, index) => {
    const card = document.createElement("figure");
    card.className = "work-card reveal";
    card.dataset.category = item.category;
    card.dataset.index = String(index);
    card.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy" />
      <figcaption class="work-overlay">
        <span class="work-category">${categoryLabels[item.category]}</span>
        <span class="work-title">${item.title}</span>
      </figcaption>
    `;
    workGrid.appendChild(card);
    revealObserver.observe(card);
  });
}

renderGallery("all");

workTabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".work-tab");
  if (!tab) return;
  workTabs.querySelectorAll(".work-tab").forEach((t) => t.classList.remove("active"));
  tab.classList.add("active");
  renderGallery(tab.dataset.filter);
});

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
let activeIndex = 0;
let activeItems = [];

function currentItems() {
  const filter = getActiveFilter();
  return galleryItems.filter(
    (item) => filter === "all" || item.category === filter
  );
}

function updateLightbox() {
  const item = activeItems[activeIndex];
  if (!item) return;
  lightboxImg.src = item.src;
  lightboxImg.alt = item.title;
  lightboxCaption.textContent =
    item.badge && item.title
      ? `${item.badge} — ${item.title}`
      : item.category
      ? `${item.title} — ${categoryLabels[item.category]}`
      : item.title;
}

function openLightbox(index, items) {
  activeItems = items;
  activeIndex = index;
  updateLightbox();
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function moveLightbox(step) {
  activeIndex = (activeIndex + step + activeItems.length) % activeItems.length;
  updateLightbox();
}

workGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".work-card");
  if (!card) return;
  openLightbox(Number(card.dataset.index), currentItems());
});

const certGrid = document.getElementById("cert-grid");

function renderCertificates() {
  certificateItems.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "cert-card reveal";
    card.dataset.index = String(index);
    card.innerHTML = `
      <figure class="cert-preview">
        <img src="${item.src}" alt="${item.title} certificate" loading="lazy" />
        <span class="cert-zoom">🔍</span>
      </figure>
      <div class="cert-body">
        <span class="cert-badge">${item.badge}</span>
        <h3 class="cert-name">${item.title}</h3>
        <p class="cert-meta"><strong>${item.issuer}</strong></p>
        <p class="cert-meta">${item.date}</p>
        <p class="cert-theme"><em>${item.theme}</em></p>
        <p class="cert-desc">${item.description}</p>
      </div>
    `;
    certGrid.appendChild(card);
    revealObserver.observe(card);
  });

  certGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".cert-card");
    if (!card) return;
    openLightbox(Number(card.dataset.index), certificateItems);
  });
}

renderCertificates();

document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
document.getElementById("lightbox-prev").addEventListener("click", () => moveLightbox(-1));
document.getElementById("lightbox-next").addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") moveLightbox(-1);
  if (e.key === "ArrowRight") moveLightbox(1);
});