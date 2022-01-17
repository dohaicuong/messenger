import { extendType, inputObjectType, nonNull, objectType } from 'nexus';
import { CallJoinedEventPayload, getCallJoinedEvent } from '.';

export const CallJoinInput = inputObjectType({
  name: 'CallJoinInput',
  definition: t => {
    t.nonNull.field('roomId', { type: 'RelayId' })
    t.nonNull.string('answer')
    t.nonNull.list.nonNull.string('iceCandidates')
  }
})

export const CallJoinPayload = objectType({
  name: 'CallJoinPayload',
  definition: t => {
    t.field('callRoom', { type: 'CallRoom' })
  }
})

export const CallJoinMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('callJoin', {
      args: { input: nonNull('CallJoinInput') },
      type: 'CallJoinPayload',
      resolve: async (_, { input }, { prisma, userId, pubsub }) => {
        if (!userId) throw new Error('Please login!')

        const user = await prisma.user.findUnique({ where: { id: userId }})
        if (!user) throw new Error('Please login!')

        const callRoom = await prisma.callRoom.findUnique({ where: { id: input.roomId }})
        if(!callRoom) throw new Error('Room is not existed')

        if (callRoom.guestId !== userId) throw new Error('Not allowed to join the call')

        const updatedCallRoom = await prisma.callRoom.update({
          where: { id: input.roomId },
          data: {
            answer: input.answer,
            guestIceCandidates: input.iceCandidates,
          }
        })

        const topic = getCallJoinedEvent(input.roomId)
        // @ts-ignore
        pubsub.publish<CallJoinedEventPayload>({
          topic,
          payload: {
            callRoom: updatedCallRoom
          }
        })

        return {
          callRoom: updatedCallRoom
        }
      }
    })
  }
})
