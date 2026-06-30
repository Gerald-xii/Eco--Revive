// hamburger menu toggle
const hamburgerMenu = document.getElementById("hamburgerMenu");
const navMenu = document.getElementById("navMenu");

if (hamburgerMenu) {
  hamburgerMenu.addEventListener("click", () => {
    hamburgerMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll(".nav-menu a, .btn__donate");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburgerMenu.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// hamburger menu toggle ends

// first carousel
const track = document.querySelector(".carousel-track");
const slides = Array.from(document.querySelectorAll(".slide"));
const carousel = document.querySelector(".carousel");
const dotsContainer = document.querySelector(".dots");

let currentIndex = 0;
let autoPlay;
let touchStartX = 0;
let touchEndX = 0;

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  const dots = Array.from(document.querySelectorAll(".dot"));
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
  restartAutoPlay();
}

function showNextSlide() {
  goToSlide(currentIndex + 1);
}

function showPreviousSlide() {
  goToSlide(currentIndex - 1);
}

function restartAutoPlay() {
  clearInterval(autoPlay);
  autoPlay = setInterval(showNextSlide, 6000);
}

// Swipe functionality for main carousel
carousel.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.changedTouches[0].screenX;
  },
  false,
);

carousel.addEventListener(
  "touchend",
  (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  },
  false,
);

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      showNextSlide();
    } else {
      showPreviousSlide();
    }
  }
}

createDots();
updateDots();
restartAutoPlay();

// Click handlers for main carousel navigation buttons
const prevArrow = document.querySelector(".prev");
const nextArrow = document.querySelector(".next");

if (prevArrow) {
  prevArrow.addEventListener("click", showPreviousSlide);
}
if (nextArrow) {
  nextArrow.addEventListener("click", showNextSlide);
}

// first carousel ends

// 5R boxes scroll animation
const fiveRSection = document.querySelector(".important__rs");
const fiveRBoxes = document.querySelectorAll(
  ".refuse, .reduce, .reuse, .recycle, .rot",
);

if (fiveRSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add animation class to each box with stagger effect
          fiveRBoxes.forEach((box) => {
            box.classList.add("animate");
          });
          // Stop observing after animation is triggered
          observer.unobserve(fiveRSection);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the section is visible
    },
  );

  observer.observe(fiveRSection);
}

// 5R boxes scroll animation ends

// accordion functionality
const accordionItems = document.querySelectorAll(".accordion-item");

accordionItems.forEach((item) => {
  const button = item.querySelector(".accordion-toggle");
  const icon = item.querySelector(".icon");

  button.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    accordionItems.forEach((panel) => {
      panel.classList.remove("active");
      panel
        .querySelector(".accordion-toggle")
        .setAttribute("aria-expanded", "false");
      panel.querySelector(".icon").textContent = "+";
    });

    if (!isOpen) {
      item.classList.add("active");
      button.setAttribute("aria-expanded", "true");
      icon.textContent = "−";
    }
  });
});
// accordion functionality ends

// card slide functionality
const envSlides = [
  {
    image: "landfills.jpg",
    title: "Landfill",
    description:
      "Learn how overflowing landfills impact our planet and why better waste habits matter every day.",
  },
  {
    image: "over flowing bins.jpg",
    title: "Overflowing Bins",
    description:
      "See how littered streets and overfilled bins can harm neighborhoods and local wildlife.",
  },
  {
    image: "plastic polution.jpg",
    title: "Plastic Pollution",
    description:
      "Explore the growing issue of plastic waste and its long-lasting effects on oceans and soil.",
  },
  {
    image: "food waste.jpg",
    title: "Food Waste",
    description:
      "Explore the impact of food waste on the environment and learn simple ways to reduce it.",
  },
];

const envCard = document.getElementById("env-carousel-card");
const envDotsContainer = document.getElementById("env-carousel-dots");
const envCarousel = document.querySelector(".env-carousel");

let envCurrentIndex = 0;
let envTouchStartX = 0;
let envTouchEndX = 0;

function renderEnvSlide() {
  const slide = envSlides[envCurrentIndex];
  envCard.innerHTML = `
    <div class="env-image-frame">
      <img src="${slide.image}" alt="${slide.title}" />
    </div>
    <div class="env-slide-content">
      <h2>${slide.title}</h2>
      <p>${slide.description}</p>
    </div>
  `;

  envDotsContainer.innerHTML = envSlides
    .map(
      (_, index) => `
        <button
          class="env-dot ${index === envCurrentIndex ? "active" : ""}"
          type="button"
          aria-label="Go to slide ${index + 1}"
          data-index="${index}"
        ></button>
      `,
    )
    .join("");

  envDotsContainer.querySelectorAll(".env-dot").forEach((envDot) => {
    envDot.addEventListener("click", () => {
      envCurrentIndex = Number(envDot.dataset.index);
      renderEnvSlide();
    });
  });
}

function showEnvNext() {
  envCurrentIndex = (envCurrentIndex + 1) % envSlides.length;
  renderEnvSlide();
}

function showEnvPrev() {
  envCurrentIndex = (envCurrentIndex - 1 + envSlides.length) % envSlides.length;
  renderEnvSlide();
}

// Swipe functionality for env carousel
envCarousel.addEventListener(
  "touchstart",
  (e) => {
    envTouchStartX = e.changedTouches[0].screenX;
  },
  false,
);

envCarousel.addEventListener(
  "touchend",
  (e) => {
    envTouchEndX = e.changedTouches[0].screenX;
    handleEnvSwipe();
  },
  false,
);

function handleEnvSwipe() {
  const swipeThreshold = 50;
  const diff = envTouchStartX - envTouchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      showEnvNext();
    } else {
      showEnvPrev();
    }
  }
}

setInterval(showEnvNext, 5000);

renderEnvSlide();

// Click handlers for environment carousel navigation buttons
const envPrevBtn = document.querySelector(
  ".env-carousel .env-nav-btn:first-child",
);
const envNextBtn = document.querySelector(
  ".env-carousel .env-nav-btn:last-child",
);

if (envPrevBtn) {
  envPrevBtn.addEventListener("click", showEnvPrev);
}
if (envNextBtn) {
  envNextBtn.addEventListener("click", showEnvNext);
}

// card slide functionality ends

// image slider functionality
let patchSlideIndex = 1;
let patchTouchStartX = 0;
let patchTouchEndX = 0;
const patchCarouselShell = document.getElementById("patch-carousel-shell");

// Initialize carousel on page load
document.addEventListener("DOMContentLoaded", function () {
  patchShowSlides(patchSlideIndex);
});

function patchChangeSlide(n) {
  patchShowSlides((patchSlideIndex += n));
}

function patchCurrentSlide(n) {
  patchShowSlides((patchSlideIndex = n));
}

function patchShowSlides(n) {
  const slides = document.querySelectorAll(".patch-slide");
  const dots = document.querySelectorAll(".patch-dot");

  if (n > slides.length) {
    patchSlideIndex = 1;
  }

  if (n < 1) {
    patchSlideIndex = slides.length;
  }

  // Hide all slides
  slides.forEach((slide) => {
    slide.style.display = "none";
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("patch-active");
  });

  // Show current slide and set active dot
  slides[patchSlideIndex - 1].style.display = "block";
  dots[patchSlideIndex - 1].classList.add("patch-active");
}

// Swipe functionality for patch carousel
patchCarouselShell.addEventListener(
  "touchstart",
  (e) => {
    patchTouchStartX = e.changedTouches[0].screenX;
  },
  false,
);

patchCarouselShell.addEventListener(
  "touchend",
  (e) => {
    patchTouchEndX = e.changedTouches[0].screenX;
    handlePatchSwipe();
  },
  false,
);

function handlePatchSwipe() {
  const swipeThreshold = 50;
  const diff = patchTouchStartX - patchTouchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      patchChangeSlide(1);
    } else {
      patchChangeSlide(-1);
    }
  }
}

// Click handlers for patch carousel navigation buttons
const patchPrevBtn = document.querySelector(".patch-prev");
const patchNextBtn = document.querySelector(".patch-next");

if (patchPrevBtn) {
  patchPrevBtn.addEventListener("click", () => patchChangeSlide(-1));
}
if (patchNextBtn) {
  patchNextBtn.addEventListener("click", () => patchChangeSlide(1));
}

// image slider functionality ends

// video links
const videos = [
  {
    id: "6jQ7y_qQYUA",
    title: "Learning to Sort Waste",
    description:
      "This educational video by Kids Academy teaches children about the importance of recycling and how it works.",
  },
  {
    id: "BnwdpR_2idA",
    title: "How to Recycle Correctly",
    description:
      "This practical guide by WWF UK breaks down how to navigate the often confusing world of household recycling.",
  },
  {
    id: "NPuYvnPFhwA",
    title: "Easy Recycling Habits You Can Start Today",
    description:
      "This quick, beginner-friendly video by EcoBuddy shares five accessible habits to help individuals reduce their environmental footprint through proper recycling.",
  },
  {
    id: "taReX-0HAwM",
    title: "Easy Eco-Friendly Habits You Can Start Today",
    description:
      "This fast-paced, actionable video by Eco Warriors lists ten straightforward lifestyle changes anyone can adopt to help protect the environment.",
  },
  {
    id: "Lfj8SKFlTpI",
    title: "Proper Waste Disposal According to Material Properties",
    description:
      "This educational video by Science For Every Juan provides a comprehensive look at how to sort and manage waste based on the properties of different materials.",
  },
  {
    id: "md5hmSu7fPg",
    title: "How to Properly Dispose of Organic Waste",
    description:
      "This news segment from NBC Bay Area explains California's landmark organic waste collection mandate.",
  },
  {
    id: "HgEo7YnvJs0",
    title: "Ways of Waste Management",
    description:
      "This informative video by the EcoMastery Project outlines four primary methods used to handle and dispose of solid waste to reduce its environmental impact.",
  },
  {
    id: "3s_ZNEFPiE0",
    title: "Recycling of E-Waste: Process and Protection",
    description:
      "This educational video by IMU Cares details the severe environmental and health hazards associated with throwing away electronic items like phones, laptops, and batteries in regular trash.",
  },
  {
    id: "GQ3RP1l8EHo",
    title: "Waste Management at Home: Practical Eco-Tips",
    description:
      "This quick video by Enwaste Environmental Services shares actionable ways to cut down on waste directly from your household.",
  },
  {
    id: "qFsRVakvmZI",
    title: "Types of Waste: Proper Waste Segregation",
    description:
      "This detailed educational guide by Kons Xenon explains how to identify and separate different categories of household and municipal waste.",
  },
  {
    id: "K6ppCC3lboU",
    title: "The 7 Rs of Waste Management: Sustainable Living Principles",
    description:
      "This environmental science video by Let'stute introduces an expanded approach to sustainability by teaching the 7 Rs principle of waste management.",
  },
];

const grid = document.getElementById("video-grid");

videos.forEach((video) => {
  const card = document.createElement("a");
  card.className = "video-card";
  card.href = `https://www.youtube.com/watch?v=${video.id}`;
  card.target = "_blank";
  card.rel = "noopener noreferrer";

  card.innerHTML = `
    <div class="video-thumb">
      <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="Preview for ${video.title}" loading="lazy" />
      <div class="play-badge"></div>
    </div>
    <div class="card-content">
      <h2>${video.title}</h2>
      <p>${video.description}</p>
    </div>
  `;

  grid.appendChild(card);
});

//video links end

// Toggle videos functionality
const toggleBtn = document.getElementById("toggleVideos");
const videoGrid = document.getElementById("video-grid");
let isExpanded = false;

toggleBtn.addEventListener("click", () => {
  isExpanded = !isExpanded;

  if (isExpanded) {
    videoGrid.classList.add("expanded");

    // Add staggered animation delays to hidden videos
    const cards = document.querySelectorAll(".video-card");
    cards.forEach((card, index) => {
      if (index >= 6) {
        const delay = (index - 6) * 0.1;
        card.style.animationDelay = delay + "s";
      }
    });

    toggleBtn.textContent = "Show Less";
    toggleBtn.setAttribute("aria-expanded", "true");
  } else {
    videoGrid.classList.remove("expanded");
    toggleBtn.textContent = "Show More";
    toggleBtn.setAttribute("aria-expanded", "false");
    // Scroll to top of video section
    document.querySelector(".hero").scrollIntoView({ behavior: "smooth" });
  }
});

// toggle videos end
