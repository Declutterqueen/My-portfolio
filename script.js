
document.addEventListener("DOMContentLoaded", () => {
  const textArray = [
   "I'm a Frontend Web Developer",
"I build clean, responsive websites",
"I write clear, human-centered content"

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



document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const projectSections = document.querySelectorAll('.projects-container');

  const featuredSection = document.getElementById('featured');
  const featuredCards = featuredSection.querySelectorAll('.project-card');
  const miniSection = document.getElementById('mini-projects');
  const featuredShowCount = 6; // show first 6 cards

  // ===== Functions =====
  function showFeatured() {
    featuredCards.forEach((card, index) => {
      card.style.display = index < featuredShowCount ? 'block' : 'none';
    });
    featuredSection.style.display = 'flex';
    featuredSection.style.flexWrap = 'wrap';
    featuredSection.style.gap = '20px';
    featuredSection.classList.add('active');
  }

  function showMini() {
    const miniCards = miniSection.querySelectorAll('.project-card');
    miniCards.forEach(card => card.style.display = 'block');
    miniSection.style.display = 'flex';
    miniSection.style.flexWrap = 'wrap';
    miniSection.style.gap = '20px';
    miniSection.classList.add('active');
  }

  function hideAllSections() {
    projectSections.forEach(sec => {
      sec.style.display = 'none';
      sec.classList.remove('active');
    });
  }

  // ===== Initial display =====
  hideAllSections();
  showFeatured(); // show featured first on page load
  tabButtons.forEach(btn => btn.classList.remove('active'));
  document.querySelector('.tab-btn[data-target="featured"]').classList.add('active');

  // ===== Tab click listener =====
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');

      // Remove active class from all buttons & activate clicked one
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Hide all sections
      hideAllSections();

      // Show correct section
      if (target === 'featured') {
        showFeatured();
      } else if (target === 'mini-projects') {
        showMini();
      }
    });
  });
});


