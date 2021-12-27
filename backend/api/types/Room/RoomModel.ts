import { extendType, objectType } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { Room, User } from '@prisma/client'

export const RoomModel = objectType({
  name: 'Room',
  definition: t => {
    t.implements('Node')
    // @ts-ignore
    t.string('name', {
      resolve: async (room: Room, __, { prisma }) => {
        if (room.name) return room.name

        const participants = await prisma.room
          .findUnique({ where: { id: room.id }})
          .participants({ take: 4 })
        const name = participants.map((participant: User) => participant.firstName).join(', ')
        if(name) return name

        return 'Room name'
      }
    })
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
