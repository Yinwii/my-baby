# 性能优化建议和实现

## 已实现的优化

### 1. 图片数量卡片
- ✅ 在首页Dashboard添加了图片数量卡片
- ✅ 使用已有的`_count.mediaItems`数据，无需额外API请求
- ✅ 提供快速跳转到相册功能

### 2. 图表自适应起始值
- ✅ 实现了动态Y轴范围计算
- ✅ 根据实际数据自动调整起始值和最大值
- ✅ 添加合理的缓冲区避免数据点贴边
- ✅ 确保不会出现负数范围

### 3. 基础缓存机制
- ✅ 为useBaby hook添加5分钟内存缓存
- ✅ 避免重复的API请求
- ✅ 数据修改时自动清除缓存

## 建议的进一步优化

### 1. 图片懒加载
```typescript
// 在PhotoGallery组件中实现
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

const LazyImage = ({ src, alt, ...props }) => {
  const [ref, isIntersecting] = useIntersectionObserver()
  const [loaded, setLoaded] = useState(false)
  
  return (
    <div ref={ref}>
      {isIntersecting && (
        <Image
          src={src}
          alt={alt}
          {...props}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
      )}
    </div>
  )
}
```

### 2. API请求合并
```typescript
// 创建统合的dashboard数据hook
export function useDashboardData() {
  return useQuery(['dashboard'], async () => {
    const response = await fetch('/api/dashboard')
    return response.json()
  })
}

// API路由 /api/dashboard
export async function GET() {
  const baby = await prisma.baby.findFirst({
    include: {
      _count: { select: { growthRecords: true, milestones: true, mediaItems: true } },
      growthRecords: { take: 10, orderBy: { date: 'desc' } },
      milestones: { take: 3, orderBy: { date: 'desc' } }
    }
  })
  return NextResponse.json(baby)
}
```

### 3. 图片优化
- 实现图片压缩和尺寸优化
- 使用WebP格式
- 生成多种尺寸的缩略图

### 4. 状态管理优化
```typescript
// 使用React Query或SWR进行全局状态管理
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5分钟
      cacheTime: 10 * 60 * 1000, // 10分钟
    },
  },
})
```

### 5. 虚拟化长列表
```typescript
// 对于大量图片的情况，使用虚拟化
import { FixedSizeGrid as Grid } from 'react-window'

const VirtualizedPhotoGrid = ({ photos }) => (
  <Grid
    columnCount={4}
    columnWidth={250}
    height={600}
    rowCount={Math.ceil(photos.length / 4)}
    rowHeight={250}
    itemData={photos}
  >
    {PhotoItem}
  </Grid>
)
```

### 6. 预加载关键资源
```typescript
// 在首页预加载重要数据
useEffect(() => {
  // 预加载最新的几张图片
  const preloadImages = async () => {
    const response = await fetch('/api/photos?limit=6&babyId=' + baby?.id)
    const photos = await response.json()
    photos.forEach(photo => {
      const img = new Image()
      img.src = photo.url
    })
  }
  
  if (baby?.id) {
    preloadImages()
  }
}, [baby?.id])
```

## 性能监控

### 1. 关键指标
- 首屏加载时间 (FCP)
- 最大内容绘制 (LCP)
- 累积布局偏移 (CLS)
- 首次输入延迟 (FID)

### 2. 监控实现
```typescript
// pages/_app.tsx
import { getCLS, getFID, getFCP, getLCP } from 'web-vitals'

function sendToAnalytics(metric) {
  // 发送到分析服务
  console.log(metric)
}

export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'CLS':
      sendToAnalytics(metric)
      break
    case 'FID':
      sendToAnalytics(metric)
      break
    case 'FCP':
      sendToAnalytics(metric)
      break
    case 'LCP':
      sendToAnalytics(metric)
      break
    default:
      break
  }
}
```

## 估算性能提升

| 优化项目 | 预期提升 | 实施难度 |
|---------|---------|---------|
| 图片懒加载 | 30-50% 初始加载提升 | 中等 |
| API合并 | 20-30% 请求减少 | 简单 |
| 缓存机制 | 50-70% 重复访问提升 | 简单 |
| 图片压缩 | 40-60% 传输量减少 | 中等 |
| 虚拟化 | 80-90% 大列表性能提升 | 复杂 |

## 实施优先级

1. **高优先级**: 缓存机制、API合并 (已部分实现)
2. **中优先级**: 图片懒加载、压缩优化
3. **低优先级**: 虚拟化、高级监控

## 资源占用优化

### 1. 内存管理
- 及时清理不需要的缓存
- 使用WeakMap避免内存泄漏
- 限制同时加载的图片数量

### 2. 网络优化
- 实现请求去重
- 使用HTTP/2推送
- 启用gzip压缩

### 3. 存储优化
- 使用IndexedDB进行本地缓存
- 实现渐进式Web应用(PWA)
- 离线功能支持 