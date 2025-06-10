import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('开始种子数据...')

  // 创建一个示例宝宝
  const baby = await prisma.baby.create({
    data: {
      name: '小好',
      birthDate: new Date('2025-05-30'),
      birthTime: '21:01',
      gender: 'boy',
      birthWeight: 3.48,
      birthHeight: 50,
      birthHeadCircumference: 34,
      bloodType: 'O',
      allergies: '',
      notes: '健康可爱的小宝贝',
    },
  })

  console.log('创建宝宝:', baby)

  // 创建一些成长记录
  const growthRecords = await Promise.all([
    prisma.growthRecord.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-15'),
        weight: 7.5,
        height: 65,
        headCircumference: 42,
        notes: '宝宝健康成长',
      },
    }),
    prisma.growthRecord.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-10-15'),
        weight: 7.2,
        height: 63,
        headCircumference: 41.5,
        notes: '食欲很好',
      },
    }),
    prisma.growthRecord.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-09-15'),
        weight: 6.8,
        height: 61,
        headCircumference: 41,
        notes: '开始爬行',
      },
    }),
  ])

  console.log(`创建了 ${growthRecords.length} 条成长记录`)

  // 创建一些里程碑
  const milestones = await Promise.all([
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-15'),
        title: '第一次翻身',
        description: '宝宝今天成功从仰卧翻到俯卧，太棒了！',
        category: 'motor',
      },
    }),
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-10'),
        title: '开始笑出声',
        description: '听到爸爸说话时咯咯笑，声音好甜',
        category: 'social',
      },
    }),
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-05'),
        title: '能够抓握玩具',
        description: '可以主动抓住摇铃并摇晃',
        category: 'motor',
      },
    }),
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-10-20'),
        title: '第一次叫"妈妈"',
        description: '虽然可能是无意识的，但听起来就像在叫妈妈',
        category: 'language',
      },
    }),
  ])

  console.log(`创建了 ${milestones.length} 个里程碑`)

  // 创建一些照片记录
  const photos = await Promise.all([
    prisma.photo.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-15'),
        title: '第一次翻身',
        description: '宝宝成功翻身的珍贵时刻',
        url: '/placeholder-baby1.jpg',
      },
    }),
    prisma.photo.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-10'),
        title: '甜美笑容',
        description: '听到爸爸说话时的开心表情',
        url: '/placeholder-baby2.jpg',
      },
    }),
    prisma.photo.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-05'),
        title: '玩玩具',
        description: '专注地玩摇铃玩具',
        url: '/placeholder-baby3.jpg',
      },
    }),
  ])

  console.log(`创建了 ${photos.length} 张照片`)

  // 创建一些日记条目
  const diaryEntries = await Promise.all([
    prisma.diaryEntry.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-15'),
        title: '宝宝第一次翻身',
        content: '今天是个特别的日子！小宝贝终于学会翻身了。早上换尿布的时候，我把他放在床上，转眼间他就从仰卧翻到了俯卧。看到他成功翻身后的开心表情，我和爸爸都激动坏了。这是他成长路上的一个重要里程碑，我们为他感到骄傲！',
        mood: 'excited',
        weather: 'sunny',
        tags: ['翻身', '里程碑', '成长'],
      },
    }),
    prisma.diaryEntry.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-10'),
        title: '第一次笑出声',
        content: '宝宝今天第一次笑出声了！当爸爸逗他玩的时候，他突然咯咯地笑起来，声音非常甜美。那一刻，整个房间都充满了快乐的气氛。这种纯真的笑声让我们觉得所有的疲惫都是值得的。',
        mood: 'happy',
        weather: 'cloudy',
        tags: ['笑声', '开心', '爸爸'],
      },
    }),
    prisma.diaryEntry.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-05'),
        title: '学会抓握玩具',
        content: '宝宝的小手越来越灵活了。今天给他一个摇铃，他居然能够主动抓住并摇晃。看着他专注地玩玩具的样子，感觉他在快速学习和探索这个世界。每一天都有新的发现，真是太神奇了。',
        mood: 'proud',
        weather: 'rainy',
        tags: ['玩具', '手部发育', '探索'],
      },
    }),
  ])

  console.log(`创建了 ${diaryEntries.length} 篇日记`)

  console.log('种子数据完成！')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 