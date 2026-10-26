#!/usr/bin/env bash
# 在你本机运行（需已 gh auth login）
set -euo pipefail
REPO_NAME="${1:-skill-exam-quiz-h5}"
OWNER="$(gh api user -q .login)"
ROOT="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT"
if [[ ! -f index.html ]]; then
  echo "缺少 index.html，请在 skill-exam-quiz 目录下运行" >&2
  exit 1
fi

if ! gh auth status -h github.com >/dev/null 2>&1; then
  echo "请先在本机执行: gh auth login" >&2
  exit 1
fi

if gh repo view "$OWNER/$REPO_NAME" >/dev/null 2>&1; then
  echo "仓库已存在: https://github.com/$OWNER/$REPO_NAME"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$OWNER/$REPO_NAME.git"
  git push -u origin main --force
else
  gh repo create "$REPO_NAME" --public --source=. --remote=origin --push --description "考评人员考试 H5 自测"
fi

# 开启 GitHub Pages（根目录 / main）
gh api -X POST "repos/$OWNER/$REPO_NAME/pages" \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/ 2>/dev/null || \
gh api -X PUT "repos/$OWNER/$REPO_NAME/pages" \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/

echo ""
echo "Pages 地址（约 1～2 分钟后生效）:"
echo "  https://$OWNER.github.io/$REPO_NAME/"
echo "  https://$OWNER.github.io/$REPO_NAME/index.html"
