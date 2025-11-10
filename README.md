# fast-web-template

#### 介绍

web模版合集，包含各种卡片、网站、小程序、app等静态模版合集

#### 软件架构

本项目采用纯前端技术栈，主要包含以下架构特点：

1. 目录结构
   - web/: 主要模板目录
     - art_card/: 艺术字体卡片模板
     - common_card/: 通用卡片模板

2. 技术栈
   - HTML5：采用语义化标签，确保良好的SEO和可访问性
   - CSS3：
     - Flexbox布局
     - CSS渐变和阴影效果
     - 响应式设计
     - CSS变量实现主题定制
   - 原生JavaScript：轻量级交互效果
   - Google Fonts：引入艺术字体，提供丰富的字体支持

3. 设计规范
   - 色彩系统：
     - 主色调：浅米色、莫兰迪紫、雾蓝、浅灰绿等柔和色系
     - 背景色：采用渐变设计
     - 文字色：深浅对比，确保可读性

   - 组件规范：
     - 卡片组件：统一圆角和阴影效果
     - 字体艺术：结合装饰性、曲线感和手写风格
     - 留白设计：突出主要内容

   - 响应式设计：
     - 移动端优先
     - 弹性布局适配
     - 内容自适应排列

4. 性能优化
   - 图片懒加载
   - CSS选择器优化
   - 最小化HTTP请求
   - 代码模块化，便于维护和复用

5. 使用说明
   - 每个模板都是独立的HTML文件
   - 样式表内联在HTML文件中，方便单文件使用
   - 模板可以独立使用，无需额外依赖

6. 开发规范
   - HTML语义化命名
   - CSS类名采用BEM命名规范
   - 代码注释完善
   - 文件命名规范：功能描述_序号.html

#### 模版

| 类别 | 文件名 | 说明 |
|------|--------|------|
| 后台模板 | [meta_admin_dashboard.html](./web/admin_dashboard/meta_admin_dashboard.html) | Meta风格后台管理面板 |
| 后台模板 | [meta_admin_dashboard copy.html](./web/admin_dashboard/meta_admin_dashboard%20copy.html) | Meta风格后台管理面板备份 |
| 艺术卡片 | [沟通艺术卡片.html](./web/art_card/沟通艺术卡片.html) | 沟通主题艺术字卡片 |
| 艺术卡片 | [艺术卡片字体_103.html](./web/art_card/艺术卡片字体_103.html) | 柔和色调艺术字体卡片 |
| 艺术卡片 | [艺术卡片字体_104.html](./web/art_card/艺术卡片字体_104.html) | 现代风格艺术字体卡片 |
| 艺术卡片 | [艺术字体卡片_105.html](./web/art_card/艺术字体卡片_105.html) | 3D效果艺术字体卡片 |
| Cloudflare | [1.html](./web/cloudflare/1.html) | Cloudflare相关模板 |
| 通用卡片 | [101.html](./web/common_card/101.html) | 左右分割通用卡片 |
| 通用卡片 | [102.html](./web/common_card/102.html) | 上下分割通用卡片 |
| 数据排行 | [2025彩礼前十排行.html](./web/rank/2025彩礼前十排行-83bd859755.html) | 2025年彩礼数据排行榜 |
| 数据排行 | [hunli.html](./web/rank/hunli.html) | 婚礼相关数据展示 |
| 视频封面 | [video_cover_1.html](./web/video_cover/video_cover_1.html) | 视频封面模板1 |
| 视频封面 | [video_cover_2.html](./web/video_cover/video_cover_2.html) | 视频封面模板2 |
| 视频封面 | [video_cover.html](./web/video_cover/video_cover.html) | 基础视频封面模板 |
| 视频封面 | [video_cover_generator.html](./web/video_cover/video_cover_generator.html) | 视频封面生成器 |
| 网站模板 | [web1.html](./web/video_cover/web1.html) | 基础网站模板1 |
| 网站模板 | [website.html](./web/video_cover/website.html) | 基础网站模板2 |
| 博客模板 | [blog_1.html](./web/website/blog_1.html) | 个人博客模板1 |
| 代理工具 | [v2ray.html](./web/proxy/v2ray.html) | 多个 VMess/VLESS 节点映射为本地多个 SOCKS5 端口（适用于 Linux 无头系统） |

#### 在线访问

🌐 在线演示地址：`https://tuonioooo.github.io/fast-web-template/`

所有模板都已部署到 GitHub Pages，可以直接在线浏览和使用。

#### 部署说明

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

**首次部署步骤：**

1. **启用 GitHub Pages**
   - 进入仓库的 Settings → Pages
   - 在 "Source" 下选择 "GitHub Actions"
   - 保存设置

2. **推送代码触发部署**
   ```bash
   git add .
   git commit -m "配置 GitHub Pages 部署"
   git push origin main
   ```

3. **等待部署完成**
   - 在仓库的 Actions 标签页查看部署进度
   - 部署成功后，即可通过 `https://tuonioooo.github.io/fast-web-template/` 访问

**自动部署：**
- 每次推送到 main 分支时，会自动触发部署
- 也可以在 Actions 标签页手动触发部署

**访问页面：**
- 主页：`https://tuonioooo.github.io/fast-web-template/`
- 任意模板：`https://tuonioooo.github.io/fast-web-template/web/xxx/xxx.html`

#### 其他

* [指令](./docs/指令/指令.md)
* [部署指南](./docs/部署指南.md) - 详细的 GitHub Pages 部署教程

