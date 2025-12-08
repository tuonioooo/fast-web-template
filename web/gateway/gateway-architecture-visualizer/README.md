<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Gateway Architecture Visualizer

一个高保真、交互式的 Spring Cloud Gateway 网关架构示意图，具有路径高亮和清晰的 SVG 图形展示。

## 项目描述

Gateway Architecture Visualizer 是一个现代化的可视化工具，用于展示和理解 Spring Cloud Gateway 网关的架构设计。该应用提供了直观的交互式界面，帮助开发人员更好地理解微服务网关的工作流程和请求路由机制。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **React** | ^19.2.1 | 用户界面框架 |
| **React DOM** | ^19.2.1 | React 渲染库 |
| **TypeScript** | ~5.8.2 | 编程语言 |
| **Vite** | ^6.2.0 | 构建工具和开发服务器 |
| **Lucide React** | ^0.556.0 | React 图标库 |
| **pnpm** | Latest | 包管理工具 |

## 前置要求

- **Node.js** (v16.0.0 或以上)
- **pnpm** (v8.0.0 或以上)

## 快速开始

### 1. 安装依赖

使用 pnpm 安装所有项目依赖：

```bash
pnpm install
```

### 2. 配置环境变量

在项目根目录创建 `.env.local` 文件（如果需要）：

```bash
GEMINI_API_KEY=your_api_key_here
```

### 3. 启动开发服务器

```bash
pnpm dev
```

应用会自动打开在 `http://localhost:5173` (或其他可用端口)。

### 4. 构建生产版本

```bash
pnpm build
```

构建文件会生成在 `dist/` 目录中。

### 5. 预览生产版本

```bash
pnpm preview
```

## 项目结构

```
.
├── App.tsx                 # 主应用组件
├── index.tsx              # 应用入口
├── index.html             # HTML 模板
├── types.ts               # TypeScript 类型定义
├── vite.config.ts         # Vite 配置文件
├── tsconfig.json          # TypeScript 配置
├── package.json           # 项目配置和依赖
├── metadata.json          # 项目元数据
├── README.md              # 项目说明文档
└── components/
    ├── Diagram.tsx        # 网关架构示意图组件
    └── Icons.tsx          # 图标组件
```

## 主要功能

- 🎯 **Spring Cloud Gateway 架构展示** - 清晰展示网关的核心组件和工作流程
- 🔄 **交互式路由展示** - 支持路径高亮，直观显示请求路由过程
- 📊 **SVG 图形渲染** - 高质量的矢量图形，支持缩放和交互
- 🎨 **现代化 UI** - 基于 React 和 Lucide 图标库的精美界面

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器 |
| `pnpm build` | 构建生产版本 |
| `pnpm preview` | 预览生产构建 |

## 开发建议

- 使用 TypeScript 编写代码以获得更好的类型安全性
- 遵循 React Hooks 最佳实践
- 组件代码保持简洁，复杂逻辑抽象为自定义 Hook
- 充分利用 Vite 的热模块替换 (HMR) 功能加快开发速度

## 许可证

MIT
