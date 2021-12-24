import { objectType } from 'nexus'

export const User = objectType({
  name: 'User',
  definition: t => {
    t.implements('Node')

    t.nonNull.string('email')
    t.nonNull.string('firstName')
    t.nonNull.string('lastName')
    t.string('avatar')
  }
})
