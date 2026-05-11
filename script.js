// ─── NAV SCROLL EFFECT ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── HAMBURGER MENU ───
function toggleMenu() {
  navbar.classList.toggle('menu-open');
}

// Close menu when a nav link is clicked (mobile)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => navbar.classList.remove('menu-open'));
});

// ─── FAQ ACCORDION ───
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  // Close all open items
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  // Open clicked item if it wasn't already open
  if (!isOpen) item.classList.add('open');
}

// ─── MODAL ───
function openModal(plan) {
  document.getElementById('modal').classList.add('active');
  document.body.style.overflow = 'hidden';
  if (plan) document.getElementById('modal-plan').value = plan;
}

function openModalFromEmail() {
  const email = document.getElementById('cta-email').value;
  openModal();
  if (email) document.getElementById('modal-email').value = email;
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeModalOutside(e) {
  if (e.target === document.getElementById('modal')) closeModal();
}

async function submitModal() {
  const data = {
    name: document.querySelector('input[placeholder="Sarah Johnson"]').value,
    email: document.getElementById('modal-email').value,
    phone: document.querySelector('input[type="tel"]').value,
    plan: document.getElementById('modal-plan').value,
    notes: document.querySelector('textarea').value,
  };
  const res = await fetch('https://formspree.io/f/xkoyynba', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (res.ok) {
    alert('🎬 Thanks! We\'ll be in touch shortly.');
    closeModal();
  } else {
    alert('Something went wrong. Please try again.');
  }
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ─── SCROLL FADE-UP ANIMATIONS ───
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

faders.forEach(f => observer.observe(f));