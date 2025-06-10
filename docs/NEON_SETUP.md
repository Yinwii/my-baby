# Neon 数据库集成指南 🗃️

本文档将指导您如何将宝宝成长记录应用与 Neon 无服务器 PostgreSQL 数据库集成。

## 🎯 概述

我们已经为应用集成了 Neon 数据库，包括：
- Prisma ORM 配置
- 完整的数据库 Schema
- API 路由
- 前端数据管理
- 种子数据脚本

## 🚀 快速开始

### 1. 创建 Neon 数据库

1. 访问 [Neon Console](https://console.neon.tech/)
2. 登录或注册账户
3. 点击 "Create Project"
4. 选择区域（推荐选择离你最近的区域）
5. 输入项目名称：`my-baby-app`
6. 点击 "Create Project"

### 2. 获取数据库连接字符串

1. 在 Neon 控制台中，找到你的项目
2. 点击 "Dashboard" → "Connection Details"
3. 复制 PostgreSQL 连接字符串
4. 格式类似：`postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require`

### 3. 配置环境变量

1. 在项目根目录创建 `.env` 文件：
```bash
cp .env.example .env
```

2. 编辑 `.env` 文件，填入你的数据库连接字符串：
```env
# Neon Database URL
DATABASE_URL="postgresql://your_username:your_password@your_neon_host/your_database?sslmode=require"

# Next.js Environment
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. 运行数据库迁移

生成并应用数据库 schema：

```bash
# 生成 Prisma 客户端
npx prisma generate

# 创建数据库表
npx prisma db push

# （可选）运行种子数据
npx tsx prisma/seed.ts
```

### 5. 启动应用

```bash
npm run dev
```

现在访问 [http://localhost:3000](http://localhost:3000) 应该可以看到连接到 Neon 数据库的应用！

## 📊 数据库 Schema

### 核心表结构

#### babies (宝宝信息)
- `id` - 主键
- `name` - 宝宝姓名
- `birthDate` - 出生日期
- `birthTime` - 出生时间
- `gender` - 性别
- `birthWeight` - 出生体重
- `birthHeight` - 出生身高
- `birthHeadCircumference` - 出生头围
- `bloodType` - 血型
- `allergies` - 过敏信息
- `notes` - 备注

#### growth_records (成长记录)
- `id` - 主键
- `babyId` - 宝宝 ID (外键)
- `date` - 记录日期
- `weight` - 体重
- `height` - 身高
- `headCircumference` - 头围
- `notes` - 备注

#### milestones (里程碑)
- `id` - 主键
- `babyId` - 宝宝 ID (外键)
- `date` - 里程碑日期
- `title` - 标题
- `description` - 描述
- `category` - 类别 (motor, language, social, cognitive, self_care)

#### photos (照片)
- `id` - 主键
- `babyId` - 宝宝 ID (外键)
- `date` - 照片日期
- `title` - 标题
- `description` - 描述
- `url` - 照片 URL

#### diary_entries (日记)
- `id` - 主键
- `babyId` - 宝宝 ID (外键)
- `date` - 日记日期
- `title` - 标题
- `content` - 内容
- `mood` - 心情
- `weather` - 天气
- `tags` - 标签数组

## 🔧 API 端点

### 宝宝信息
- `GET /api/baby` - 获取宝宝信息
- `POST /api/baby` - 创建宝宝
- `PUT /api/baby` - 更新宝宝信息

### 成长记录
- `GET /api/growth-records?babyId={id}` - 获取成长记录
- `POST /api/growth-records` - 添加成长记录

### 里程碑
- `GET /api/milestones?babyId={id}` - 获取里程碑
- `POST /api/milestones` - 添加里程碑

### 照片
- `GET /api/photos?babyId={id}` - 获取照片
- `POST /api/photos` - 添加照片

### 日记
- `GET /api/diary-entries?babyId={id}` - 获取日记
- `POST /api/diary-entries` - 添加日记

## 🛠️ 开发命令

```bash
# 查看数据库
npx prisma studio

# 重置数据库
npx prisma db push --force-reset

# 生成 Prisma 客户端
npx prisma generate

# 运行种子数据
npx tsx prisma/seed.ts

# 查看数据库 schema
npx prisma db pull
```

## 🚨 故障排除

### 常见问题

#### 1. 连接错误
```
Error: Failed to fetch baby data
```
**解决方案：**
- 检查 `.env` 文件中的 `DATABASE_URL` 是否正确
- 确保 Neon 数据库正在运行
- 检查网络连接

#### 2. Prisma 客户端错误
```
Module not found: Can't resolve '../generated/prisma'
```
**解决方案：**
```bash
npx prisma generate
```

#### 3. 数据库表不存在
```
Table 'babies' doesn't exist
```
**解决方案：**
```bash
npx prisma db push
```

### 检查清单

- [ ] Neon 项目已创建
- [ ] 数据库连接字符串已配置
- [ ] `.env` 文件已创建并填写
- [ ] Prisma 客户端已生成
- [ ] 数据库 schema 已推送
- [ ] 种子数据已运行（可选）

## 📈 性能优化

### Neon 特性
- **无服务器**：自动休眠和唤醒
- **分支**：每个功能分支可以有独立的数据库
- **自动备份**：数据安全保障
- **连接池**：高性能连接管理

### 生产环境建议
1. 使用连接池
2. 启用查询缓存
3. 监控慢查询
4. 定期备份数据

## 🔗 相关链接

- [Neon 官方文档](https://neon.tech/docs)
- [Prisma 文档](https://www.prisma.io/docs)
- [Next.js API 路由](https://nextjs.org/docs/api-routes/introduction)

---

🎉 现在你的宝宝成长记录应用已经完全集成了 Neon 数据库！所有数据将安全地存储在云端。 