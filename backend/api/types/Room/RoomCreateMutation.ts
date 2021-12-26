import { fromGlobalId } from "graphql-relay";
import { extendType, inputObjectType, nonNull, objectType } from "nexus";

export const RoomCreateInput = inputObjectType({
  name: 'RoomCreateInput',
  definition: t => {
    t.string('name')
    t.nonNull.list.nonNull.field('participantIds', { type: 'RelayId' })
  }
})

export const RoomCreatePayload = objectType({
  name: 'RoomCreatePayload',
  definition: t => {
    t.field('room', { type: 'Room' })
  }
})

export const RoomCreateMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('roomCreate', {
      args: { input: nonNull('RoomCreateInput') },
      type: 'RoomCreatePayload',
      resolve: async (_, { input }, { prisma, userId }) => {
        if (!userId) throw new Error('Please login!')

        const user = await prisma.user.findUnique({ where: { id: userId }})
        if (!user) throw new Error('Please login!')

        const participantRelayIdsConnect = input.participantIds.map((id: string) => ({ id }))
        const newRoom = await prisma.room.create({
          data: {
            name: input.name || undefined,
            host: { connect: { id: userId }},
            participants: {
              connect: participantRelayIdsConnect
            }
          }
        })

        return {
          room: newRoom
        }
      }
    })
  }
})
