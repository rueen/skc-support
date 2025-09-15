# 多站点构建配置说明

## 项目结构

```
├── config/
│   └── sites.js          # 站点配置文件
├── plugins/
│   └── html-variables.js # HTML变量替换插件
├── public/
│   ├── vite.svg              # 默认图标（本地和马来西亚站点使用）
│   ├── favicon-malaysia.ico  # 马来西亚站点图标（备用）
│   └── favicon-japan.ico     # 日本站点图标
├── src/
│   └── config/
│       └── env.js        # 环境配置（已更新支持多站点）
├── vite.config.js        # Vite配置（已更新支持多站点，包含代理配置）
└── package.json          # 包含多站点构建脚本
```

## 构建命令

### 开发环境
```bash
# 本地开发环境（默认）
npm run dev

# 马来西亚站点
npm run dev:malaysia

# 日本站点  
npm run dev:japan
```

### 生产构建
```bash
# 本地构建（默认）
npm run build

# 马来西亚站点
npm run build:malaysia

# 日本站点
npm run build:japan
```

### 预览
```bash
# 马来西亚站点
npm run preview:malaysia

# 日本站点
npm run preview:japan
```

## 构建输出

不同站点的构建文件会输出到不同目录：
- 本地站点：`dist/local/`
- 马来西亚站点：`dist/malaysia/`
- 日本站点：`dist/japan/`

## 站点配置

在 `config/sites.js` 中配置各站点信息：

```javascript
export default {
  Local: {
    baseUrl: 'http://localhost:3002',
    apiSignSecret: '...',
    faviconPath: '/vite.svg',
    title: 'SKC Local',
    description: 'SKC 本地开发环境'
  },
  Malaysia: {
    baseUrl: 'http://sapi.skcpop.com',
    apiSignSecret: '...',
    faviconPath: '/vite.svg',
    title: 'SKC Malaysia',
    description: '...'
  },
  Japan: {
    baseUrl: 'https://sapi.jpskc.com',
    apiSignSecret: '...',
    faviconPath: '/favicon-japan.ico',
    title: 'SKC Japan',
    description: '...'
  }
}
```

## 跨域处理

### 代理配置
- **所有站点**: 统一使用 Vite 代理，简化配置管理
- **本地站点 (Local)**: 代理转发到 `http://localhost:3002`
- **远程站点 (Malaysia/Japan)**: 代理转发到对应的远程API

### 代理工作原理
```
前端请求: http://localhost:3000/api/xxx
          ↓ (Vite 代理)
实际请求: http://localhost:3002/api/xxx (本地站点)
         http://sapi.skcpop.com/api/xxx (马来西亚站点)
         https://sapi.jpskc.com/api/xxx (日本站点)
```

### 代理配置
- 代理配置直接集成在 `vite.config.js` 中
- 自动根据站点配置选择代理目标
- 简化配置结构，提高维护性

## 添加新站点

1. 在 `config/sites.js` 中添加新站点配置
2. 在 `public/` 目录添加对应的图标文件
3. 在 `package.json` 中添加对应的构建脚本
4. 代理配置会自动根据新站点配置生效（无需额外配置）

### 图标文件要求

- **推荐格式**: `.ico` 或 `.png`
- **不推荐**: `.jpg` (不支持透明背景)
- **常用尺寸**: 16x16, 32x32, 48x48 像素
- **文件大小**: 建议小于 10KB

## 环境变量

系统会自动注入以下变量：
- `__SITE_CONFIG__`：当前站点的完整配置
- HTML模板变量：
  - `%VITE_FAVICON_PATH%`：图标路径
  - `%VITE_APP_TITLE%`：页面标题  
  - `%VITE_APP_DESCRIPTION%`：页面描述
