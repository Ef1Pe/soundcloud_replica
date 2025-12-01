const heroSlides = [
  {
    title: 'It all starts with an upload.',
    copy:
      "From bedrooms and broom closets to stadiums, SoundCloud is where you define what's next in music.",
    artist: '909Baker',
    role: 'Upcoming Artist',
    image:
      'https://images.unsplash.com/photo-1511382270161-d873f8f73446?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Drop it. Share it. Watch it grow.',
    copy: 'Millions of fans are waiting for the next genre-bending moment. Upload and get instant feedback.',
    artist: 'Luna Vee',
    role: 'Future Classic',
    image:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80'
  },
  {
    title: 'Your sound deserves a stage.',
    copy: 'Reach listeners everywhere, monetize your superfans, and keep complete control of your masters.',
    artist: 'Formant Labs',
    role: 'Collective',
    image:
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=900&q=80'
  }
];

const playlistData = [
  {
    title: 'All-City Amplified',
    listeners: '156K plays',
    mood: 'Electronic',
    art: 'AC'
  },
  {
    title: 'Lo-Fi Study Sessions',
    listeners: '201K plays',
    mood: 'Beats',
    art: 'LF'
  },
  {
    title: 'Basement Bounce',
    listeners: '98K plays',
    mood: 'House',
    art: 'BB'
  },
  {
    title: 'Sunset Hues',
    listeners: '245K plays',
    mood: 'Indie',
    art: 'SH'
  }
];

const chartRows = [
  { track: 'Chrome Bloom', artist: 'Synth Dept.', plays: '1.2M', trend: '+12%' },
  { track: 'Neon Aria', artist: 'Mara Jade', plays: '986K', trend: '+4%' },
  { track: 'Frequencies', artist: 'Low End Lux', plays: '843K', trend: '-3%' },
  { track: 'Velveteen', artist: 'Dunes', plays: '780K', trend: '+9%' },
  { track: 'Ghost Mode', artist: 'Hexphase', plays: '702K', trend: '+2%' },
  { track: 'Satellite Bloom', artist: 'Eiro', plays: '688K', trend: '-1%' },
  { track: 'Crystal Logic', artist: 'Slo Motion', plays: '655K', trend: '+7%' },
  { track: 'Flicker Drift', artist: 'Pulse Ritual', plays: '601K', trend: '+5%' },
  { track: 'Deep Current', artist: 'Ana M.', plays: '590K', trend: '-4%' },
  { track: 'Etherline', artist: 'Arqade', plays: '573K', trend: '+3%' }
];

const sectionCardSets = {
  discover: [
    { title: 'Night Swim', description: 'Hypnotic downtempo cuts for late nights.' },
    { title: 'Feedback Loop', description: 'Analog techno transmissions from Berlin.' },
    { title: 'Indie Bloom', description: 'Lo-fi guitars drenched in chorus and sunshine.' },
    { title: 'Future Roots', description: 'Afro-diasporic bass experiments.' }
  ],
  charts: [
    { title: 'Rap Uprising', description: 'Unsigned MCs jumping 10+ spots overnight.' },
    { title: 'Hyperpop Surge', description: 'Glitched-out hooks dominating the feed.' },
    { title: 'Ambient Focus', description: 'Deep listening staples climbing global charts.' }
  ],
  creators: [
    { title: 'Fan-powered payouts', description: 'Earn directly from the fans who stream you most.' },
    { title: 'Instant mastering', description: 'AI mastering for balanced, release-ready mixes.' },
    { title: 'Promo Links', description: 'Smart links that adapt to each fan.' }
  ]
};

const subpagePrices = {
  monthly: { pro: '$16 / mo', teams: '$30 / seat' },
  annual: { pro: '$12 / mo', teams: '$24 / seat' }
};

function mountHeroCarousel() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const title = hero.querySelector('h1');
  const copy = hero.querySelector('.hero-copy');
  const artistName = hero.querySelector('.artist-name');
  const artistRole = hero.querySelector('.artist-role');
  const artistImage = hero.querySelector('.artist-image');
  const dots = hero.querySelectorAll('.hero-dots .dot');

  let index = 0;

  const applySlide = () => {
    const slide = heroSlides[index];
    title.textContent = slide.title;
    copy.textContent = slide.copy;
    artistName.textContent = slide.artist;
    artistRole.textContent = slide.role;
    artistImage.style.backgroundImage = `url(${slide.image})`;
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === index);
    });
  };

  applySlide();

  setInterval(() => {
    index = (index + 1) % heroSlides.length;
    applySlide();
  }, 6000);
}

function renderPlaylists() {
  const container = document.querySelector('.playlist-grid');
  if (!container) return;

  playlistData.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'playlist-card';
    card.innerHTML = `
      <div class="playlist-art">${item.art}</div>
      <h3>${item.title}</h3>
      <div class="playlist-meta">
        <span>${item.listeners}</span>
        <span>${item.mood}</span>
      </div>
      <button class="secondary-btn">Play</button>
    `;
    container.appendChild(card);
  });
}

function renderSectionCards() {
  document.querySelectorAll('[data-injection-target="section_grid"]').forEach((grid) => {
    const key = grid.dataset.section;
    const cards = sectionCardSets[key] || [];
    cards.forEach((cardData) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <h3>${cardData.title}</h3>
        <p>${cardData.description}</p>
        <button class="ghost-btn">Learn more</button>
      `;
      grid.appendChild(card);
    });
  });
}

function renderChartRows() {
  const tableBody = document.querySelector('[data-chart]');
  if (!tableBody) return;

  chartRows.forEach((row, i) => {
    const wrapper = document.createElement('div');
    const rising = row.trend.startsWith('+');
    wrapper.className = 'table-row';
    wrapper.innerHTML = `
      <div>${i + 1}</div>
      <div>${row.track}</div>
      <div>${row.artist}</div>
      <div>${row.plays}</div>
      <div class="${rising ? 'trend-up' : 'trend-down'}">${row.trend}</div>
    `;
    tableBody.appendChild(wrapper);
  });
}

function setupBillingToggle() {
  const toggle = document.getElementById('billingToggle');
  if (!toggle) return;
  const pro = document.querySelector('[data-price-pro]');
  const teams = document.querySelector('[data-price-teams]');

  const updatePrices = () => {
    if (toggle.checked) {
      pro.textContent = subpagePrices.annual.pro;
      teams.textContent = subpagePrices.annual.teams;
    } else {
      pro.textContent = subpagePrices.monthly.pro;
      teams.textContent = subpagePrices.monthly.teams;
    }
  };

  toggle.addEventListener('change', updatePrices);
  updatePrices();
}

function searchSuggestions() {
  const input = document.querySelector('.search-group input');
  if (!input) return;

  const suggestions = ['Hyperpop', 'Lo-fi', 'Podcasts', 'Live sets'];
  const list = document.createElement('ul');
  list.className = 'search-suggestions';
  input.parentElement.appendChild(list);

  input.addEventListener('input', () => {
    const value = input.value.trim().toLowerCase();
    list.innerHTML = '';
    if (!value) return;
    suggestions
      .filter((item) => item.toLowerCase().includes(value))
      .forEach((match) => {
        const li = document.createElement('li');
        li.textContent = match;
        li.addEventListener('mousedown', () => {
          input.value = match;
          list.innerHTML = '';
        });
        list.appendChild(li);
      });
  });

  document.addEventListener('click', (event) => {
    if (!list.contains(event.target) && event.target !== input) {
      list.innerHTML = '';
    }
  });
}

function mobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    document.body.classList.toggle('nav-open');
  });
}

function init() {
  mountHeroCarousel();
  renderPlaylists();
  renderSectionCards();
  renderChartRows();
  setupBillingToggle();
  searchSuggestions();
  mobileNav();
}

document.addEventListener('DOMContentLoaded', init);
