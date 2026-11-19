// Barra de progreso de lectura superior
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
  scrollProgress.style.width = `${pct}%`;
});

// Menú móvil hamburguesa
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Animación suave al hacer scroll
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Botón copiar comandos de terminal
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const codeText = btn.dataset.copy.replaceAll('&#10;', '\n');
    try {
      await navigator.clipboard.writeText(codeText);
      const original = btn.textContent;
      btn.textContent = '¡Copiado! ✓';
      setTimeout(() => (btn.textContent = original), 1600);
    } catch {
      btn.textContent = 'Error al copiar';
    }
  });
});

// Resaltado activo en navbar según la sección visible
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 130;
    if (window.scrollY >= top) {
      currentId = sec.getAttribute('id');
    }
  });

  navAnchors.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
  });
});
