#!/usr/bin/env python3
"""Make a portable offline demo, bundling verified starter data and assets."""
from pathlib import Path
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
index = (DIST / 'index.html').read_text('utf-8')
style = (DIST / 'styles.css').read_text('utf-8')
app = (DIST / 'app.js').read_text('utf-8')
data = {path.stem: json.loads(path.read_text('utf-8')) for path in (DIST/'data').glob('*.json')}
# Prevent close-script injection if a source title unexpectedly contains HTML.
payload = json.dumps(data, ensure_ascii=True).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
index=index.replace('<link rel="stylesheet" href="./styles.css" />','<style>'+style+'</style>')
index=index.replace('<script src="./app.js" type="module"></script>','')
inline = '<script>const offlineData='+payload+';window.fetch=async function(url){const name=String(url).split("/").pop().replace(".json","");return {ok:!!offlineData[name],json:async()=>offlineData[name],status:offlineData[name]?200:404};};</script>'
inline += '<script>'+app.replace('</script','<\\/script')+'</script>'
index=index.replace('</body>',inline+'</body>')
output=Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / 'preview.html'
output.write_text(index,encoding='utf-8')
print(output,output.stat().st_size)
