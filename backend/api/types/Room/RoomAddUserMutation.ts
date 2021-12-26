import { extendType, inputObjectType, nonNull, objectType } from 'nexus'

export const RoomAddUserInput = inputObjectType({
  name: 'RoomAddUserInput',
  definition: t => {
    t.nonNull.field('roomId', { type: 'RelayId' })
    t.nonNull.field('participantId', { type: 'RelayId' })
  }
})

export const RoomAddUserPayload = objectType({
  name: 'RoomAddUserPayload',
  definition: t => {
    t.field('participant', { type: 'User' })
  }
})

export const RoomAddUserMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('roomAddUser', {
      args: { input: nonNull('RoomAddUserInput') },
      type: 'RoomAddUserPayload',
      resolve: async (_, { input }, { prisma, userId }) => {
        if (!userId) throw new Error('Please login!')

        const user = await prisma.user.findUnique({ where: { id: userId }})
        if (!user) throw new Error('Please login!')

        const room = await prisma.room.findUnique({ where: { id: input.roomId }})
        if (!room) throw new Error('Room is not existed')

        const participant = await prisma.user.findUnique({ where: { id: input.participantId }})
        if (!participant) throw new Error('The adding user is not existed')

        await prisma.room.update({
          where: { id: input.roomId },
          data: {
            participants: {
              connect: { id: input.participantId }
            }
          }
        })

        return {
          participant
        }
      }
    })
  }
})
