import { UserSignupMutation, UserSignupMutationVariables, UserSuccessSignupMutation, UserSuccessSignupMutationVariables } from '../../../tests/generated/types'
import { createTestContext } from '../../../tests/__helpers'

process.env.JWT_SECRET = 'test-jwt-secret'

const context = createTestContext()

test('signup with existed email', async () => {
  const data = {
    email: 'existed.signup@test.com',
    password: '123',
    firstName: 'Eric',
    lastName: 'Do',
    avatar: 'https://somewhere.com/somepicture.png',
  }
  await context.prisma.user.create({ data })

  const res = await context.client.mutate<UserSignupMutation, UserSignupMutationVariables>(
    // gql
    `
      mutation UserSignup($input: UserSignupInput!) {
        signup(input: $input) {
          jwt
          user {
            email
          }
        }
      }
    `,
    {
      variables: {
        input: {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      }
    }
  )

  expect(res.errors?.[0].message).toBe('Email is existed!')
})

test('signup then return user and jwt', async () => {
  const input = {
    email: 'signup.success@test.com',
    password: '123',
    firstName: 'yeeee',
    lastName: 'haaaaa',
    avatar: 'someplace.com/someimage.png'
  }
  
  const res = await context.client.mutate<UserSuccessSignupMutation, UserSuccessSignupMutationVariables>(
    // gql
    `
      mutation UserSuccessSignup($input: UserSignupInput!) {
        signup(input: $input) {
          jwt
          user {
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
        input
      }
    }
  )

  expect(res.data.signup.jwt).toBeDefined()
  expect(res.data.signup.user.id).toBeDefined()
  expect(res.data.signup.user.email).toBe(input.email)
  expect(res.data.signup.user.firstName).toBe(input.firstName)
  expect(res.data.signup.user.lastName).toBe(input.lastName)
  expect(res.data.signup.user.avatar).toBe(input.avatar)
})
