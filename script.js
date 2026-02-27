// SECTION: Utility
function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

// SECTION: Header interactions
const header = qs(".site-header");
const headerToggle = qs(".header-toggle");

if (header && headerToggle) {
  // Scroll-based progress animation on header bar
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 10) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  });

  // Simple interactive toggle that inverts background subtly
  headerToggle.addEventListener("click", () => {
    document.body.classList.toggle("focus-mode");
  });
}

// SECTION: Smooth scroll for in-page nav
qsa("[data-scroll-target]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const targetSelector = btn.getAttribute("data-scroll-target");
    if (!targetSelector) return;
    const target = qs(targetSelector);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// SECTION: Project multi-criteria filtering
const filterChips = qsa(".chip");
const projectCards = qsa(".project-card");

if (filterChips.length && projectCards.length) {
  const activeFilters = {
    type: "all",
    ai: "all",
    tool: "all",
  };

  const applyFilters = () => {
    projectCards.forEach((card) => {
      const typeValues = (card.getAttribute("data-type") || "").split(" ");
      const aiValue = card.getAttribute("data-ai") || "";
      const toolValues = (card.getAttribute("data-tools") || "").split(" ");

      const typeMatch =
        activeFilters.type === "all" || typeValues.includes(activeFilters.type);
      const aiMatch = activeFilters.ai === "all" || aiValue === activeFilters.ai;
      const toolMatch =
        activeFilters.tool === "all" || toolValues.includes(activeFilters.tool);

      const matches = typeMatch && aiMatch && toolMatch;
      card.style.display = matches ? "flex" : "none";
    });
  };

  filterChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const group = chip.getAttribute("data-filter-type");
      const value = chip.getAttribute("data-filter-value");
      if (!group || !value) return;

      // Update active chip state within the same group only
      const groupChips = filterChips.filter(
        (c) => c.getAttribute("data-filter-type") === group
      );
      groupChips.forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");

      activeFilters[group] = value;
      applyFilters();
    });
  });
}

// SECTION: Contact form handling
const contactForm = qs("#contact-form");
const formStatus = qs(".form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();

    // Simple front-end feedback only
    formStatus.textContent = name
      ? "Thank you, " + name + ". Your message has been noted."
      : "Thank you for your message. It has been noted.";

    contactForm.reset();
  });
}

// SECTION: Footer year
const yearEl = qs("#year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
