# 宝宝成长记录 Web 应用

一个基于 Next.js 15 + React 19 + TypeScript + Tailwind CSS + Prisma + Neon 数据库构建的现代化宝宝成长记录应用。

## 🌟 功能特色

### 📊 仪表盘
- **概览统计**：宝宝年龄、总记录数、最新里程碑等
- **快速操作**：一键添加记录、查看趋势
- **最近活动**：显示最新的成长记录和里程碑

### 👶 宝宝信息管理
- **基本信息**：姓名、出生日期时间、性别
- **出生数据**：出生体重、身长、头围
- **健康记录**：血型、特殊需求、医疗信息
- **完整编辑**：支持信息修改和更新

### 📈 成长记录 (支持完整 CRUD)
- **数据记录**：体重、身高、头围测量
- **趋势分析**：自动生成成长曲线图表
- **历史记录**：按时间排序查看所有记录
- **增删改查**：
  - ✅ 添加新的测量记录
  - ✅ 编辑现有记录数据
  - ✅ 删除错误记录（含确认提示）
  - ✅ 查看详细记录历史

### 🎯 里程碑管理 (支持完整 CRUD)
- **分类记录**：
  - 🏃 运动发展：翻身、坐立、爬行、走路等
  - 🗣️ 语言发展：第一次发声、说话等
  - 👥 社交发展：微笑、认人、互动等
  - 🧠 认知发展：注视、抓握、认识物体等
  - 🍽️ 生活自理：吃饭、穿衣、如厕等
- **增删改查**：
  - ✅ 记录新里程碑
  - ✅ 编辑里程碑信息
  - ✅ 删除里程碑记录
  - ✅ 按分类和时间查看

### 📝 育儿日记 (支持完整 CRUD)
- **多元记录**：
  - 📅 日期选择
  - 😊 心情状态：开心、兴奋、骄傲、疲惫、担心、平静
  - 🌤️ 天气记录：晴天、多云、雨天、雪天
  - 🏷️ 标签系统：自定义标签分类
- **内容管理**：
  - 📖 标题和详细内容
  - 🔍 按月份分组显示
  - 📊 统计分析（总日记数、标签数等）
- **增删改查**：
  - ✅ 写新日记
  - ✅ 编辑日记内容
  - ✅ 删除日记条目
  - ✅ 时间线浏览

### 📸 照片画廊 (规划中)
- 照片上传和管理
- 按时间和事件分类
- 照片标注和描述

## 🔧 技术栈

- **前端框架**：Next.js 15 + React 19
- **类型系统**：TypeScript
- **样式框架**：Tailwind CSS
- **数据库 ORM**：Prisma
- **云数据库**：Neon (PostgreSQL)
- **状态管理**：React Hooks + Custom Hooks
- **部署平台**：Vercel (推荐)

## 🚀 快速开始

### 前置要求

- Node.js 18.0.0 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. **克隆项目**
```bash
git clone <your-repo-url>
cd my-baby
```

2. **安装依赖**
```bash
npm install
# 或
yarn install
```

3. **配置环境变量**
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，添加数据库连接信息：
```env
DATABASE_URL="your-neon-database-url"
```

4. **初始化数据库**
```bash
# 生成 Prisma 客户端
npm run db:generate

# 推送数据库架构
npm run db:push

# (可选) 填充示例数据
npm run db:seed
```

5. **启动开发服务器**
```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📖 API 文档

### 宝宝信息 API
```
GET    /api/babies        # 获取宝宝列表
POST   /api/babies        # 创建新宝宝
PUT    /api/babies/[id]   # 更新宝宝信息
DELETE /api/babies/[id]   # 删除宝宝信息
```

### 成长记录 API
```
GET    /api/growth-records              # 获取成长记录列表
POST   /api/growth-records              # 创建新记录
GET    /api/growth-records/[id]         # 获取单个记录
PUT    /api/growth-records/[id]         # 更新记录
DELETE /api/growth-records/[id]         # 删除记录
```

### 里程碑 API
```
GET    /api/milestones                  # 获取里程碑列表
POST   /api/milestones                  # 创建新里程碑
GET    /api/milestones/[id]             # 获取单个里程碑
PUT    /api/milestones/[id]             # 更新里程碑
DELETE /api/milestones/[id]             # 删除里程碑
```

### 日记条目 API
```
GET    /api/diary-entries               # 获取日记列表
POST   /api/diary-entries               # 创建新日记
GET    /api/diary-entries/[id]          # 获取单个日记
PUT    /api/diary-entries/[id]          # 更新日记
DELETE /api/diary-entries/[id]          # 删除日记
```

### 照片 API
```
GET    /api/photos                      # 获取照片列表
POST   /api/photos                      # 上传新照片
GET    /api/photos/[id]                 # 获取单个照片
PUT    /api/photos/[id]                 # 更新照片信息
DELETE /api/photos/[id]                 # 删除照片
```

## 🗂️ 项目结构

```
my-baby/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── api/               # API 路由
│   │   │   ├── babies/        # 宝宝信息 API
│   │   │   ├── growth-records/# 成长记录 API
│   │   │   ├── milestones/    # 里程碑 API
│   │   │   ├── diary-entries/ # 日记 API
│   │   │   └── photos/        # 照片 API
│   │   ├── components/        # React 组件
│   │   │   ├── Dashboard.tsx
│   │   │   ├── BabyInfo.tsx
│   │   │   ├── GrowthRecord.tsx
│   │   │   ├── Milestones.tsx
│   │   │   ├── Diary.tsx
│   │   │   └── PhotoGallery.tsx
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 首页
│   ├── hooks/                 # 自定义 Hooks
│   │   ├── useBaby.ts
│   │   ├── useGrowthRecords.ts
│   │   ├── useMilestones.ts
│   │   └── useDiaryEntries.ts
│   └── lib/
│       └── prisma.ts          # Prisma 客户端配置
├── prisma/
│   ├── schema.prisma          # 数据库架构
│   └── seed.ts                # 数据库种子文件
├── package.json               # 项目配置
├── tailwind.config.js         # Tailwind 配置
├── tsconfig.json              # TypeScript 配置
└── README.md                  # 项目文档
```

## 🎨 界面特色

- **响应式设计**：完美适配手机、平板、桌面端
- **现代化 UI**：简洁美观的卡片式布局
- **渐变色彩**：温馨的粉色和蓝色主题
- **动画效果**：流畅的过渡和加载动画
- **图标系统**：丰富的 Emoji 图标表达
- **夜间模式**：护眼的深色主题 (规划中)

## 📱 使用指南

### 初次使用
1. 打开应用后，首先添加宝宝的基本信息
2. 在"宝宝信息"页面填写姓名、出生日期等信息
3. 开始记录第一条成长记录或里程碑

### 日常使用
1. **记录成长数据**：定期测量并记录体重、身高等数据
2. **标记里程碑**：当宝宝达成新的发展里程碑时及时记录
3. **写育儿日记**：记录日常生活中的点点滴滴
4. **查看趋势**：通过图表了解宝宝的成长趋势

### 数据管理
- **编辑记录**：点击记录旁的编辑按钮修改信息
- **删除记录**：点击删除按钮，确认后删除不需要的记录
- **搜索筛选**：使用标签和日期快速找到特定记录

## 🛠️ 可用脚本

```bash
# 开发
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run start        # 启动生产服务器
npm run lint         # 代码检查

# 数据库
npm run db:generate  # 生成 Prisma 客户端
npm run db:push      # 推送数据库架构
npm run db:studio    # 打开 Prisma Studio
npm run db:seed      # 填充示例数据
npm run db:reset     # 重置数据库
```

## 🔒 数据安全

- **本地存储**：数据存储在用户指定的 Neon 数据库中
- **隐私保护**：不会收集或分享用户的个人信息
- **数据备份**：建议定期备份数据库数据
- **访问控制**：建议在生产环境中添加身份验证

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📝 更新日志

### v1.1.1 (最新)
- 🐛 修复首页跳转问题：
  - 修复"记录第一个里程碑"按钮跳转错误
  - 修复"添加第一条成长记录"按钮跳转错误  
  - 修复快速操作区域所有按钮的跳转问题（记录成长、新里程碑、上传照片、写日记）
  - 修复"查看详细趋势"和"添加宝宝信息"按钮跳转问题
  - 改进tab切换机制，确保在应用内正确切换而非页面刷新

### v1.1.0
- ✅ 添加完整的 CRUD 操作支持
- ✅ 改进用户界面和用户体验
- ✅ 添加数据验证和错误处理
- ✅ 优化数据库查询性能

### v1.0.0
- ✅ 基础功能实现
- ✅ 数据库集成
- ✅ 响应式设计

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户。让我们一起记录宝宝成长路上的每一个珍贵时刻！

---

**联系方式**：如有问题或建议，请创建 Issue 或联系项目维护者。
