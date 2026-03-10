# 文件结构与职责说明

## 概览

这个项目是一个基于 Vite + React 的小型 dashboard 应用。

当前代码库主要分为三个区域：

- `src/`：应用源码
- `tests/`：结构与回归测试
- `docs/`：设计与计划文档

## 目录结构

```text
docs/
  plan/
    file-structure-and-responsibilities.md
  plans/
    2026-03-10-dashboard-refactor-design.md
    2026-03-10-dashboard-refactor.md

src/
  App.tsx
  main.tsx
  index.css
  components/
    dashboard/
      Header.tsx
      Recommended.tsx
      RightPanel.tsx
      Sidebar.tsx
      TopGrid.tsx
      ui.tsx
  data/
    dashboard.ts

tests/
  dashboard-components.test.tsx
  dashboard-data.test.ts
  top-grid-overlay.test.tsx
```

## 源码文件

### `src/main.tsx`

应用入口文件。

- 将 React 挂载到 `#root`
- 加载全局样式文件
- 渲染 `App`

### `src/App.tsx`

顶层页面组合文件。

- 保留页面最外层壳结构
- 渲染背景光斑和主玻璃容器
- 组合 `Sidebar`、`Header`、`TopGrid`、`Recommended` 和 `RightPanel`
- 应尽量保持轻量，避免写入具体区块的细节 UI

### `src/index.css`

全局样式入口。

- 引入 Tailwind
- 定义字体主题
- 提供 `no-scrollbar` 等共享工具类
- 包含浮动球体 logo 使用的 `animate-float` 关键帧

## Dashboard 组件

所有 dashboard 页面区块都放在 `src/components/dashboard/` 下。

### `src/components/dashboard/Sidebar.tsx`

左侧导航区域。

- 渲染产品品牌
- 根据数据渲染分组导航项
- 渲染退出登录按钮

### `src/components/dashboard/Header.tsx`

顶部头部区域。

- 渲染页面标题
- 渲染移动端菜单按钮
- 渲染搜索框和操作图标

### `src/components/dashboard/TopGrid.tsx`

页面顶部的交互卡片网格。

- 持有本地 `activeCard` 状态
- 渲染四张主卡片
- 保留当前 hover 激活交互行为
- 应继续作为唯一管理 top-grid 交互状态的地方

### `src/components/dashboard/Recommended.tsx`

推荐内容区域。

- 渲染区块标题
- 渲染分类 tab
- 根据数据渲染推荐卡片列表

### `src/components/dashboard/RightPanel.tsx`

右侧助手 / 聊天面板。

- 渲染欢迎标题
- 根据数据渲染当前聊天内容
- 渲染内嵌媒体卡片
- 渲染底部输入区域

### `src/components/dashboard/ui.tsx`

共享的轻量级 dashboard UI 基础组件。

- `SphereIcon`：用于 logo 和聊天头像的渐变圆球
- `AnimatedLogo`：侧边栏使用的动态品牌标识
- `NavItem`：侧边栏复用的导航行组件

这个文件应只包含小型共享展示组件，不应放页面级区块。

## 数据文件

### `src/data/dashboard.ts`

静态 dashboard 内容和配置数据。

- 导航分组和标签
- top grid 卡片元数据
- 推荐 tab 和推荐内容
- 右侧面板标题
- 聊天消息与内嵌媒体内容

这个文件应避免包含 JSX，只导出纯数据结构和类型定义。

## 测试文件

### `tests/dashboard-components.test.tsx`

组件级渲染 smoke test。

- 验证拆分后的 dashboard 区块组件可以正常渲染
- 检查关键可见内容仍然存在

### `tests/dashboard-data.test.ts`

静态数据特征测试。

- 验证导出的 dashboard 数据结构
- 保护当前内容分组的数量和标识不被意外改动

### `tests/top-grid-overlay.test.tsx`

当前布局的结构回归测试。

- 验证桌面端 top-grid 结构
- 检查卡片位置和预期的 data 属性
- 验证右侧面板中的 logo 不使用浮动动画

## 计划文档

### `docs/plans/2026-03-10-dashboard-refactor-design.md`

dashboard 简化重构的设计记录。

### `docs/plans/2026-03-10-dashboard-refactor.md`

dashboard 重构的实现计划。

## 维护说明

- 新的 dashboard 区块优先放在 `src/components/dashboard/` 下，除非它是通用的应用级组件。
- 新的静态文案或卡片配置优先放入 `src/data/dashboard.ts`。
- 保持 `src/App.tsx` 专注于页面组合，不承载具体区块细节。
- 如果改动了 `TopGrid` 或 `RightPanel` 中与布局敏感相关的标记结构，需要同步更新并运行 `tests/` 中的测试。
