# 宝宝成长记录 Web App 👶

一个美观、现代化的宝宝成长记录应用，帮助父母记录和追踪宝宝成长的每一个珍贵时刻。

## 功能特色 ✨

### 🏠 仪表板
- 宝宝信息概览
- 最新成长数据展示
- 快速操作入口
- 最近里程碑预览
- 成长趋势图表

### 👶 宝宝信息管理
- 基本信息：姓名、性别、出生日期时间
- 出生数据：体重、身高、头围
- 健康信息：血型、过敏信息
- 备注和其他信息
- 可编辑的信息管理

### 📊 成长记录
- 体重、身高、头围数据记录
- 增长趋势分析
- 历史记录查看
- 可视化数据展示
- 添加记录表单

### 🏆 里程碑管理
- 运动发展里程碑
- 语言发展里程碑
- 社交发展里程碑
- 认知发展里程碑
- 生活自理里程碑
- 按时间线展示
- 分类统计

### 📸 照片墙
- 照片上传和管理
- 按时间分组展示
- 照片详情查看
- 标题和描述添加
- 照片统计信息

### 📝 育儿日记
- 日常记录写作
- 心情和天气记录
- 标签分类管理
- 按月份分组
- 搜索和筛选功能

## 技术栈 🔧

- **前端框架**: Next.js 15.3.3
- **UI库**: React 19
- **样式**: Tailwind CSS 4
- **语言**: TypeScript
- **数据库**: Neon PostgreSQL (无服务器)
- **ORM**: Prisma
- **开发工具**: ESLint, PostCSS

## 快速开始 🚀

### 环境要求
- Node.js 18+ 
- npm 或 yarn
- Neon 数据库账户

### 安装依赖
```bash
npm install
```

### 数据库设置

1. **创建 Neon 数据库**
   - 访问 [Neon Console](https://console.neon.tech/)
   - 创建新项目并获取连接字符串

2. **配置环境变量**
   ```bash
   # 创建 .env 文件
   cp .env.example .env
   ```
   
   编辑 `.env` 文件：
   ```env
   DATABASE_URL="postgresql://your_username:your_password@your_neon_host/your_database?sslmode=require"
   ```

3. **设置数据库**
   ```bash
   # 生成 Prisma 客户端
   npm run db:generate
   
   # 创建数据库表
   npm run db:push
   
   # （可选）插入示例数据
   npm run db:seed
   ```

### 启动开发服务器
```bash
npm run dev
```

应用将在 [http://localhost:3000](http://localhost:3000) 启动

### 构建生产版本
```bash
npm run build
npm run start
```

## 项目结构 📁

```
src/
├── app/
│   ├── api/                 # API 路由
│   │   ├── baby/           # 宝宝信息 API
│   │   ├── growth-records/ # 成长记录 API
│   │   ├── milestones/     # 里程碑 API
│   │   ├── photos/         # 照片 API
│   │   └── diary-entries/  # 日记 API
│   ├── components/          # 组件目录
│   │   ├── Navigation.tsx   # 导航组件
│   │   ├── Dashboard.tsx    # 仪表板
│   │   ├── BabyInfo.tsx     # 宝宝信息
│   │   ├── GrowthRecord.tsx # 成长记录
│   │   ├── Milestones.tsx   # 里程碑
│   │   ├── PhotoGallery.tsx # 照片墙
│   │   └── Diary.tsx        # 育儿日记
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 布局组件
│   └── page.tsx             # 主页面
├── hooks/                   # 自定义 Hooks
│   └── useBaby.ts          # 宝宝数据管理
├── lib/                     # 工具库
│   └── prisma.ts           # Prisma 客户端配置
└── generated/              # 生成的 Prisma 客户端
```

## 数据库管理 🗃️

### 常用命令
```bash
# 查看数据库内容
npm run db:studio

# 重置数据库并重新填充数据
npm run db:reset

# 生成 Prisma 客户端
npm run db:generate

# 推送 schema 变更
npm run db:push

# 运行种子数据
npm run db:seed
```

### 数据模型

#### 宝宝 (Baby)
- 基本信息、出生数据、健康信息

#### 成长记录 (GrowthRecord)  
- 体重、身高、头围的时间序列数据

#### 里程碑 (Milestone)
- 发展里程碑，按类别分类

#### 照片 (Photo)
- 照片元数据和描述

#### 日记 (DiaryEntry)
- 日常记录，包含心情、天气、标签

详细的数据库设置请参考：[Neon 数据库集成指南](./docs/NEON_SETUP.md)

## 设计特色 🎨

- **现代化UI设计**: 使用渐变色和圆角设计，给人温馨的感觉
- **响应式布局**: 完美适配移动设备和桌面设备
- **直观的导航**: 使用emoji图标和清晰的标签
- **数据可视化**: 展示成长趋势和统计信息
- **交互动画**: 平滑的过渡效果和悬停效果
- **数据持久化**: 使用 Neon 无服务器数据库

## API 文档 📋

### 宝宝信息 (`/api/baby`)
- `GET` - 获取宝宝信息
- `POST` - 创建新宝宝
- `PUT` - 更新宝宝信息

### 成长记录 (`/api/growth-records`)
- `GET ?babyId={id}` - 获取成长记录
- `POST` - 添加新记录

### 里程碑 (`/api/milestones`)
- `GET ?babyId={id}` - 获取里程碑列表
- `POST` - 添加新里程碑

### 照片 (`/api/photos`)
- `GET ?babyId={id}` - 获取照片列表
- `POST` - 添加新照片

### 日记 (`/api/diary-entries`)
- `GET ?babyId={id}` - 获取日记列表
- `POST` - 添加新日记

## 部署指南 🚀

### Vercel 部署
1. 推送代码到 GitHub
2. 连接 Vercel 账户
3. 配置环境变量
4. 自动部署

### 环境变量设置
```env
DATABASE_URL=your_neon_connection_string
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_production_url
```

## 贡献指南 🤝

### 开发流程
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

### 代码规范
- 使用 TypeScript
- 遵循 ESLint 规则
- 编写有意义的提交消息
- 添加必要的注释

## 故障排除 🚨

### 常见问题

#### 数据库连接失败
- 检查 `.env` 文件配置
- 验证 Neon 数据库状态
- 确认网络连接

#### Prisma 客户端错误
```bash
npm run db:generate
```

#### 表不存在错误
```bash
npm run db:push
```

更多故障排除信息请参考：[Neon 数据库集成指南](./docs/NEON_SETUP.md#故障排除)

## 未来规划 💡

- [ ] 用户认证和多用户支持
- [ ] 照片云存储集成
- [ ] 成长曲线图表
- [ ] 数据导出功能
- [ ] 移动应用支持
- [ ] 提醒和通知
- [ ] 社交分享功能
- [ ] 多语言支持

## 开源协议 📄

MIT License

## 致谢 🙏

感谢所有贡献者和开源社区的支持！

---

用爱和代码制作 ❤️ 为了记录宝宝成长的每一个珍贵时刻

如有问题或建议，请创建 [Issue](https://github.com/your-repo/issues) 或查看 [Neon 数据库集成指南](./docs/NEON_SETUP.md)。
