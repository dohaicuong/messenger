import { connectionFromArray } from 'graphql-relay'
import { extendType, inputObjectType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition: t => {
    t.implements('Node')

    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.nonNull.string('name', {
      resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`
    })
    t.string('avatar')
  }
})

export const OthersConnectionWhere = inputObjectType({
  name: 'OthersConnectionWhere',
  definition: t => {
    t.string('name')
  }
})

export const OthersConnection = extendType({
  type: 'User',
  definition: t => {
    // @ts-ignore
    t.nonNull.connectionField('others', {
      additionalArgs: {
        where: 'OthersConnectionWhere',
      },
      type: 'User',
      
      // @ts-ignore
      resolve: async (_, { where, ...args }, { prisma, userId }) => {
        const users = await prisma.user.findMany({
          where: {
            id: { not: userId },
            ...(where?.name ? {
              OR: [
                { firstName: {
                  contains: where.name || undefined,
                  mode: 'insensitive',
                }},
                { lastName: {
                  contains: where.name || undefined,
                  mode: 'insensitive'
                }},
              ]
            } : {})
          }
        })

        return connectionFromArray(users, args)
      }
    })
  }
})
