import prisma from '@/controllers/_helpers/prisma'

export const getTodoWithId = async (id) => (
  prisma.todo.findUnique({
    where: { id: Number(id) },
    rejectOnNotFound: true,
    include: {
      items: {
        orderBy: {
          id: 'asc'
        }
      }
    }
  })
)
