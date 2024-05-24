const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const todo = await prisma.todolists.createMany({
    data: [{
        id: 1,
        title: 'タスク1',
        detail: "App Routerを理解する",
        date: "2024-05-01T00:00:00.000Z",
        completed: true
      },
      {
        id: 2,
        title: 'タスク2',
        detail: "frontendとBackend連携",
        date: "2024-05-02T00:00:00.000Z",
        completed: false
      },
      {
        id: 3,
        title: 'タスク3',
        detail: "ログ設計と実装",
        date: "2024-05-03T00:00:00.000Z",
        completed: true
      }]
  })}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })