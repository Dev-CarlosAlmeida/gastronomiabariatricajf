// DARK / LIGHT MODE
const themeToggleBtn = document.getElementById("themeToggle");
const body = document.body;

// Aplica o tema salvo no localStorage
const savedTheme = localStorage.getItem("theme");
if(savedTheme) body.setAttribute("data-theme", savedTheme);

themeToggleBtn.addEventListener("click", () => {
  const isDark = body.getAttribute("data-theme") === "dark";
  if(isDark) {
    body.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    body.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

// MENU RESPONSIVO
const menuToggleBtn = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-toggle nav');

/*menuToggleBtn.addEventListener('click', () => {
  navMenu.classList.toggle('show');
});*/

function toggleMenu(e) {
  e.preventDefault(); // ALTERAÇÃO ANDROID: evita toque duplo no Android
  navMenu.classList.toggle('show');
}

// Dispara tanto no click quanto no touchstart
menuToggleBtn.addEventListener('click', toggleMenu);       // iOS e desktop
menuToggleBtn.addEventListener('touchstart', toggleMenu); // ALTERAÇÃO ANDROID: necessário para funcionar no Android


// Fecha menu automaticamente ao clicar em link (mobile)
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if(navMenu.classList.contains('show')) {
      navMenu.classList.remove('show');
    }
  });
});

// Remove menu aberto ao redimensionar tela
window.addEventListener('resize', () => {
  if(window.innerWidth > 480 && navMenu.classList.contains('show')) {
    navMenu.classList.remove('show');
  }
});

// CARROSSEL COM SWIPE
const carouselContainer = document.getElementById('carousel');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let isDragging = false;
let startX;
let scrollLeft;

// Função para arraste com mouse
carouselContainer.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX - carouselContainer.offsetLeft;
  scrollLeft = carouselContainer.scrollLeft;
});

carouselContainer.addEventListener('mouseleave', () => isDragging = false);
carouselContainer.addEventListener('mouseup', () => isDragging = false);
carouselContainer.addEventListener('mousemove', (e) => {
  if(!isDragging) return;
  e.preventDefault();
  const x = e.pageX - carouselContainer.offsetLeft;
  const walk = (x - startX) * 2;
  carouselContainer.scrollLeft = scrollLeft - walk;
});

// Swipe touch (mobile)
carouselContainer.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - carouselContainer.offsetLeft;
  scrollLeft = carouselContainer.scrollLeft;
});
carouselContainer.addEventListener('touchend', () => isDragging = false);
carouselContainer.addEventListener('touchmove', (e) => {
  if(!isDragging) return;
  const x = e.touches[0].pageX - carouselContainer.offsetLeft;
  const walk = (x - startX) * 2;
  carouselContainer.scrollLeft = scrollLeft - walk;
});

// Botões de navegação
const scrollAmount = 250;
prevBtn.addEventListener('click', () => {
  carouselContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});
nextBtn.addEventListener('click', () => {
  carouselContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});



// Fade-in ao rolar
const cards = document.querySelectorAll('.depoimentos-section .card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

const hero = document.querySelector('.hero');
const servicos = document.getElementById('servicos');

window.addEventListener('scroll', () => {
  const servicosTop = servicos.getBoundingClientRect().top;

  if (servicosTop <= 0) {
    hero.style.border = 'none';
  } else {
    hero.style.border = '4px solid rgba(42, 161, 119, 0.4)';
  }
});
