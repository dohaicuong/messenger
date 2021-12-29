import { Message, Room } from '@prisma/client'
import { connectionFromArray } from 'graphql-relay'
import { extendType, objectType } from 'nexus'

export const MessageModel = objectType({
  name: 'Message',
  definition: t => {
    t.implements('Node')
    t.nonNull.string('content')

    t.nonNull.field('author', {
      type: 'User',
      // @ts-ignore
      resolve: (message: Message, __, { prisma }) => {
        return prisma.user.findUnique({ where: { id: message.authorId }})
      }
    })
  }
})

export const RoomExtendMessages = extendType({
  type: 'Room',
  definition: t => {
    // @ts-ignore
    t.nonNull.connectionField('messages', {
      type: 'Message',
      disableBackwardPagination: false,
      // @ts-ignore
      resolve: async (room: Room, args, { prisma }) => {
        const messages = await prisma.message.findMany({
          where: { roomId: room.id }
        })

        const connection = connectionFromArray(messages, args)

        return connection
      }
    })
  }
})
