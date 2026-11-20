"""Forhåndsvis bare de publiserbare filene på prosjektets GitHub Pages-sti."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
PREFIX = "/fag-side/"


class Studieside(SimpleHTTPRequestHandler):
    def public_path(self):
        path = unquote(urlsplit(self.path).path)
        if path == PREFIX:
            return ROOT / "index.html"
        if not path.startswith(PREFIX + "visdat/"):
            return None
        target = (ROOT / path[len(PREFIX):]).resolve()
        if not target.is_relative_to(ROOT / "visdat"):
            return None
        if target.is_dir():
            target = target / "index.html"
        if target.suffix.lower() not in {".html", ".css", ".js", ".json", ".md"}:
            return None
        return target

    def send_head(self):
        if self.public_path() is None:
            self.send_error(404)
            return None
        return super().send_head()

    def translate_path(self, path):
        return str(self.public_path())


if __name__ == "__main__":
    print("Studiesiden kjører på http://127.0.0.1:8195/fag-side/visdat/", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 8195), Studieside).serve_forever()

