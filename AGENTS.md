# fast-web-template 工作指南

## 先定位任务

1. 进入仓库后运行 `git status --short --branch`，记录已有改动；将本次修改限制在对应模板和登记文件中。
2. 新增或调整模板前，阅读 [README.md](README.md)、[模板更新流程](docs/完善文档指令.md) 和目标分类中的相近页面。修改已有模板时，先在 [页面指令索引](docs/指令/指令.md) 查找其设计说明。
3. 涉及发布时，阅读 [部署指南](docs/部署指南.md) 和 `.github/workflows/deploy.yml`。推送 `main` 会自动公开部署整个仓库；仅在用户授权提交、推送或发布的相应范围内操作。

## 目录与入口

- `web/`：按类别组织独立模板。`website/` 放网站与博客，`art_card/`、`common_card/`、`xhs_card/` 放卡片，`admin_dashboard/` 放管理界面，`video_cover/` 放封面，`3d/` 放三维交互，`tools/` 放小工具。优先使用已有分类。
- `app/`：应用页面原型。
- 根 `index.html`：线上模板导航和搜索。模板直接写为 HTML 卡片，没有独立注册表或自动扫描流程。
- 根 `README.md`：模板目录表与使用入口。`README.en.md` 目前仍是脚手架说明，不作为实际构建流程的依据。
- `docs/指令/`：页面设计和使用说明；新增说明时同步该目录的 `指令.md` 索引。
- `web/gateway/gateway-architecture-visualizer/`、`web/gateway/nginx-gateway-example/`、`web/svg-view/`：独立 Vite 子项目，各自拥有 `package.json` 和构建输出；它们不是根目录的统一应用。

## 新增静态模板

1. 使用描述功能的文件名，将 HTML 放入相应的 `web/<分类>/` 目录。默认保持 HTML、CSS、原生 JavaScript 单文件可运行；确需拆分资源时，将资源放在模板旁并使用相对路径。
2. 使用 UTF-8、明确的页面标题和 viewport。保留页面自己的设计风格，按现有规范使用语义化标签、可辨认的类名和必要注释。
3. 移植外部示例前，核对代码、图片、字体和依赖的来源及使用许可。保留必要署名；许可不明时报告限制，或在得到授权后独立实现交互与素材。将浏览器实际需要的资源收齐，避免 HTTP 热链和本机绝对路径。
4. 在 `README.md` 的模板表中增加一行，在根 `index.html` 的对应分类增加一个 `.template-card` 链接。沿用现有 `.card-shine`、`.card-inner`、`.card-footer` 结构，并填写便于搜索的 `data-name`。
5. 链接使用 `./web/...` 等相对地址，兼容 GitHub Pages 的 `/fast-web-template/` 前缀。新窗口链接使用 `rel="noopener noreferrer"`。

## 验证

根目录没有 `package.json`，也没有统一的 lint、test 或 build 命令。独立 HTML 无需安装 Vite 或 React。针对修改过的页面完成以下检查：

```powershell
# 在仓库根目录启动本地静态服务；结束后用 Ctrl+C 停止
python -m http.server 8000 --bind 127.0.0.1

# 查看改动范围与空白错误
git diff --check
git diff --stat
git status --short
```

- 打开 `http://127.0.0.1:8000/`，搜索新模板并从卡片进入；确认 README 链接与实际文件名一致，注意部署环境大小写敏感。
- 检查页面控制台、资源请求和本地资源路径；独立模板也测试直接打开 HTML 的行为。
- 覆盖桌面、窄屏和横屏。检查关键操作、快速重复点击、首尾边界、键盘焦点，以及适用时的返回/前进、关闭后再次打开。
- 动画页面验证 `prefers-reduced-motion`，确保减少动画时仍能完成操作。交互控件使用可访问名称、可见焦点和正确状态。
- 只运行受影响子项目的检查。进入其目录阅读 README 和当前 `package.json` 的 scripts，再安装与锁文件匹配的依赖、运行实际存在的 lint/build 命令。首页目前指向这些项目的 `dist/index.html`，修改源代码后需验证对应构建输出；Pages 工作流本身不执行 Vite 构建。

## 交付与发布

- 交付时列出新增页面路径、登记位置、已执行的验证和未通过或未运行的检查。
- 保留用户已有改动和原始素材。提交时仅暂存本次明确涉及的文件。
- 发布工作流上传仓库根目录。将临时截图、测试日志、本地配置与私密数据留在仓库外；不要因为文档中的示例命令而自动推送或手动触发部署。
