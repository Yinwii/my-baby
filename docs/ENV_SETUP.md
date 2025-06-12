# 环境变量配置指南 🔧

## 问题诊断

如果您看到类似这样的404错误：
```
GET /bucket.20250530.space/image.png 404
```

这说明 `R2_PUBLIC_DOMAIN` 环境变量配置不正确。

## 正确配置

### 1. 创建或编辑 `.env` 文件

在项目根目录创建 `.env` 文件：

```env
# R2 Storage Configuration
R2_ACCESS_KEY_ID="your_r2_access_key_id"
R2_SECRET_ACCESS_KEY="your_r2_secret_access_key"
R2_BUCKET_NAME="your_bucket_name"
R2_ACCOUNT_ID="your_cloudflare_account_id"

# 重要：确保包含 https:// 协议！
R2_PUBLIC_DOMAIN="https://bucket.20250530.space"

# Database Configuration
DATABASE_URL="your_database_connection_string"

# Next.js Configuration
NEXTAUTH_SECRET="your_random_secret_string"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. 常见错误

❌ **错误配置（会导致404）：**
```env
R2_PUBLIC_DOMAIN="bucket.20250530.space"
R2_PUBLIC_DOMAIN="bucket.20250530.space/"
R2_PUBLIC_DOMAIN="//bucket.20250530.space"
```

✅ **正确配置：**
```env
R2_PUBLIC_DOMAIN="https://bucket.20250530.space"
```

### 3. 验证配置

配置完成后：

1. **重启开发服务器**：
   ```bash
   npm run dev
   ```

2. **检查服务器日志**，应该看到正确的URL格式：
   ```
   Upload result: { url: "https://bucket.20250530.space/filename.png" }
   ```

3. **测试图片上传**，新上传的图片应该正常显示

## R2 公共域名获取

### 方法一：R2.dev 域名
1. 在 Cloudflare 控制台进入您的 R2 存储桶
2. 找到 "Public access" 部分
3. 如果启用了公共访问，会显示类似：`https://pub-xxxxxx.r2.dev`

### 方法二：自定义域名
1. 在 R2 存储桶设置中添加自定义域名
2. 使用您自己的域名，如：`https://cdn.yourdomain.com`

## 修复现有数据

如果您已经有存储在数据库中的错误URL，需要修复它们：

### 查看现有数据
```sql
SELECT url FROM media_items LIMIT 5;
```

### 批量修复（如果需要）
```sql
UPDATE media_items 
SET url = 'https://' || url 
WHERE url NOT LIKE 'https://%' AND url NOT LIKE 'http://%';
```

⚠️ **注意**：在执行SQL更新前，请先备份数据库！

## 排查步骤

1. **检查环境变量是否加载**：
   在 `src/app/api/photos/upload/route.ts` 中添加临时日志：
   ```javascript
   console.log('R2_PUBLIC_DOMAIN:', process.env.R2_PUBLIC_DOMAIN);
   ```

2. **检查生成的URL**：
   查看上传响应中的URL格式是否正确

3. **测试直接访问**：
   复制生成的URL在浏览器中直接访问

## 完成配置后

重启服务器并测试：
```bash
npm run dev
```

上传新图片，检查是否正常显示。 