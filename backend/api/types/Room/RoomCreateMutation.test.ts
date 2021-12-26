import { toGlobalId } from 'graphql-relay'
import { RoomCreateFakeJwtMutation, RoomCreateFakeJwtMutationVariables, RoomCreateMutation, RoomCreateMutationVariables, RoomCreateWithoutJwtMutation, RoomCreateWithoutJwtMutationVariables } from '../../../tests/generated/types'
import { createTestContext } from '../../../tests/__helpers'
import { signJwt } from '../../helpers/jwt'

const context = createTestContext()

test('Create room without jwt', async () => {
  const res = await context.client.mutate<RoomCreateWithoutJwtMutation, RoomCreateWithoutJwtMutationVariables>(
    // gql
    `
      mutation RoomCreateWithoutJwt($input: RoomCreateInput!) {
        roomCreate(input: $input) {
          room { id }
        }
      }
    `,
    {
      variables: {
        input: {
          participantIds: []
        }
      }
    }
  )

  expect(res.errors?.[0].message).toBe('Please login!')
})

test('Create room with non existed user jwt', async () => {
  const notExistedUserJwt = signJwt({ sub: 'fake_id' })
  const res = await context.client.mutate<RoomCreateFakeJwtMutation, RoomCreateFakeJwtMutationVariables>(
    // gql
    `
      mutation RoomCreateFakeJwt($input: RoomCreateInput!) {
        roomCreate(input: $input) {
          room { id }
        }
      }
    `,
    {
      variables: {
        input: {
          participantIds: []
        }
      },
      headers: {
        authorization: `Bearer ${notExistedUserJwt}`
      }
    }
  )
  
  expect(res.errors?.[0].message).toBe('Please login!')
})

test('Create room successfully', async () => {
  const [host, participant1] = await Promise.all([
    context.prisma.user.create({
      data: {
        email: 'room.create.host@test.com',
        password: '123',
        firstName: 'Eric',
        lastName: 'Do',
      }
    }),
    context.prisma.user.create({
      data: {
        email: 'room.create.participant1@test.com',
        password: '123',
        firstName: 'Eric',
        lastName: 'Do',
      }
    })
  ])
  const jwt = signJwt({ sub: host.id })
  const participant1RelayId = toGlobalId('User', participant1.id)

  const res = await context.client.mutate<RoomCreateMutation, RoomCreateMutationVariables>(
    // gql
    `
      mutation RoomCreate($input: RoomCreateInput!) {
        roomCreate(input: $input) {
          room {
            id
            host { email }
            participants { email }
          }
        }
      }
    `,
    {
      variables: {
        input: {
          participantIds: [participant1RelayId]
        }
      },
      headers: {
        authorization: `Bearer ${jwt}`
      }
    }
  )
  
  expect(res.errors).toBeUndefined()
  expect(res.data.roomCreate?.room?.id).toBeDefined()
  expect(res.data.roomCreate?.room?.host.email).toBe('room.create.host@test.com')
  expect(res.data.roomCreate?.room?.participants[0].email).toBe('room.create.participant1@test.com')
})