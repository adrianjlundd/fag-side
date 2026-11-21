"""Check only the local HTTP preview and its publication boundary."""
import json
from pathlib import Path
import urllib.request
import urllib.error
import sys
from manual import ROOT

base=f'http://127.0.0.1:{sys.argv[1] if len(sys.argv)>1 else "8195"}/fag-side/'
opener=urllib.request.build_opener(urllib.request.ProxyHandler({}))
public=[ROOT/'index.html',*(ROOT/'visdat').rglob('*')]
report=[]
for path in public:
    if not path.is_file():continue
    url=base+path.relative_to(ROOT).as_posix()
    with opener.open(url,timeout=10) as response:
        assert response.status==200,(url,response.status)
        report.append({'path':path.relative_to(ROOT).as_posix(),'status':response.status})
for private in ['PROGRESS.md','README.md','AGENTS.md','graphify-out/graph.json','kildemateriale/course_information.txt','tools/bilingual/lesson-preview.html']:
    try:opener.open(base+private,timeout=10)
    except urllib.error.HTTPError as error:assert error.code==404,(private,error.code)
    else:raise AssertionError('Private path exposed: '+private)
result={'publicFiles':len(report),'private404':6,'files':report}
(ROOT/'graphify-out/bilingual-http-check.json').write_text(json.dumps(result,indent=2),'utf-8')
print(f'PASS: {len(report)} public files served under /fag-side/; 6 private paths returned 404.')
