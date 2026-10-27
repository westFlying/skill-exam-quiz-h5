#!/usr/bin/env bash
# 重新打包：bash build.sh，产物写到上一级的 index.html
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm install --no-audit --no-fund

npx esbuild main.tsx \
  --bundle --minify --format=iife --target=es2017 \
  --jsx=automatic \
  --alias:cursor/canvas=./canvas-shim.tsx \
  --define:process.env.NODE_ENV='"production"' \
  --legal-comments=none \
  --outfile=dist/app.js

python3 - <<'PY'
from pathlib import Path

bundle = Path("dist/app.js").read_text(encoding="utf-8").replace("</script", "<\\/script")
html = Path("template.html").read_text(encoding="utf-8").replace("__BUNDLE__", bundle)
Path("../index.html").write_text(html, encoding="utf-8")
print(f"../index.html  {len(html.encode('utf-8')) / 1024:.1f} KB")
PY
