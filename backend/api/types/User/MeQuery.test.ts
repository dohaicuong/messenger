import { MeNoJwtQuery, MeNoJwtQueryVariables, MeInvalidJwtQuery, MeInvalidJwtQueryVariables, MeFakeUserJwtQuery, MeFakeUserJwtQueryVariables, MeValidUserJwtQuery, MeValidUserJwtQueryVariables } from '../../../tests/generated/types'
import { createTestContext } from '../../../tests/__helpers'
import { sign } from 'jsonwebtoken'
import { signJwt } from '../../helpers/jwt'
import { toGlobalId } from 'graphql-relay'

const context = createTestContext()

test('me query without jwt', async () => {
  const res = await context.client.query<MeNoJwtQuery, MeNoJwtQueryVariables>(
    // gql
    `
      query MeNoJwt {
        me { id }
      }
    `
  )

  expect(res.data.me).toBe(null)
  expect(res.errors).toBeUndefined()
})

test('me query invalid jwt', async () => {
  const invalidJwt = sign({}, 'invalid_secret')
  const res = await context.client.query<MeInvalidJwtQuery, MeInvalidJwtQueryVariables>(
    // gql
    `
      query MeInvalidJwt {
        me { id }
      }
    `,
    {
      headers: {
        authorization: `Bearer ${invalidJwt}`
      }
    }
  )

  expect(res.data.me).toBe(null)
  expect(res.errors).toBeUndefined()
})

test('me query jwt with not exist user', async () => {
  const fakeUserJwt = signJwt({ sub: 'fakeid' })
  const res = await context.client.query<MeFakeUserJwtQuery, MeFakeUserJwtQueryVariables>(
    // gql
    `
      query MeFakeUserJwt {
        me { id }
      }
    `,
    {
      headers: {
        authorization: `Bearer ${fakeUserJwt}`
      }
    }
  )

  expect(res.data.me).toBe(null)
  expect(res.errors).toBeUndefined()
})

test('me query valid jwt', async () => {
  const data = {
    email: 'valid.user.me.query@test.com',
    password: 'password',
    firstName: 'valid',
    lastName: 'user',
    avatar: 'someplace.com/somepicture.png'
  }
  const user = await context.prisma.user.create({ data })

  const validJwt = signJwt({ sub: user.id })
  const relayId = toGlobalId('User', user.id)
  const res = await context.client.query<MeValidUserJwtQuery, MeValidUserJwtQueryVariables>(
    // gql
    `
      query MeValidUserJwt {
        me { id }
      }
    `,
    {
      headers: {
        authorization: `Bearer ${validJwt}`
      }
    }
  )

  expect(res.errors).toBeUndefined()
  expect(res.data.me?.id).toBe(relayId)
})
