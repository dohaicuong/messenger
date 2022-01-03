import { extendType, inputObjectType, nonNull, objectType } from 'nexus';

export const CallStartInput = inputObjectType({
  name: 'CallStartInput',
  definition: t => {
    t.nonNull.field('roomId', { type: 'RelayId' })
    t.nonNull.string('offer')
    t.nonNull.list.nonNull.string('iceCandidates')
  }
})

export const CallStartPayload = objectType({
  name: 'CallStartPayload',
  definition: t => {
    t.field('callRoom', { type: 'CallRoom' })
  }
})

export const CallStartMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('callStart', {
      args: { input: nonNull('CallStartInput') },
      type: 'CallStartPayload',
      resolve: async (_, { input }, { prisma, userId }) => {
        if (!userId) throw new Error('Please login!')

        const user = await prisma.user.findUnique({ where: { id: userId }})
        if (!user) throw new Error('Please login!')

        const callRoom = await prisma.callRoom.findUnique({ where: { id: input.roomId }})
        if(!callRoom) throw new Error('Room is not existed')

        if (callRoom.hostId !== userId) throw new Error('Only host is able to start the call')

        const updatedCallRoom = await prisma.callRoom.update({
          where: { id: input.roomId },
          data: {
            offer: input.offer,
            hostIceCandidates: input.iceCandidates,
          }
        })

        return { callRoom: updatedCallRoom }
      }
    })
  }
})
