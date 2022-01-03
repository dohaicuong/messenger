import { extendType, inputObjectType, nonNull, objectType } from 'nexus';

export const CallRoomCreateInput = inputObjectType({
  name: 'CallRoomCreateInput',
  definition: t => {
    t.nonNull.field('guestId', { type: 'RelayId' })
  }
})

export const CallRoomCreatePayload = objectType({
  name: 'CallRoomCreatePayload',
  definition: t => {
    t.field('callRoom', { type: 'CallRoom' })
  }
})

export const CallRoomCreateMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('callRoomCreate', {
      args: { input: nonNull('CallRoomCreateInput') },
      type: 'CallRoomCreatePayload',
      resolve: async (_, { input }, { prisma, userId }) => {
        if (!userId) throw new Error('Please login!')

        const user = await prisma.user.findUnique({ where: { id: userId }})
        if (!user) throw new Error('Please login!')

        const newCallRoom = await prisma.callRoom.create({
          data: {
            host: { connect: { id: userId }},
            guest: { connect: { id: input.guestId }},
          }
        })

        return {
          callRoom: newCallRoom
        }
      }
    })
  }
})
