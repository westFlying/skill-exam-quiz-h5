# 考评人员考试 · H5 自测

在线答题：https://westflying.github.io/skill-exam-quiz-h5/

单选 60 题、多选 5 题、判断 20 题，满分 100。提交后显示得分和错题对照，可无限次重新答题。

另有一个独立页面：[14 寸轻薄本对比（≤6000 元，办公 + AI）](https://westflying.github.io/skill-exam-quiz-h5/laptops/)

## 文件

| 文件 | 说明 |
|------|------|
| `index.html` | 答题页，题库和答案已内嵌，单文件即可运行 |
| `quiz-data.json` | 题库源数据 |
| `deploy-github-pages.sh` | 用本机 `gh` 创建仓库并开启 Pages 的脚本 |
| `laptops/index.html` | 轻薄本对比页，由 Cursor Canvas 打包而来，单文件即可运行 |
| `laptops/src/` | 轻薄本对比页的 Canvas 源码和打包脚本 |

## 改题

页面实际读取的是 `index.html` 里的 `QUIZ_EMBED`。修改 `quiz-data.json` 后，需要把同样的内容替换进 `QUIZ_EMBED`，提交推送后 Pages 会在一两分钟内自动更新。

## 更新轻薄本对比页

把新的 Canvas 源码覆盖到 `laptops/src/laptops.canvas.tsx`，在 `laptops/src/` 下运行 `bash build.sh`（需要 Node.js 和 Python 3），会重新生成 `laptops/index.html`，提交推送即可。
