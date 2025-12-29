
document.addEventListener("DOMContentLoaded", () => {
  const textArray = [
    "I'm a Frontend Web Developer 🎨",
    "I build clean, responsive websites 💻",
    "I write creative blogs & essays ✍️"
  ];

  const typedText = document.getElementById("typed-text");
  const typingDelay = 100;
  const erasingDelay = 50;
  const newTextDelay = 1500;
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedText.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex = (textArrayIndex + 1) % textArray.length;
      setTimeout(type, typingDelay + 200);
    }
  }

  type();
});

// ===== Fade-in for Education Cards =====
const eduCards = document.querySelectorAll('.education-card');
const eduObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.3 });

eduCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  eduObserver.observe(card);
});

// ===== Skills Progress Bar Animation =====
const skillCards = document.querySelectorAll(".skill-card");
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector(".skill-progress");
      const level = Math.max(0, Math.min(100, Number(entry.target.dataset.level) || 0));
      bar.style.transition = "none";
      bar.style.width = "0%";
      void bar.offsetWidth;
      bar.style.transition = "width 1.8s ease-in-out";
      bar.style.width = `${level}%`;
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

skillCards.forEach(card => skillObserver.observe(card));

// ===== Projects Tabs =====
const tabButtons = document.querySelectorAll('.tab-btn');
const projectSections = document.querySelectorAll('.projects-container');
const frontendSection = document.getElementById('frontend');
const frontendCards = frontendSection.querySelectorAll('.project-card');
const loadMoreBtn = document.getElementById('load-more-frontend');
let displayedCount = 3; // initially show 3 cards

// Function to update Frontend cards display
function updateFrontendDisplay() {
  frontendCards.forEach((card, index) => {
    card.style.display = index < displayedCount ? 'block' : 'none'; // use block for proper alignment
  });
  loadMoreBtn.style.display = displayedCount >= frontendCards.length ? 'none' : 'inline-block';
}

// Initial display (only hide extra Frontend cards)
updateFrontendDisplay();

// Load More button
loadMoreBtn.addEventListener('click', () => {
  displayedCount += 3;
  updateFrontendDisplay();
});

// Tab click listener
tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Deactivate all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    // Hide all sections
    projectSections.forEach(sec => {
      sec.style.display = 'none';
      sec.classList.remove('active');
    });

    // Show clicked section
    const target = button.getAttribute('data-target');
    const activeSection = document.getElementById(target);
    if (!activeSection) return;

    activeSection.style.display = 'flex'; // container flex remains
    activeSection.classList.add('active');

    if (target === "frontend") {
      displayedCount = 3;
      updateFrontendDisplay();
    } else {
      // Show all cards for other tabs with block display
      const otherCards = activeSection.querySelectorAll('.project-card');
      otherCards.forEach(card => {
        card.style.display = 'block'; // block ensures proper h3 and content alignment
      });
    }
  });
});

// DO NOT trigger tab click on page load
// Home section opens first, skills bar works




// ===== Navbar Scroll & Menu Toggle =====
(function(){
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navbar) return;

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navbar.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navbar.classList.contains('active')) {
      navbar.classList.remove('active');
    }
  });

  navLinks?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (navbar.classList.contains('active')) navbar.classList.remove('active');
    });
  });

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 30);
  });
})();

// ===== Writing Section Tabs =====
const writingBtns = document.querySelectorAll('.writing-btn');
const writingSections = document.querySelectorAll('.writing-container');

writingBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    writingBtns.forEach(b => b.classList.remove('active'));
    writingSections.forEach(sec => {
      sec.classList.remove('active');
      sec.style.display = 'none';
    });

    btn.classList.add('active');
    const targetId = btn.dataset.writing;
    const targetSection = document.getElementById(targetId);
    targetSection.style.display = 'flex';
    setTimeout(() => targetSection.classList.add('active'), 50);
  });
});
