import prisma from '@/controllers/_helpers/prisma'

export const getUserWithId = async (id) => (
  prisma.user.findUnique({
    where: { id },
    rejectOnNotFound: true,
    include: {
      instruments: true,
      portraits: true,
      tracks: true
    }
  })
)
