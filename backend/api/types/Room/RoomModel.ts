import { extendType, inputObjectType, objectType } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { Room, User } from '@prisma/client'

export const RoomModel = objectType({
  name: 'Room',
  definition: t => {
    t.implements('Node')
    // @ts-ignore
    t.string('name', {
      resolve: async (room: Room, __, { prisma }) => {
        if (room.name) return room.name

        const participants = await prisma.room
          .findUnique({ where: { id: room.id }})
          .participants({ take: 4 })
        const name = participants.map((participant: User) => participant.firstName).join(', ')
        if(name) return name

        return 'Room name'
      }
    })
    t.nonNull.field('host', {
      type: 'User',
      // @ts-ignore
      resolve: (room, __, { prisma }) => {
        return prisma.user.findUnique({ where: { id: (room as any).hostId }})
      }
    })
    t.nonNull.list.nonNull.field('participants', {
      type: 'User',
      resolve: async (room, __, { prisma }) => {
        return prisma.room.findUnique({ where: { id: (room as any).id }}).participants()
      }
    })
  }
})

export const UserRoomConnectionWhere = inputObjectType({
  name: 'UserRoomConnectionWhere',
  definition: t => {
    t.string('name')
  }
})

export const UserExtendRooms = extendType({
  type: 'User',
  definition: t => {
    // @ts-ignore
    t.nonNull.connectionField('rooms', {
      additionalArgs: {
        where: 'UserRoomConnectionWhere'
      },
      type: 'Room',
      // @ts-ignore
      resolve: async (_, { where, ...args }, { prisma, userId }) => {
        const rooms = await prisma.room.findMany({
          where: {
            AND: [
              where?.name ? {
                OR: [
                  {
                    name: {
                      contains: where?.name || undefined,
                      mode: 'insensitive'
                    },
                  },
                  {
                    host: {
                      OR: [
                        {
                          firstName: {
                            contains: where?.name || undefined,
                            mode: 'insensitive'
                          }
                        },
                        // {
                        //   lastName: {
                        //     contains: where?.name || undefined,
                        //     mode: 'insensitive'
                        //   }
                        // }
                      ]
                    },
                  },
                  {
                    participants: {
                      some: {
                        OR: [
                          {
                            firstName: {
                              contains: where?.name || undefined,
                              mode: 'insensitive'
                            }
                          },
                          // {
                          //   lastName: {
                          //     contains: where?.name || undefined,
                          //     mode: 'insensitive'
                          //   }
                          // }
                        ]
                      }
                    }
                  }
                ]
              } : {},
              {
                OR: [
                  {
                    host: { id: userId }
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

        const connection = connectionFromArray(rooms, args)

        return connection
      }
    })
  }
})
