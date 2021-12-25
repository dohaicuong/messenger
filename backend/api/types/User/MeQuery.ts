import { extendType } from 'nexus'

export const MeQuery = extendType({
  type: 'Query',
  definition: t => {
    t.field('me', {
      type: 'User',
      resolve: (_, __, { prisma, userId }) => {
        if (!userId) return null
        
        return prisma.user.findUnique({ where: { id: userId }})
      }
    })
  }
})
