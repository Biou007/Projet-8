// Scroll fluide au clic sur les liens

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animation au scroll (apparition de chaque section doucement)

const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

fadeElements.forEach((element) => {
  observer.observe(element);
});

// Surlignement lien Navbar au scroll

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu a");

function activateMenuOnScroll() {
  let scrollY = window.scrollY + window.innerHeight / 2;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `.menu a[href="#${sectionId}"]`,
      );

      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", activateMenuOnScroll);

// Retour en haut

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
});

topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Tab + Enter

navLinks.forEach((link) => {
  link.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      link.click();
    }
  });
});

// Menu hamburger sur mobile

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".menu-overlay");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("open");
  overlay.classList.toggle("active");
});

overlay.addEventListener("click", () => {
  menu.classList.remove("open");
  overlay.classList.remove("active");
});

// pour fermer le menu hamburger et afficher le contenu derrière

const links = document.querySelectorAll(".menu a");

links.forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    overlay.classList.remove("active");
  });
});

// animation cartes A propos

const cards = document.querySelectorAll(".about-block");

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty("--x", `${x}px`);
    card.style.setProperty("--y", `${y}px`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 14;
    const rotateY = (centerX - x) / 14;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// Formulaire de contact

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // *reset erreurs
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";

  nameInput.classList.remove("input-error");
  emailInput.classList.remove("input-error");
  messageInput.classList.remove("input-error");

  // *nom
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Veuillez renseigner votre nom.";
    nameInput.classList.add("input-error");
    isValid = false;
  }

  // *email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Veuillez renseigner votre email.";
    emailInput.classList.add("input-error");
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = "Veuillez entrer une adresse email valide.";
    emailInput.classList.add("input-error");
    isValid = false;
  }

  // message
  if (messageInput.value.trim() === "") {
    messageError.textContent = "Veuillez écrire un message.";
    messageInput.classList.add("input-error");
    isValid = false;
  }

  if (!isValid) return;

  alert("Message envoyé !");
  form.reset();
});
