document.addEventListener("DOMContentLoaded", () => {
  // =====================
  // Navbar Toggle
  // =====================
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  toggle.addEventListener("click", () => links.classList.toggle("active"));

  // =====================
  // Modal & Contact Form
  // =====================
  const hireBtn = document.querySelector(".main-btn");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close-btn");
  const contactForm = document.querySelector(".contact-form");
  const successMsg = document.querySelector(".success-msg");

  // Open modal
  hireBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "flex";
  });

  // Close modal
  closeBtn.addEventListener("click", () => modal.style.display = "none");
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // =====================
  // Form Submission
  // =====================
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent default submit
    successMsg.classList.add("show");

    // Optional: confetti effect
    createConfetti();

    // Send form data via Formspree
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    // Hide modal + success after 3s
    setTimeout(() => {
      successMsg.classList.remove("show");
      modal.style.display = "none";
      contactForm.reset();
    }, 3000);
  });

  // =====================
  // Confetti Effect
  // =====================
  function createConfetti() {
    const colors = ["#FFC700","#FF0000","#00FF00","#00CFFF","#FF00FF"];
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
});
