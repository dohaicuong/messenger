import { Message } from '@prisma/client'
import { extendType, inputObjectType, nonNull, objectType } from 'nexus'

export const MessageSentInput = inputObjectType({
  name: 'MessageSentInput',
  definition: t => {
    t.nonNull.field('roomId', { type: 'RelayId' })
  }
})

export const MessageSentPayload = objectType({
  name: 'MessageSentPayload',
  definition: t => {
    t.field('message', { type: 'Message' })
  }
})

export const MessageSentEvent = 'MESSAGE_SENT'
export const getMessageSentEvent = (roomId: string) => `${MessageSentEvent}_${roomId}`
export type MessageSentEventPayload = {
  message: Message
}

export const MessageSentSubscription = extendType({
  type: 'Subscription',
  definition: t => {
    t.field('messageSent', {
      args: { input: nonNull('MessageSentInput') },
      type: 'MessageSentPayload',
      subscribe: (_, { input }, { pubsub }) => {
        return pubsub.subscribe(getMessageSentEvent(input.roomId))
      },
      resolve: (payload: MessageSentEventPayload) => payload
    })
  }
})
