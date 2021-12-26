import { objectType } from 'nexus'

export const RoomModel = objectType({
  name: 'Room',
  definition: t => {
    t.implements('Node')
    t.string('name')
    t.nonNull.field('host', {
      type: 'User',
      // @ts-ignore
      resolve: (room, __, { prisma }) => {
        return prisma.user.findUnique({ where: { id: (room as any).hostId }})
      }
    })
    t.nonNull.list.nonNull.field('participants', {
      type: 'User',
      resolve: async (room, __, { prisma }) => {
        return prisma.room.findUnique({ where: { id: (room as any).id }}).participants()
      }
    })
  }
})
