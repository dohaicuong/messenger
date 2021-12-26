import { extendType, objectType } from 'nexus'
import { connectionFromArray } from 'graphql-relay'

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

export const UserExtendRooms = extendType({
  type: 'User',
  definition: t => {
    // @ts-ignore
    t.nonNull.connectionField('rooms', {
      type: 'Room',
      // @ts-ignore
      resolve: async (_, args, { prisma, userId }) => {
        const rooms = await prisma.room.findMany({
          where: {
            OR: [
              {
                host: { id: userId }
              },
              {
                participants: {
                  some: { id: userId }
                }
              }
            ]
          }
        })

        const connection = connectionFromArray(rooms, args)

        return connection
      }
    })
  }
})
