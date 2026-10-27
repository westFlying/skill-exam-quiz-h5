# 考评人员考试 · H5 自测

在线答题：https://westflying.github.io/skill-exam-quiz-h5/

单选 60 题、多选 5 题、判断 20 题，满分 100。提交后显示得分和错题对照，可无限次重新答题。

## 文件

| 文件 | 说明 |
|------|------|
| `index.html` | 答题页，题库和答案已内嵌，单文件即可运行 |
| `quiz-data.json` | 题库源数据 |
| `deploy-github-pages.sh` | 用本机 `gh` 创建仓库并开启 Pages 的脚本 |

## 改题

页面实际读取的是 `index.html` 里的 `QUIZ_EMBED`。修改 `quiz-data.json` 后，需要把同样的内容替换进 `QUIZ_EMBED`，提交推送后 Pages 会在一两分钟内自动更新。
