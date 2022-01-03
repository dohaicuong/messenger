import { CallRoom } from '@prisma/client'
import { objectType } from 'nexus'

export const CallRoomModel = objectType({
  name: 'CallRoom',
  definition: t => {
    t.implements('Node')
    
    t.nonNull.field('host', {
      type: 'User',
      // @ts-ignore
      resolve: (callRoom: CallRoom, __, { prisma }) => {
        return prisma.user.findUnique({ where: { id: callRoom.hostId }})
      }
    })
    t.string('offer')
    t.nonNull.list.nonNull.string('hostIceCandidates')

    t.field('guest', {
      type: 'User',
      // @ts-ignore
      resolve: (callRoom: CallRoom, __, { prisma }) => {
        if(!callRoom.guestId) return null

        return prisma.user.findUnique({ where: { id: callRoom.guestId }})
      }
    })
    t.string('answer')
    t.nonNull.list.nonNull.string('guestIceCandidates')
  }
})
