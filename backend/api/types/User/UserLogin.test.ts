import { LoginSuccessMutation, LoginSuccessMutationVariables, NonExistedEmailLoginMutation, NonExistedEmailLoginMutationVariables, WrongPassLoginMutation, WrongPassLoginMutationVariables } from '../../../tests/generated/types'
import { createTestContext } from '../../../tests/__helpers'
import bcrypt from 'bcrypt'

const context = createTestContext()

test('login with non existed email', async () => {
  const res = await context.client.mutate<NonExistedEmailLoginMutation, NonExistedEmailLoginMutationVariables>(
    // gql
    `
      mutation NonExistedEmailLogin($input: UserLoginInput!) {
        login(input: $input) {
          jwt
          user { id }
        }
      }
    `,
    {
      variables: {
        input: {
          email: 'noone@test.com',
          password: '123456',
        }
      }
    }
  )

  expect(res.errors?.[0].message).toBe('wrong email!')
})

test('login with wrong password', async () => {
  const data = {
    email: 'wrongpass@test.com',
    password: '123456',
    firstName: 'wrong',
    lastName: 'pass'
  }
  await context.prisma.user.create({ data })

  const res = await context.client.mutate<WrongPassLoginMutation, WrongPassLoginMutationVariables>(
    // gql
    `
      mutation WrongPassLogin($input: UserLoginInput!) {
        login(input: $input) {
          jwt
          user { id }
        }
      }
    `,
    { variables: { input: {
      email: data.email,
      password: 'wrongpass',
    }}}
  )

  expect(res.errors?.[0].message).toBe('wrong password!')
})

test('login successfully', async () => {
  const password = '123456'
  const hashedPassword = await bcrypt.hash(password, 10)
  const data = {
    email: 'successlogin@test.com',
    password: hashedPassword,
    firstName: 'wrong',
    lastName: 'pass',
    avatar: 'someplace.com/somepicture.png'
  }
  await context.prisma.user.create({ data })

  const res = await context.client.mutate<LoginSuccessMutation, LoginSuccessMutationVariables>(
    // gql
    `
      mutation LoginSuccess($input: UserLoginInput!) {
        login(input: $input) {
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
    { variables: { input: {
      email: data.email,
      password,
    }}}
  )

  expect(res.data.login.jwt).toBeDefined()
  expect(res.data.login.user.id).toBeDefined()
  expect(res.data.login.user.email).toBe(data.email)
  expect(res.data.login.user.firstName).toBe(data.firstName)
  expect(res.data.login.user.lastName).toBe(data.lastName)
  expect(res.data.login.user.avatar).toBe(data.avatar)
})
