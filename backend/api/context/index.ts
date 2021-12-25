import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { verifyJwt } from '../helpers/jwt'

export type Context = {
  prisma: PrismaClient
  userId?: string
}

const prisma = new PrismaClient()
export const context = async (request: FastifyRequest, reply: FastifyReply): Promise<Context> => {
  const token = request.headers.authorization?.replace('Bearer ', '')
  const userId = verifyJwt(token)

  return {
    prisma,
    userId
  }
}
