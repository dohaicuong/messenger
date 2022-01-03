import { CallRoom } from '@prisma/client'
import { extendType, inputObjectType, nonNull, objectType } from 'nexus'

export const CallJoinedInput = inputObjectType({
  name: 'CallJoinedInput',
  definition: t => {
    t.nonNull.field('callRoomId', { type: 'RelayId' })
  }
})

export const CallJoinedPayload = objectType({
  name: 'CallJoinedPayload',
  definition: t => {
    t.field('callRoom', { type: 'CallRoom' })
  }
})

export const CallJoinedEvent = 'CALL_JOINED'
export const getCallJoinedEvent = (callRoomId: string) => `${CallJoinedEvent}_${callRoomId}`
export type CallJoinedEventPayload = {
  callRoom: CallRoom
}

export const CallJoinedSubscription = extendType({
  type: 'Subscription',
  definition: t => {
    t.field('callJoined', {
      args: { input: nonNull('CallJoinedInput') },
      type: 'CallJoinedPayload',
      subscribe: (_, { input }, { pubsub }) => {
        return pubsub.subscribe(getCallJoinedEvent(input.callRoomId))
      },
      resolve: (payload: CallJoinedEventPayload) => payload
    })
  }
})
