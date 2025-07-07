// aos init
AOS.init();

// smooth scroll for nav links
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// glide carousel init
const glide = new Glide('.glide', {
  type: 'carousel',
  perView: 5,
  gap: 24,
  breakpoints: {
    1280: { perView: 4 },
    1024: { perView: 3 },
    768: { perView: 2 },
    480: { perView: 1 }
  }
});
glide.mount();

// back to top scroll
const backToTop = document.querySelector('.back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// leaflet map setup
const map = L.map('map').setView([51.1657, 10.4515], 6);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors',
}).addTo(map);

// fairy tale markers
const fairyTales = [
  { title: 'Hansel & Gretel', coords: [51.0, 9.0], location: 'German Forests' },
  { title: 'Sleeping Beauty', coords: [48.7758, 9.1829], location: 'Castle in Baden-Württemberg' },
  { title: 'Snow White', coords: [50.0833, 10.2333], location: 'Lohr am Main' },
  { title: 'Rumpelstiltskin', coords: [50.567, 9.683], location: 'Hesse' },
  { title: 'The Robber Bridegroom', coords: [50.05, 8.57], location: 'Frankfurt Forests' },
  { title: 'Rapunzel', coords: [51.3189, 9.4989], location: 'Trendelburg' },
  { title: 'Cinderella', coords: [49.4521, 11.0767], location: 'Franconia' },
  { title: 'The Frog Prince', coords: [52.52, 13.405], location: 'Brandenburg Swamps' },
  { title: 'Little Red Riding Hood', coords: [50.9833, 9.7667], location: 'Schwalm Region' },
  { title: 'The Elves and the Shoemaker', coords: [50.7374, 7.0982], location: 'Bonn' },
  { title: 'The Seven Ravens', coords: [48.1351, 11.582], location: 'Bavaria Mountains' },
  { title: 'The Juniper Tree', coords: [49.9929, 8.2473], location: 'Mainz' },
  { title: 'Briar Rose', coords: [48.4, 9.7333], location: 'Southwest Germany' },
  { title: 'The Golden Bird', coords: [50.1109, 8.6821], location: 'Frankfurt' },
  { title: 'The Twelve Dancing Princesses', coords: [50.9375, 6.9603], location: 'Cologne' },
  { title: 'The Six Swans', coords: [50.1167, 8.6833], location: 'Wiesbaden' },
  { title: 'The Wolf and the Seven Young Goats', coords: [51.2277, 6.7735], location: 'Düsseldorf' },
  { title: 'Mother Holle', coords: [51.3, 9.5], location: 'Hoher Meißner Mountain' },
  { title: 'The Wishing-Table...', coords: [49.8728, 8.6512], location: 'Darmstadt' },
  { title: 'Bearskin', coords: [49.0047, 8.3858], location: 'Karlsruhe' },
  { title: 'The Three Spinners', coords: [50.25, 8.65], location: 'Taunus Mountains' },
];

fairyTales.forEach(tale => {
  L.marker(tale.coords)
    .addTo(map)
    .bindPopup(`<strong>${tale.title}</strong><br>${tale.location}`);
});

// hamburger menu toggle
const toggleBtn = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
  toggleBtn.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// chart.js setup
const ctx = document.getElementById('taleChart').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Busiest Months',
        data: [2, 3, 4, 6, 8, 10, 12, 11, 8, 5, 3, 2],
        borderColor: '#a67c52',
        backgroundColor: 'rgba(166, 124, 82, 0.1)',
        pointBackgroundColor: '#ffeec2',
        pointBorderColor: '#a67c52',
        pointRadius: 4,
        tension: 0.4
      },
      {
        label: 'Cheapest Times',
        data: [10, 9, 7, 5, 4, 3, 2, 2, 3, 5, 7, 9],
        borderColor: '#556b2f',
        backgroundColor: 'rgba(85, 107, 47, 0.1)',
        pointBackgroundColor: '#f9f5eb',
        pointBorderColor: '#556b2f',
        pointRadius: 4,
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Best Times to Travel the German Fairy Tale Route',
        color: '#f0e6d2',
        font: { size: 22, family: 'Cormorant Garamond' }
      },
      legend: {
        labels: {
          color: '#d8c6a3',
          font: { family: 'Cormorant Garamond' }
        }
      },
      tooltip: {
        backgroundColor: '#3a2d1b',
        titleColor: '#ffeec2',
        bodyColor: '#e4d3a0',
        borderColor: '#806443',
        borderWidth: 1,
        padding: 12
      }
    },
    scales: {
      x: {
        ticks: { color: '#bda77a', font: { family: 'Cormorant Garamond' } },
        grid: { color: '#2c1f15' }
      },
      y: {
        beginAtZero: true,
        ticks: { color: '#bda77a', font: { family: 'Cormorant Garamond' } },
        grid: { color: '#2c1f15' }
      }
    }
  }
});

// wikipedia fetch summary
function fetchWikipediaSummary(title, element) {
  fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${title}`)
    .then(res => res.json())
    .then(data => {
      element.textContent = data.extract || "Summary not available.";
    })
    .catch(err => {
      console.error('Wiki fetch error:', err);
      element.textContent = "Error loading summary.";
    });
}

document.querySelectorAll('.wiki-blurb').forEach(el => {
  fetchWikipediaSummary(el.getAttribute('data-title'), el);
});

// gsap tip animations
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.tip').forEach(tip => {
  gsap.to(tip, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: tip,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
});

gsap.to('.tips-section', {
  scrollTrigger: {
    trigger: '.tips-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  },
  backgroundPosition: '50% 0%',
  ease: 'none'
});

gsap.from('.section-title', {
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%'
  },
  opacity: 0,
  y: 40,
  duration: 1,
  ease: 'power3.out'
});

// particles.js fairy sparkle
particlesJS("particles-js", {
  particles: {
    number: { value: 45, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    opacity: { value: 0.4, random: true },
    size: { value: 5, random: true },
    line_linked: { enable: false },
    move: { enable: true, speed: 0.2, direction: "top", out_mode: "out" }
  },
  interactivity: {
    events: {
      onhover: { enable: false },
      onclick: { enable: false }
    }
  },
  retina_detect: true
});

// travel tip of the month
const monthTips = {
  Jan: "Visit the snow-covered forests near Kassel and enjoy quiet paths with local guides.",
  Feb: "Head to lesser-known towns like Hamelin — fewer tourists and cozy cafés.",
  Mar: "Join early spring folklore hikes around Schwalm — Little Red Riding Hood country.",
  Apr: "Castle tours begin! Don’t miss Sababurg (Sleeping Beauty’s castle).",
  May: "Wildflower season. Hike through the Reinhardswald for magical blooms.",
  Jun: "Folk festivals start. Look for the Fairy Tale Festival in Hanau.",
  Jul: "Peak season — book castle stays early to avoid disappointment.",
  Aug: "Catch open-air puppet shows and fairy tale plays across Hesse.",
  Sep: "Cycle the trail from Steinau to Kassel — colorful and less crowded.",
  Oct: "Autumn forest walks + apple cider in fairy-tale villages = dreamy.",
  Nov: "Indoor story nights in medieval inns — magical and warm.",
  Dec: "Christmas Markets in Marburg and Kassel glow like fairy realms."
};

const currentMonth = new Date().toLocaleString('default', { month: 'short' });
const tip = monthTips[currentMonth] || "Explore the route anytime for a little magic.";
document.getElementById('travel-tip').textContent = `✨ Tip for ${currentMonth}: ${tip}`;
