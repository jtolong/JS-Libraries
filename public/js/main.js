// start aos
AOS.init();

// start glide
const glide = new Glide('.glide', {
  type: 'carousel',
  perView: 1,
  focusAt: 'center'
});
glide.mount();

// start Leaflet Map
const map = L.map('map').setView([51.1657, 10.4515], 5); // centered over Germany

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data © OpenStreetMap contributors',
}).addTo(map);

// pin for Hansel & Gretel
L.marker([51.0, 9.0]).addTo(map)
  .bindPopup('Hansel & Gretel - Deep Forest')
  .openPopup();

// chart.js example
const ctx = document.getElementById('taleChart').getContext('2d');
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Witches', 'Forests', 'Royalty', 'Murders'],
    datasets: [{
      label: 'Tales Featuring...',
      data: [5, 6, 3, 2],
      backgroundColor: '#a3442e'
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
function fetchWikipediaSummary(title, element) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.extract) {
        element.textContent = data.extract;
      } else {
        element.textContent = "Summary not available.";
      }
    })
    .catch(err => {
      console.error('Wiki fetch error:', err);
      element.textContent = "Error loading summary.";
    });
}
// fetch summaries for each blurb
document.querySelectorAll('.wiki-blurb').forEach(el => {
  const title = el.getAttribute('data-title');
  fetchWikipediaSummary(title, el);
});
