import { PrismaClient } from '@prisma/client'

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
        date: new Date('2025-06-12'),
        weight: 3.98
      },
    })
  ])


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