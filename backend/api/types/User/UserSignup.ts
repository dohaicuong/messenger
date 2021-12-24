import { extendType, inputObjectType, nonNull, objectType } from 'nexus'
import bcrypt from 'bcrypt'
import { signJwt } from '../../helpers/signJwt'

export const UserSignupInput = inputObjectType({
  name: 'UserSignupInput',
  definition: t => {
    t.nonNull.string('email')
    t.nonNull.string('password')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.string('avatar')
  }
})

export const UserSignupPayload = objectType({
  name: 'UserSignupPayload',
  definition: t => {
    t.nonNull.string('jwt')
    t.nonNull.field('user', { type: 'User' })
  }
})

export const UserSignupMutation = extendType({
  type: 'Mutation',
  definition: t => {
    t.field('signup', {
      args: { input: nonNull('UserSignupInput') },
      type: nonNull('UserSignupPayload'),
      resolve: async (_, { input }, { prisma }) => {
        const user = await prisma.user.findUnique({ where: { email: input.email }})
        if (user) throw new Error('Email is existed!')

        const hashedPassword = await bcrypt.hash(input.password, 10)

        const newUser = await prisma.user.create({ data: {
          email: input.email,
          password: hashedPassword,
          firstName: input.firstName,
          lastName: input.lastName,
          avatar: input.avatar
        }})

        const token = signJwt({ sub: newUser.id })

        return {
          jwt: token,
          user: newUser
        }
      }
    })
  }
})
