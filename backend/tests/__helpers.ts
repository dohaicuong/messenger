import { clientTestContext, ClientTestContext } from './clientTestContext'
import { prismaTestContext, PrismaTestContext } from './prismaTestContext'

type TestContext = 
  & PrismaTestContext 
  & ClientTestContext

export const createTestContext = (): TestContext => {
  let ctx = {} as TestContext
  const clientCtx = clientTestContext()
  const prismaCtx = prismaTestContext()
  
  beforeAll(async () => {
    const client = await clientCtx.beforeEach()
    const prisma = await prismaCtx.beforeAll()
    
    Object.assign(ctx, {
      client,
      prisma
    })
  })

  afterAll(async () => {
    await prismaCtx.afterAll()
  })

  // beforeEach(async () => {})
  // afterEach(async () => {})

  return ctx
}
