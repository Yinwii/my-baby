# 宝宝成长记录 Web 应用

一个基于 Next.js 15 + React 19 + TypeScript + Tailwind CSS + Prisma构建的现代化宝宝成长记录应用。

## 🌟 功能特色

### 📊 数据管理
- **宝宝信息管理**：记录宝宝的基本信息（姓名、出生日期、性别、血型等）
- **成长记录追踪**：记录身高、体重、头围等关键成长指标
- **里程碑记录**：记录宝宝的重要成长里程碑和特殊时刻
- **媒体相册**：支持照片和视频上传，包括HEIC格式自动转换

### 📈 可视化图表
- **成长曲线图**：使用 Recharts 展示宝宝的成长趋势
- **数据统计**：显示记录天数、最新记录等统计信息
- **交互式图表**：支持悬停查看详细数据

### 🚀 技术特性
- **智能预加载**：优化用户体验，提前加载可能访问的页面
- **响应式设计**：完美适配移动端和桌面端
- **实时数据更新**：使用 React Hooks 进行状态管理
- **云端存储**：集成 Cloudflare R2 对象存储服务
- **HEIC 支持**：自动转换苹果设备的 HEIC 格式照片

### 💾 数据持久化
- **PostgreSQL 数据库**：使用 Neon 云数据库服务
- **Prisma ORM**：类型安全的数据库操作
- **数据备份**：支持数据导入导出

## 🔧 技术栈
- **前端框架**：Next.js 15 + React 19
- **类型系统**：TypeScript
- **样式框架**：Tailwind CSS
- **数据库 ORM**：Prisma
- **云数据库**：Neon (PostgreSQL)
- **状态管理**：React Hooks + Custom Hooks
- **部署平台**：Vercel (推荐)/ local
- **对象存储**: Cloudflare R2
- **图表库**：Recharts
- **文件处理**：Sharp (图片处理)、FFmpeg (视频处理)

## 📋 环境要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器
- PostgreSQL 数据库（推荐使用 Neon）
- Cloudflare R2 账号（用于文件存储）

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd my-baby
```

### 2. 安装依赖
```bash
npm install
```

### 3. 环境配置
复制环境变量模板并配置：
```bash
cp env.example .env
```

编辑 `.env` 文件，配置以下环境变量：
```env
# 数据库连接
DATABASE_URL="your_neon_database_url"

# Cloudflare R2 配置
R2_TOKEN="your_r2_token"
R2_ACCESS_KEY_ID="your_access_key_id"
R2_SECRET_ACCESS_KEY="your_secret_access_key"
R2_ENDPOINT="your_r2_endpoint"
R2_PUBLIC_DOMAIN="your_public_domain"
R2_ACCOUNT_ID="your_account_id"
R2_BUCKET_NAME="your_bucket_name"
```

### 4. 数据库设置
```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库结构
npm run db:push

# （可选）填充初始数据
npm run db:seed
```

### 5. 启动开发服务器
```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📝 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查
- `npm run db:generate` - 生成 Prisma 客户端
- `npm run db:push` - 推送数据库结构变更
- `npm run db:studio` - 打开 Prisma Studio 数据库管理界面
- `npm run db:seed` - 填充初始数据
- `npm run db:reset` - 重置数据库并填充初始数据

## 🗂️ 项目结构

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── baby/          # 宝宝信息 API
│   │   ├── growth-records/ # 成长记录 API
│   │   ├── milestones/    # 里程碑 API
│   │   └── photos/        # 照片上传 API
│   ├── components/        # 页面级组件
│   └── globals.css        # 全局样式
├── components/            # 可复用组件
│   ├── ui/               # UI 基础组件
│   └── providers/        # Context 提供者
├── hooks/                # 自定义 React Hooks
└── lib/                  # 工具函数和配置
prisma/
├── schema.prisma         # 数据库模式
└── seed.ts              # 数据库种子文件
```

## 🔧 配置说明

### 数据库配置
项目使用 PostgreSQL 数据库，推荐使用 [Neon](https://neon.tech) 云数据库服务。数据模型包括：
- `Baby` - 宝宝基本信息
- `GrowthRecord` - 成长记录
- `Milestone` - 里程碑记录
- `MediaItem` - 媒体文件记录

### 存储配置 (前提是有一个公共域名，才能实现图像/视频公开访问)
使用 Cloudflare R2 进行文件存储，支持：
- 图片自动压缩和格式转换
- HEIC 格式自动转换为 JPEG
- 视频缩略图生成
- 预签名 URL 安全上传

### 📦 Cloudflare R2 配置指南

#### 1. 创建 Cloudflare 账号
访问 [Cloudflare Dashboard](https://dash.cloudflare.com/) 并创建账号

#### 2. 创建 R2 存储桶
1. 在 Cloudflare Dashboard 中，选择 **R2 Object Storage**
2. 点击 **Create bucket** 创建新的存储桶
3. 输入存储桶名称（例如：`my-baby-photos`）
4. 选择合适的位置（推荐选择离用户最近的区域）
5. 点击 **Create bucket**

#### 3. 生成 API 令牌
1. 在 Cloudflare Dashboard 中，点击右上角的用户头像
2. 选择 **My Profile** > **API Tokens**
3. 点击 **Create Token**
4. 选择 **Custom token** 模板
5. 配置权限：
   - **Account** - `Cloudflare R2:Edit`
   - **Zone Resources** - 选择你的账号
6. 点击 **Continue to summary** 然后 **Create Token**
7. **重要**：复制并安全保存生成的令牌

#### 4. 获取 R2 API 凭据
1. 回到 R2 Overview 页面
2. 在右侧边栏点击 **Manage R2 API tokens**
3. 点击 **Create API token**
4. 配置权限：
   - **Permissions**: `Admin Read & Write`
   - **Specify bucket**: 选择你创建的存储桶
5. 点击 **Create API token**
6. 复制 **Access Key ID** 和 **Secret Access Key**

#### 5. 配置自定义域名（可选但推荐）
1. 在存储桶详情页面，点击 **Settings** 标签
2. 在 **Public access** 部分，点击 **Connect Domain**
3. 输入你的自定义域名（例如：`cdn.yourdomain.com`）
4. 按照说明在你的 DNS 提供商处添加 CNAME 记录
5. 等待 DNS 传播完成（通常需要几分钟到几小时）

#### 6. 环境变量配置示例
```env
# 从 R2 API tokens 页面获取
R2_ACCESS_KEY_ID="your_access_key_id_here"
R2_SECRET_ACCESS_KEY="your_secret_access_key_here"

# 从你的账号信息获取
R2_ACCOUNT_ID="your_cloudflare_account_id"

# 你创建的存储桶名称
R2_BUCKET_NAME="my-baby-photos"

# R2 端点格式
R2_ENDPOINT="https://your_account_id.r2.cloudflarestorage.com"

# 你配置的自定义域名（如果有）
R2_PUBLIC_DOMAIN="https://cdn.yourdomain.com"

# API 令牌（从步骤3获取）
R2_TOKEN="your_api_token_here"
```


## 🚀 部署

### Vercel 部署（推荐）
1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署完成

### 本地部署
```bash
npm run build
npm run start
```

## 📄 License

This project is licensed under the MIT License.