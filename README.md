# SoundCloud Replica

A pixel-accurate, multi-page replica of the public SoundCloud marketing site, complete with a Flask backend and metadata-driven content injection hooks.

## 🧰 Tech Stack

- Static front-end: HTML5, CSS (custom with CSS variables), vanilla JavaScript
- Fonts & media: Inter via Google Fonts, open SVG/icon assets, Unsplash hero artwork
- Backend: Flask microservice with Agenticverse entity + metadata schema
- Dynamic content: Metadata-driven injection into playlist grids and secondary cards

## 📁 Project Structure

```
/workspace
├── index.html                # Homepage replica
├── discover.html             # Curated discovery feed
├── charts.html               # Charts page with data table
├── creators.html             # Creator tools overview
├── plans.html                # Pricing plans
├── apps.html                 # Platform/app ecosystem
├── css/
│   └── styles.css            # Global styling
├── js/
│   └── main.js               # Hero carousel, charts, filters
├── images/                   # Placeholder for local assets (optional)
├── site_analysis.yaml        # Design & injection reference
├── server.py                 # Flask app + injector
├── metadata.py               # Agenticverse metadata schema
├── entity.py                 # Entity wrapper
└── README.md
```

## 🚀 Getting Started

1. **Set up Python environment** (Python 3.10+ recommended).
2. **Install dependencies**:
   ```bash
   pip install flask agenticverse-entities
   ```
3. **Run the Flask server**:
   ```bash
   python server.py
   ```
   The replica will be available at `http://localhost:5000`.
4. **(Optional) Launch via Agenticverse entity**:
   ```python
   from entity import SoundCloudReplicaEntity

   SoundCloudReplicaEntity().start(port=5000, content_data={
       "section": "home",
       "title": "Injected Bassline",
       "description": "Custom card delivered through metadata.",
       "plays": "42K plays",
       "mood": "Deep House",
       "cta_text": "Play now",
       "featured": True,
       "badge_text": "Premiere",
       "tags": ["exclusive", "fan-favorite"]
   })
   ```

## 🔌 Dynamic Content Injection

- `metadata.py` defines the schema of accepted parameters, including section routing, artwork, moods, and optional badges/tags.
- `server.py` stores requests in-memory and injects cards into:
  - `div.playlist-grid[data-injection-target="primary_playlists"]` on the homepage.
  - `div.section-grid[data-section="{page}"]` on secondary pages (`discover`, `charts`, `creators`, `plans`, `apps`).
- Injected cards receive the `.injected` class so they are visually outlined for QA.
- The `/api/content` endpoint exposes all injected payloads for debugging.

## ✨ Key Features

- Promo banner, sticky navigation, hero upload module with carousel, and floating player bar.
- Trending playlists grid, creator callouts, spotlight cards, pricing layout, and app ecosystem grid.
- Responsive layout tuned for mobile/tablet breakpoints with a collapsible navigation drawer.
- JavaScript enhancements: hero auto-rotation, search suggestions, chart data rendering, pricing toggle, and filter chips.
- Ready-to-extend backend for programmatic playlist injection via metadata.

## ⚠️ Known Limitations

- Images use externally hosted assets; add local files into `images/` if offline access is required.
- In-memory injection store resets when the Flask server restarts.
- Agenticverse utilities must be available in the runtime; otherwise `server.py` falls back to running Flask directly.

Enjoy exploring and extending the SoundCloud replica! 🎧
