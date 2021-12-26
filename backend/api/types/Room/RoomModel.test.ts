import { toGlobalId } from 'graphql-relay'
import { RoomNodeQuery, RoomNodeQueryVariables } from '../../../tests/generated/types'
import { createTestContext } from '../../../tests/__helpers'

const context = createTestContext()

test('Room model return correct fields', async () => {
  const room = await context.prisma.room.create({ data: {
    name: 'room name',
    host: {
      create: {
        email: 'room.host.model@test.com',
        password: '123',
        firstName: 'Eric',
        lastName: 'Do',
      }
    },
    participants: {
      create: [
        {
          email: 'room.participant1.model@test.com',
          password: '123',
          firstName: 'Eric',
          lastName: 'Do',
        },
        {
          email: 'room.participant2.model@test.com',
          password: '123',
          firstName: 'Eric',
          lastName: 'Do',
        }
      ]
    },
  }})

  const roomRelayId = toGlobalId('Room', room.id)
  const res = await context.client.query<RoomNodeQuery, RoomNodeQueryVariables>(
    // gql
    `
      query RoomNode($id: ID!) {
        node(id: $id) {
          __typename
          ... on Room {
            id
            name
            host { email }
            participants { email }
          }
        }
      }
    `,
    {
      variables: {
        id: roomRelayId
      }
    }
  )

  expect(res.data.node?.__typename).toBe('Room')
  if(res.data.node?.__typename === 'Room') {
    expect(res.data.node.id).toBeDefined()
    expect(res.data.node.name).toBe('room name')
    expect(res.data.node.host.email).toBe('room.host.model@test.com')
    expect(res.data.node.participants[0].email).toBe('room.participant1.model@test.com')
    expect(res.data.node.participants[1].email).toBe('room.participant2.model@test.com')
  }
})
