"""Flask server for the SoundCloud replica."""

from __future__ import annotations

from pathlib import Path
from typing import Dict, List

from flask import Flask, Response, send_file, send_from_directory

BASE_DIR = Path(__file__).parent

injected_content: List[Dict] = []


def build_content_card(item: Dict, variant: str) -> str:
    """Return HTML markup for injected content."""
    tags = item.get("tags") or []
    tag_html = "".join(f'<span class="tag">{tag}</span>' for tag in tags)
    badge = (
        f'<span class="badge">{item.get("badge_text")}</span>'
        if item.get("featured") and item.get("badge_text")
        else ""
    )

    if variant == "primary_playlists":
        return f"""
        <article class=\"playlist-card injected\">
            <div class=\"playlist-art\">{item.get('artwork_url', 'SC')} {badge}</div>
            <h3>{item.get('title', 'Untitled set')}</h3>
            <p>{item.get('description', '')}</p>
            <div class=\"playlist-meta\">
                <span>{item.get('plays', '0 plays')}</span>
                <span>{item.get('mood', 'All')}</span>
            </div>
            <button class=\"secondary-btn\">{item.get('cta_text', 'Listen')}</button>
        </article>
        """

    return f"""
    <article class=\"card injected\">
        {badge}
        <h3>{item.get('title', 'New drop')}</h3>
        <p>{item.get('description', '')}</p>
        <p><strong>{item.get('artist', '')}</strong></p>
        <div class=\"playlist-meta\">
            <span>{item.get('plays', '0 plays')}</span>
            <span>{item.get('duration', '')}</span>
        </div>
        <div class=\"tag-row\">{tag_html}</div>
        <button class=\"ghost-btn\">{item.get('cta_text', 'View')}</button>
    </article>
    """


def inject_card(html: str, marker: str, card_html: str) -> str:
    idx = html.find(marker)
    if idx == -1:
        return html
    insert_pos = html.find('>', idx)
    if insert_pos == -1:
        return html
    insert_pos += 1
    return html[:insert_pos] + card_html + html[insert_pos:]


def apply_injections(html: str, section: str) -> str:
    result = html
    for item in injected_content:
        if item.get("section", "home") != section:
            continue
        target = "primary_playlists" if section == "home" else "section_grid"
        marker = f'data-injection-target="{target}"'
        if target == "section_grid":
            marker = f'{marker} data-section="{section}"'
        result = inject_card(result, marker, build_content_card(item, target))
    return result


def create_app() -> Flask:
    app = Flask(__name__, static_folder=None)

    @app.route('/css/<path:filename>')
    def css(filename: str):
        return send_from_directory(BASE_DIR / 'css', filename)

    @app.route('/js/<path:filename>')
    def javascript(filename: str):
        return send_from_directory(BASE_DIR / 'js', filename)

    @app.route('/images/<path:filename>')
    def images(filename: str):
        return send_from_directory(BASE_DIR / 'images', filename)

    def render_page(filename: str, section: str) -> Response:
        html_path = BASE_DIR / filename
        if not html_path.exists():
            return Response("Page not found", status=404)
        html = html_path.read_text(encoding='utf-8')
        html = apply_injections(html, section)
        return Response(html, mimetype='text/html')

    @app.route('/')
    @app.route('/index.html')
    def index():
        return render_page('index.html', 'home')

    @app.route('/discover.html')
    def discover():
        return render_page('discover.html', 'discover')

    @app.route('/charts.html')
    def charts():
        return render_page('charts.html', 'charts')

    @app.route('/creators.html')
    def creators():
        return render_page('creators.html', 'creators')

    @app.route('/plans.html')
    def plans():
        return render_page('plans.html', 'plans')

    @app.route('/apps.html')
    def apps_page():
        return render_page('apps.html', 'apps')

    @app.route('/api/content')
    def get_content():
        return {"content": injected_content, "count": len(injected_content)}

    return app


def start_server(port: int = 5000, threaded: bool = False, content_data: Dict | None = None):
    if content_data and content_data.get('title'):
        injected_content.append(content_data)
        print(f"[Server] Injected {content_data['title']} → {content_data.get('section', 'home')}")

    app = create_app()
    try:
        from agenticverse_entities.base.server_base import start_server as start_base_server

        return start_base_server(app, port=port, threaded=threaded)
    except ModuleNotFoundError:
        app.run(port=port, threaded=threaded)
        return app