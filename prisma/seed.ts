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
        tags: ['运动发展', '翻身', '里程碑'],
      },
    }),
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-10'),
        title: '开始笑出声',
        description: '听到爸爸说话时咯咯笑，声音好甜',
        tags: ['社交发展', '笑声', '情感表达'],
      },
    }),
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-11-05'),
        title: '能够抓握玩具',
        description: '可以主动抓住摇铃并摇晃',
        tags: ['运动发展', '手部发育', '抓握'],
      },
    }),
    prisma.milestone.create({
      data: {
        babyId: baby.id,
        date: new Date('2024-10-20'),
        title: '第一次叫"妈妈"',
        description: '虽然可能是无意识的，但听起来就像在叫妈妈',
        tags: ['语言发展', '第一次', '发声'],
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