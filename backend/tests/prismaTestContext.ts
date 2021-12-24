import { join } from 'path'
import { execSync } from 'child_process'
import { PrismaClient } from '@prisma/client'

export type PrismaTestContext = {
  prisma: PrismaClient
}

export const prismaTestContext = () => {
  const prismaBinary = join(__dirname, '..', 'node_modules', '.bin', 'prisma')
  let prismaClient: null | PrismaClient = null

  if (!process.env.DATABASE_URL) throw new Error('Setup DB and add DATABASE_URL to .env.test before testing!')

  return {
    beforeAll: async () => {
      execSync(`${prismaBinary} db push`)
      prismaClient = new PrismaClient()
      return prismaClient
    },
    afterAll:async () => {
      execSync(`${prismaBinary} migrate reset --force`)
      await prismaClient?.$disconnect()
    }
  }
}
