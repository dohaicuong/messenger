import { toGlobalId } from 'graphql-relay'
import { UserNodeQuery, UserNodeQueryVariables } from '../../../tests/generated/types'
import { createTestContext } from '../../../tests/__helpers'

const context = createTestContext()

test('User model return correct fields', async () => {
  const data = {
    email: 'user.model.node@test.com',
    password: '123',
    firstName: 'Eric',
    lastName: 'Do',
    avatar: 'https://somewhere.com/somepicture.png',
  }

  const user = await context.prisma.user.create({ data })
  const relayId = toGlobalId('User', user.id)

  const res = await context.client.query<UserNodeQuery, UserNodeQueryVariables>(
    // gql
    `
      query UserNode($id: ID!) {
        node(id: $id) {
          __typename
          ... on User {
            id
            email
            firstName
            lastName
            avatar
          }
        }
      }
    `,
    {
      variables: {
        id: relayId
      }
    }
  )
  
  expect(res.data.node?.__typename).toBe('User')
  if (res.data.node?.__typename === 'User') {
    expect(res.data.node?.id).toBe(relayId)
    expect(res.data.node?.email).toBe(data.email)
    expect(res.data.node?.firstName).toBe(data.firstName)
    expect(res.data.node?.lastName).toBe(data.lastName)
    expect(res.data.node?.avatar).toBe(data.avatar)
  }
})
