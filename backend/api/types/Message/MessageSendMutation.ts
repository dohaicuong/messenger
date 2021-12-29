import { extendType, inputObjectType, nonNull, objectType } from 'nexus'

export const MessageSendInput = inputObjectType({
  name: 'MessageSendInput',
  definition: t => {
    t.nonNull.string('content')
    t.nonNull.field('roomId', { type: 'RelayId' })
  }
})

export const MessageSendPayload = objectType({
  name: 'MessageSendPayload',
  definition: t => {
    t.field('message', { type: 'Message' })
  }
})

export const MessageSendMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('messageSend', {
      args: { input: nonNull('MessageSendInput') },
      type: 'MessageSendPayload',
      resolve: async (_, { input }, { prisma, userId }) => {
        // user is in room
        const isInRoom = await prisma.room.findMany({
          where: {
            AND: [
              {
                id: input.roomId
              },
              {
                OR: [
                  {
                    hostId: userId
                  },
                  {
                    participants: {
                      some: { id: userId }
                    }
                  }
                ]
              }
            ]
          }
        })
        if (!isInRoom) throw new Error('Join room first to send message')

        const newMessage = await prisma.message.create({
          data: {
            content: input.content,
            room: { connect: { id: input.roomId } },
            author: { connect: { id: userId } }
          }
        })

        return {
          message: newMessage
        }
      }
    })
  }
})
