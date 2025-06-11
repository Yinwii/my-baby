# API 使用指南

本文档详细说明了宝宝成长记录应用的所有 API 接口，包括请求参数、响应格式和使用示例。

## 🌐 基础信息

- **基础 URL**: `http://localhost:3000/api` (开发环境)
- **内容类型**: `application/json`
- **字符编码**: `UTF-8`

## 📝 通用响应格式

### 成功响应
```json
{
  "id": "record_id",
  "data": {},
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 错误响应
```json
{
  "error": "错误描述信息",
  "statusCode": 400
}
```

---

## 👶 宝宝信息 API

### 获取宝宝列表
**GET** `/api/babies`

#### 响应示例
```json
[
  {
    "id": "baby_123",
    "name": "小明",
    "gender": "male",
    "birthDate": "2024-01-01T00:00:00.000Z",
    "birthTime": "08:30:00",
    "birthWeight": 3200,
    "birthLength": 50,
    "birthHeadCircumference": 34,
    "bloodType": "A+",
    "allergies": "无",
    "medicalNotes": "健康",
    "notes": "活泼可爱",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 创建新宝宝
**POST** `/api/babies`

#### 请求体
```json
{
  "name": "小明",
  "gender": "male",
  "birthDate": "2024-01-01",
  "birthTime": "08:30",
  "birthWeight": 3200,
  "birthLength": 50,
  "birthHeadCircumference": 34,
  "bloodType": "A+",
  "allergies": "无",
  "medicalNotes": "健康",
  "notes": "活泼可爱"
}
```

#### 字段说明
- `name` (string, 必填): 宝宝姓名
- `gender` (string, 必填): 性别 ("male" | "female")
- `birthDate` (string, 必填): 出生日期 (YYYY-MM-DD)
- `birthTime` (string, 可选): 出生时间 (HH:MM)
- `birthWeight` (number, 可选): 出生体重 (克)
- `birthLength` (number, 可选): 出生身长 (厘米)
- `birthHeadCircumference` (number, 可选): 出生头围 (厘米)
- `bloodType` (string, 可选): 血型
- `allergies` (string, 可选): 过敏信息
- `medicalNotes` (string, 可选): 医疗备注
- `notes` (string, 可选): 其他备注

### 更新宝宝信息
**PUT** `/api/babies/[id]`

#### 请求体
```json
{
  "name": "小明更新",
  "notes": "更新的备注信息"
}
```

### 删除宝宝信息
**DELETE** `/api/babies/[id]`

---

## 📈 成长记录 API

### 获取成长记录列表
**GET** `/api/growth-records?babyId={babyId}`

#### 查询参数
- `babyId` (string, 必填): 宝宝 ID

#### 响应示例
```json
[
  {
    "id": "record_123",
    "babyId": "baby_123",
    "date": "2024-01-15T00:00:00.000Z",
    "weight": 4500,
    "height": 55,
    "headCircumference": 36,
    "notes": "宝宝状态良好",
    "baby": {
      "name": "小明"
    },
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-15T00:00:00.000Z"
  }
]
```

### 创建成长记录
**POST** `/api/growth-records`

#### 请求体
```json
{
  "babyId": "baby_123",
  "date": "2024-01-15",
  "weight": 4500,
  "height": 55,
  "headCircumference": 36,
  "notes": "宝宝状态良好"
}
```

#### 字段说明
- `babyId` (string, 必填): 宝宝 ID
- `date` (string, 必填): 测量日期 (YYYY-MM-DD)
- `weight` (number, 可选): 体重 (克)
- `height` (number, 可选): 身高 (厘米)
- `headCircumference` (number, 可选): 头围 (厘米)
- `notes` (string, 可选): 备注

### 获取单个成长记录
**GET** `/api/growth-records/[id]`

### 更新成长记录
**PUT** `/api/growth-records/[id]`

#### 请求体
```json
{
  "weight": 4600,
  "notes": "更新的备注"
}
```

### 删除成长记录
**DELETE** `/api/growth-records/[id]`

---

## 🎯 里程碑 API

### 获取里程碑列表
**GET** `/api/milestones?babyId={babyId}&category={category}`

#### 查询参数
- `babyId` (string, 必填): 宝宝 ID
- `category` (string, 可选): 里程碑分类

#### 响应示例
```json
[
  {
    "id": "milestone_123",
    "babyId": "baby_123",
    "date": "2024-02-01T00:00:00.000Z",
    "title": "第一次翻身",
    "description": "宝宝成功从仰卧翻到俯卧",
    "category": "motor",
    "baby": {
      "name": "小明"
    },
    "createdAt": "2024-02-01T00:00:00.000Z",
    "updatedAt": "2024-02-01T00:00:00.000Z"
  }
]
```

### 创建里程碑
**POST** `/api/milestones`

#### 请求体
```json
{
  "babyId": "baby_123",
  "date": "2024-02-01",
  "title": "第一次翻身",
  "description": "宝宝成功从仰卧翻到俯卧",
  "category": "motor"
}
```

#### 字段说明
- `babyId` (string, 必填): 宝宝 ID
- `date` (string, 必填): 达成日期 (YYYY-MM-DD)
- `title` (string, 必填): 里程碑标题
- `description` (string, 必填): 详细描述
- `category` (string, 必填): 分类 ("motor" | "language" | "social" | "cognitive" | "self_care")

#### 分类说明
- `motor`: 运动发展
- `language`: 语言发展
- `social`: 社交发展
- `cognitive`: 认知发展
- `self_care`: 生活自理

### 获取单个里程碑
**GET** `/api/milestones/[id]`

### 更新里程碑
**PUT** `/api/milestones/[id]`

### 删除里程碑
**DELETE** `/api/milestones/[id]`

---

## 📝 日记条目 API

### 获取日记列表
**GET** `/api/diary-entries?babyId={babyId}&limit={limit}&offset={offset}`

#### 查询参数
- `babyId` (string, 必填): 宝宝 ID
- `limit` (number, 可选): 每页数量，默认 20
- `offset` (number, 可选): 偏移量，默认 0

#### 响应示例
```json
[
  {
    "id": "diary_123",
    "babyId": "baby_123",
    "date": "2024-01-20T00:00:00.000Z",
    "title": "今天的第一次笑容",
    "content": "宝宝今天第一次对我笑了，那一刻我的心都要融化了...",
    "mood": "happy",
    "weather": "sunny",
    "tags": ["第一次", "笑容", "开心"],
    "baby": {
      "name": "小明"
    },
    "createdAt": "2024-01-20T00:00:00.000Z",
    "updatedAt": "2024-01-20T00:00:00.000Z"
  }
]
```

### 创建日记条目
**POST** `/api/diary-entries`

#### 请求体
```json
{
  "babyId": "baby_123",
  "date": "2024-01-20",
  "title": "今天的第一次笑容",
  "content": "宝宝今天第一次对我笑了，那一刻我的心都要融化了...",
  "mood": "happy",
  "weather": "sunny",
  "tags": ["第一次", "笑容", "开心"]
}
```

#### 字段说明
- `babyId` (string, 必填): 宝宝 ID
- `date` (string, 必填): 日记日期 (YYYY-MM-DD)
- `title` (string, 必填): 日记标题
- `content` (string, 必填): 日记内容
- `mood` (string, 必填): 心情状态
- `weather` (string, 可选): 天气状况
- `tags` (array, 可选): 标签数组

#### 心情状态选项
- `happy`: 开心
- `excited`: 兴奋
- `proud`: 骄傲
- `tired`: 疲惫
- `worried`: 担心
- `peaceful`: 平静

#### 天气状况选项
- `sunny`: 晴天
- `cloudy`: 多云
- `rainy`: 雨天
- `snowy`: 雪天

### 获取单个日记条目
**GET** `/api/diary-entries/[id]`

### 更新日记条目
**PUT** `/api/diary-entries/[id]`

### 删除日记条目
**DELETE** `/api/diary-entries/[id]`

---

## 📸 照片 API

### 获取照片列表
**GET** `/api/photos?babyId={babyId}`

#### 响应示例
```json
[
  {
    "id": "photo_123",
    "babyId": "baby_123",
    "url": "https://example.com/photo.jpg",
    "title": "宝宝的第一次笑容",
    "description": "记录宝宝第一次笑容的珍贵时刻",
    "date": "2024-01-20T00:00:00.000Z",
    "baby": {
      "name": "小明"
    },
    "createdAt": "2024-01-20T00:00:00.000Z",
    "updatedAt": "2024-01-20T00:00:00.000Z"
  }
]
```

### 创建照片记录
**POST** `/api/photos`

#### 请求体
```json
{
  "babyId": "baby_123",
  "url": "https://example.com/photo.jpg",
  "title": "宝宝的第一次笑容",
  "description": "记录宝宝第一次笑容的珍贵时刻",
  "date": "2024-01-20"
}
```

### 获取单个照片
**GET** `/api/photos/[id]`

### 更新照片信息
**PUT** `/api/photos/[id]`

### 删除照片
**DELETE** `/api/photos/[id]`

---

## 🔧 错误处理

### 常见错误码

#### 400 Bad Request
```json
{
  "error": "请求参数无效",
  "details": "babyId 参数是必需的"
}
```

#### 404 Not Found
```json
{
  "error": "资源未找到",
  "details": "指定的宝宝不存在"
}
```

#### 500 Internal Server Error
```json
{
  "error": "服务器内部错误",
  "details": "数据库连接失败"
}
```

### 错误处理最佳实践

1. **检查响应状态码**：始终检查 HTTP 状态码
2. **解析错误信息**：从响应体中获取详细错误信息
3. **用户友好提示**：将技术错误转换为用户可理解的提示
4. **重试机制**：对于网络错误，实现合理的重试逻辑

---

## 📡 请求示例

### JavaScript/Fetch 示例

```javascript
// 获取宝宝信息
async function getBaby(babyId) {
  try {
    const response = await fetch(`/api/babies/${babyId}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const baby = await response.json()
    return baby
  } catch (error) {
    console.error('获取宝宝信息失败:', error)
    throw error
  }
}

// 创建成长记录
async function createGrowthRecord(data) {
  try {
    const response = await fetch('/api/growth-records', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '创建记录失败')
    }
    
    return await response.json()
  } catch (error) {
    console.error('创建成长记录失败:', error)
    throw error
  }
}

// 更新里程碑
async function updateMilestone(id, updates) {
  try {
    const response = await fetch(`/api/milestones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '更新里程碑失败')
    }
    
    return await response.json()
  } catch (error) {
    console.error('更新里程碑失败:', error)
    throw error
  }
}

// 删除日记条目
async function deleteDiaryEntry(id) {
  try {
    const response = await fetch(`/api/diary-entries/${id}`, {
      method: 'DELETE'
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '删除日记失败')
    }
    
    return { success: true }
  } catch (error) {
    console.error('删除日记条目失败:', error)
    throw error
  }
}
```

### cURL 示例

```bash
# 获取宝宝列表
curl -X GET "http://localhost:3000/api/babies" \
  -H "Content-Type: application/json"

# 创建新的成长记录
curl -X POST "http://localhost:3000/api/growth-records" \
  -H "Content-Type: application/json" \
  -d '{
    "babyId": "baby_123",
    "date": "2024-01-15",
    "weight": 4500,
    "height": 55,
    "headCircumference": 36,
    "notes": "宝宝状态良好"
  }'

# 更新里程碑
curl -X PUT "http://localhost:3000/api/milestones/milestone_123" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "更新的里程碑标题",
    "description": "更新的描述"
  }'

# 删除日记条目
curl -X DELETE "http://localhost:3000/api/diary-entries/diary_123"
```

---

## 🔐 认证与授权 (规划中)

### JWT Token 认证
```javascript
// 添加认证头
const response = await fetch('/api/babies', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
```

### API Key 认证
```javascript
// 添加 API Key
const response = await fetch('/api/babies', {
  headers: {
    'X-API-Key': 'your-api-key',
    'Content-Type': 'application/json'
  }
})
```

---

## 📊 限流与配额 (规划中)

### 请求限制
- **每分钟**: 60 次请求
- **每小时**: 1000 次请求
- **每天**: 10000 次请求

### 响应头
```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 59
X-RateLimit-Reset: 1640995200
```

---

## 🧪 测试工具

### Postman 集合
提供完整的 Postman 集合，包含所有 API 接口的示例请求。

### API 测试脚本
```javascript
// Jest 测试示例
describe('成长记录 API', () => {
  test('应该能够创建新的成长记录', async () => {
    const newRecord = {
      babyId: 'baby_123',
      date: '2024-01-15',
      weight: 4500,
      height: 55
    }
    
    const response = await fetch('/api/growth-records', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    })
    
    expect(response.status).toBe(201)
    const record = await response.json()
    expect(record.weight).toBe(4500)
  })
})
```

---

## 📞 技术支持

如果您在使用 API 过程中遇到问题，请：

1. 检查本文档中的示例
2. 确认请求格式是否正确
3. 查看错误响应中的详细信息
4. 创建 GitHub Issue 寻求帮助

**联系方式**：请在项目仓库中创建 Issue 或联系项目维护者。 