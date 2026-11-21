"""Opt-in private translation preview; no draft files enter the Pages artifact."""
import importlib.util
from http.server import ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('forhandsvis', ROOT/'tools/forhandsvis.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class Comparison(module.Studieside):
    def public_path(self):
        if self.path.split('?')[0].split('#')[0] == '/fag-side/tools/bilingual/lesson-preview.html':
            return ROOT/'tools/bilingual/lesson-preview.html'
        return super().public_path()

if __name__ == '__main__':
    print('http://127.0.0.1:8196/fag-side/tools/bilingual/lesson-preview.html',flush=True)
    ThreadingHTTPServer(('127.0.0.1',8196),Comparison).serve_forever()
