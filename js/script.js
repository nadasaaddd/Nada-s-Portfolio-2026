/**
 * Nada Saad Portfolio Architecture Context Engine
 * Fully modular runtime, zero dependencies framework configuration.
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initTypingEffect();
  initScrollReveal();
  initProjectModals();
});

/**
 * 1. Navigation Controller (Sticky Navbar, Section Active Links & Mobile Menu)
 */
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section, #top");

  // Sticky Scroll Logic
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active Link Highlighting Tracker Loop
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  });

  // Mobile Navigation Hamburger Interface State Click
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close mobile overlay on deep link select
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * 2. Typing Effect Engine Framework
 */
function initTypingEffect() {
  const targetElement = document.querySelector(".typing-text");
  if (!targetElement) return;

  const words = JSON.parse(targetElement.getAttribute("data-words"));
  let wordIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function type() {
    const fullWord = words[wordIndex];

    if (isDeleting) {
      currentText = fullWord.substring(0, currentText.length - 1);
    } else {
      currentText = fullWord.substring(0, currentText.length + 1);
    }

    targetElement.textContent = currentText;

    let typingSpeed = 100;
    if (isDeleting) typingSpeed /= 2;

    if (!isDeleting && currentText === fullWord) {
      typingSpeed = 2000; // Complete pause hold window
      isDeleting = true;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Reset latency prior next track initialization
    }

    setTimeout(type, typingSpeed);
  }

  // Initialize delay injection
  setTimeout(type, 800);
}

/**
 * 3. Native Intersection Observer for Scroll Reveals
 */
function initScrollReveal() {
  const structuralElements = document.querySelectorAll(".scroll-reveal");

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target); // Kill tracking processing once rendered open
      }
    });
  }, observerOptions);

  structuralElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

/**
 * 4. Microinteraction Intercept Logic for Project Detail Buttons
 */
function initProjectModals() {
  const detailsButtons = document.querySelectorAll(".btn-project-details");

  detailsButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const cardTitle = e.target
        .closest(".project-info")
        .querySelector(".project-title").textContent;
      // alert(
      //   `Case Study Deep-Dive: "${cardTitle}" portfolio layout details and asset attachments are being prepared for delivery.`,
      // );
    });
  });
}
