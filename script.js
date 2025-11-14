



document.addEventListener("DOMContentLoaded", () => {
  const textArray = [
    "I'm a Frontend Developer 🎨",
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



// ===== Circular Skills Animation =====
const skillCircles = document.querySelectorAll('.skill-circle');

skillCircles.forEach(circle => {
  const progress = circle.querySelector('.progress');
  const level = circle.dataset.level;
  const offset = 314 - (314 * level) / 100;
  progress.style.strokeDashoffset = offset;
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


// ===== Projects Tabs =====
const tabButtons = document.querySelectorAll('.tab-btn');
const projectSections = document.querySelectorAll('.projects-container');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // deactivate all tabs
    tabButtons.forEach(btn => btn.classList.remove('active'));
    // hide all project sections
    projectSections.forEach(sec => {
      sec.classList.remove('active');
      sec.style.display = 'none';
    });

    // activate clicked tab
    button.classList.add('active');

    // show related section
    const target = button.getAttribute('data-target');
    const activeSection = document.getElementById(target);
    activeSection.style.display = 'flex';

    // trigger animation after small delay for smooth slide-in
    setTimeout(() => activeSection.classList.add('active'), 50);

    // smooth scroll to keep section in view
    activeSection.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});


  

window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 30);
});

      // ===== Skill bar progress animation =====
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector(".skill-progress");
        const level = Math.max(0, Math.min(100, Number(entry.target.dataset.level) || 0));

        // Reset
        bar.style.transition = "none";
        bar.style.width = "0%";

        // Force reflow so browser registers the reset
        void bar.offsetWidth;

        // Animate forward fill
        bar.style.transition = "width 1.8s ease-in-out";
        bar.style.width = `${level}%`;

        // Stop watching after animation
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  skillCards.forEach(card => observer.observe(card));
});

  


  (function(){
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (!menuToggle || !navbar) return; // fail safely if selectors missing

    // toggle open/close
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.toggle('active');
    });

    // close menu when clicking outside (nice UX)
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navbar.classList.contains('active')) {
        navbar.classList.remove('active');
      }
    });

    // optional: close menu when a link is clicked (mobile)
    navLinks?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        if (navbar.classList.contains('active')) navbar.classList.remove('active');
      });
    });
  })();
