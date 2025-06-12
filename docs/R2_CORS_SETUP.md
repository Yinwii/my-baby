# R2 存储 CORS 配置指南 🌐

## 问题描述
图片可以直接访问，但在网页应用中无法显示，出现"图片加载失败"错误。这是因为 Cloudflare R2 存储的 CORS（跨域资源共享）配置问题。

## 解决方案

### 方法一：通过 Cloudflare 控制台配置 CORS

1. **登录 Cloudflare 控制台**
   - 访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)
   - 选择您的账户

2. **找到 R2 存储**
   - 在左侧菜单中点击 "R2 Object Storage"
   - 选择您的存储桶（例如：bucket.20250530.space）

3. **配置 CORS 设置**
   - 点击存储桶名称进入详情页
   - 找到 "Settings" 标签
   - 滚动到 "CORS policy" 部分
   - 点击 "Add CORS policy" 或 "Edit"

4. **添加 CORS 规则**
   ```json
   [
     {
       "AllowedOrigins": [
         "http://localhost:3000",
         "http://localhost:3001", 
         "https://your-domain.com"
       ],
       "AllowedMethods": [
         "GET",
         "HEAD"
       ],
       "AllowedHeaders": [
         "*"
       ],
       "ExposeHeaders": [],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

### 方法二：通过 Wrangler CLI 配置

1. **安装 Wrangler（如果还没安装）**
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```

3. **创建 CORS 配置文件**
   创建文件 `cors-config.json`：
   ```json
   [
     {
       "AllowedOrigins": [
         "http://localhost:3000",
         "https://your-domain.com"
       ],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "ExposeHeaders": [],
       "MaxAgeSeconds": 3600
     }
   ]
   ```

4. **应用 CORS 配置**
   ```bash
   wrangler r2 bucket cors put YOUR_BUCKET_NAME --file cors-config.json
   ```

### 方法三：使用自定义域名（推荐）

如果您有自定义域名，可以通过 Cloudflare 设置自定义域名，这样可以避免 CORS 问题：

1. **在 R2 控制台中**
   - 进入您的存储桶设置
   - 找到 "Custom domains" 部分
   - 点击 "Connect domain"
   - 添加您的自定义域名（例如：cdn.yourdomain.com）

2. **更新环境变量**
   在 `.env` 文件中更新：
   ```env
   R2_PUBLIC_DOMAIN="https://cdn.yourdomain.com"
   ```

## 验证 CORS 配置

配置完成后，您可以通过以下方式验证：

1. **浏览器开发者工具**
   - 打开 F12 开发者工具
   - 查看 Network 标签
   - 刷新页面，查看图片请求是否成功

2. **curl 命令测试**
   ```bash
   curl -H "Origin: http://localhost:3000" \
        -H "Access-Control-Request-Method: GET" \
        -H "Access-Control-Request-Headers: X-Requested-With" \
        -X OPTIONS \
        https://bucket.20250530.space/your-image.png
   ```

## 常见问题

### Q: 配置后仍然无法显示图片？
A: 尝试以下步骤：
1. 清除浏览器缓存
2. 等待几分钟让配置生效
3. 检查域名是否正确添加到 CORS 配置中

### Q: 在生产环境中需要注意什么？
A: 
1. 将生产域名添加到 CORS 配置中
2. 避免使用通配符 "*" 作为 AllowedOrigins
3. 考虑使用自定义域名提高性能

### Q: 能否配置为允许所有域名？
A: 可以，但不推荐。如果确实需要：
```json
{
  "AllowedOrigins": ["*"],
  "AllowedMethods": ["GET", "HEAD"],
  "AllowedHeaders": ["*"]
}
```

## 下一步

配置完 CORS 后：
1. 重启开发服务器：`npm run dev`
2. 清除浏览器缓存
3. 测试图片是否正常显示

如果问题持续存在，请检查浏览器控制台的错误信息。 