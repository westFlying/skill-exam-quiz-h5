# 考评人员考试 · H5 自测

单页答题：提交后显示得分与错题，可无限次「重新答题」。

## 本地预览

```bash
cd /agent/skill-exam-quiz
python3 -m http.server 8765
```

手机/电脑访问：`http://你的IP:8765/index.html`

## 发给别人用的方式

1. **整文件夹上传** 到任意静态托管（阿里云 OSS、腾讯云 COS、GitHub Pages、Gitee Pages 等），分享 `index.html` 链接。
2. **仅上传** `index.html` 一个文件即可（题库已内嵌）。
3. 微信里打开链接即可答题（建议 HTTPS）。

## 文件说明

| 文件 | 说明 |
|------|------|
| `index.html` | 答题页（内嵌题库与答案） |
| `quiz-data.json` | 题库源数据（改题后重新运行 embed 脚本或手动同步） |

## 改答案 / 改题

编辑 `quiz-data.json` 后执行：

```bash
python3 embed.py   # 若存在；或重新运行仓库内生成脚本
```

当前答案与您提供的参考答案一致（单选 60 + 多选 5 + 判断 20）。
