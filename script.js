
// =====================
// Navbar Toggle
// =====================
const toggle = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  links.classList.toggle("active");
});

// =====================
// Modal & Contact Form
// =====================
const modal = document.getElementById("contactModal");
const hireBtn = document.querySelector(".main-btn");
const closeBtn = document.querySelector(".close-btn");
const contactForm = document.querySelector(".contact-form");
const successMsg = document.querySelector(".success-msg");

// Open modal when "Hire Me" clicked
hireBtn.addEventListener("click", (e) => {
  e.preventDefault();
  modal.style.display = "flex";
});

// Close modal when ❌ clicked
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Close modal when clicking outside modal content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// Form submission (frontend only)
contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent actual submission

  // Show success message
  successMsg.classList.add("show");

  // Optional: tiny confetti effect
  createConfetti();

  // Hide success message & close modal after 3s
  setTimeout(() => {
    successMsg.classList.remove("show");
    modal.style.display = "none";
    contactForm.reset(); // clear inputs
  }, 3000);
});

// =====================
// Optional: Confetti Effect
// =====================
function createConfetti() {
  const colors = ["#FFC700", "#FF0000", "#00FF00", "#00CFFF", "#FF00FF"];
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 1 + Math.random() * 2 + "s";
    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 2000);
  }
}


contactForm.addEventListener("submit", function(e) {
  e.preventDefault(); // prevent redirect
  successMsg.classList.add("show");

  createConfetti();

  setTimeout(() => {
    successMsg.classList.remove("show");
    modal.style.display = "none";
    contactForm.reset();
  }, 3000);

  // actually send form data via Formspree using fetch
  const formData = new FormData(contactForm);
  fetch(contactForm.action, {
    method: "POST",
    body: formData,
    headers: { 'Accept': 'application/json' }
  });
});
