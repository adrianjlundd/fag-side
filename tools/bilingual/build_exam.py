import copy
import json
from pathlib import Path
from manual import ROOT
from reviewed_exam_2024 import TEXT as H24
from reviewed_exam_2025 import TEXT as H25

translated={}
for entry in (H24+'\n@@\n'+H25).split('\n@@\n'):
    fields=entry.strip().splitlines()
    assert len(fields)==5,fields[:2]
    identifier,skill,answer,variant,solution=fields
    assert identifier not in translated
    translated[identifier]=dict(tema=skill,ferdighet=skill,originalSvar=answer,variant=variant,losning=solution)
labels={
 'Kontrollert mot offisiell fasit':'Checked against the official answer',
 'Kontrollert mot offisiell fasit · kildeavvik':'Checked against the official answer · source discrepancy',
 'Eget løsningsforslag · tomt fasitfelt':'Our proposed solution · original answer field is empty',
 'Tren på metodevalg og begrunnelse':'Practise choosing and justifying methods',
 'Gjenta regning og tolkning':'Repeat calculations and interpretation',
 'Metoden er oppført i H26-kildene og prøvd i denne oppgaven. Klipping hadde tre egne nummer i H24.':'The method appears in H26 sources and is tested in this question. Clipping had three separate question numbers in H24.',
 'Metoden er oppført i H26-kildene og prøvd i denne oppgaven. Begge årgangene prøver ferdigheter fra dette temaet.':'The method appears in H26 sources and is tested in this question. Both years test skills from this topic.',
 'Metoden er oppført i H26-kildene og prøvd i denne oppgaven. H25 gir en direkte oppgave om dette deltemaet.':'The method appears in H26 sources and is tested in this question. H25 has a direct question on this subtopic.',
}
rows=json.loads((ROOT/'visdat/kilder/eksamen.json').read_text('utf-8'))
assert set(translated)=={r['id'] for r in rows}
for row in rows:
    row.update(translated[row['id']])
    for field in ['svarstatus','prioritering','begrunnelse']:row[field]=labels[row[field]]
    for field in ['kilde','fasitkilde','pensum']:
        row[field]=row[field].replace(' s. ',' p. ').replace(' nr. ',' no. ').replace(' og ',' and ').replace('trykt side','printed page').replace('kap.','ch.').replace('likn.','eq.').replace('fra p.','from p.').replace(' om FFT',' on FFT').replace(' om Hough-transformen',' on the Hough transform')
(ROOT/'visdat/kilder/eksamen.en.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n','utf-8')
print('Built all 134 manually translated exam entries; identifiers and order retained.')
