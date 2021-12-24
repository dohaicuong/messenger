import { extendType, inputObjectType, nonNull, objectType } from 'nexus'
import { compare } from 'bcrypt'
import { signJwt } from '../../helpers/signJwt'
import mercurius from 'mercurius'
const { ErrorWithProps } = mercurius

export const UserLoginInput = inputObjectType({
  name: 'UserLoginInput',
  definition: t => {
    t.nonNull.string('email')
    t.nonNull.string('password')
  }
})

export const UserLoginPayload = objectType({
  name: 'UserLoginPayload',
  definition: t => {
    t.nonNull.string('jwt')
    t.nonNull.field('user', { type: 'User' })
  }
})

export const UserLoginMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('login', {
      args: { input: nonNull('UserLoginInput') },
      type: nonNull('UserLoginPayload'),
      resolve: async (_, { input }, { prisma }) => {
        const user = await prisma.user.findUnique({ where: { email: input.email }})
        if (!user) throw new Error('wrong email!')

        const isMatch = await compare(input.password, user.password)
        if (!isMatch) throw new Error('wrong password!')

        // sign jwt
        const token = signJwt({ sub: user.id })

        // return
        return {
          jwt: token,
          user,
        }
      }
    })
  }
})