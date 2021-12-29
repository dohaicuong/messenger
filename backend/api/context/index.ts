import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaClient } from '@prisma/client'
import { verifyJwt } from '../helpers/jwt'
import { PubSub } from 'mercurius'
import { SocketStream } from 'fastify-websocket'

export type Context = {
  prisma: PrismaClient
  userId?: string
  pubsub: PubSub
}

const prisma = new PrismaClient()
export const context = async (request: FastifyRequest, reply: FastifyReply): Promise<Context> => {
  const token = request.headers.authorization?.replace('Bearer ', '')
  const userId = verifyJwt(token)

  return {
    prisma,
    userId
  } as Context
}

export const subscriptionContext = async (connection: SocketStream, request: FastifyRequest) => {
  // const token = request.headers.authorization?.replace('Bearer ', '')
  // const userId = verifyJwt(token)
  
  return {
    prisma,
  }
}