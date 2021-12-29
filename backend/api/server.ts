import fastify from 'fastify'
import mercurius from 'mercurius'
import cors from 'fastify-cors'
import { schema } from './schema'
import { context, subscriptionContext } from './context'

export const server = fastify()

server.register(cors)

server.register(mercurius, {
  schema: schema,
  
  graphiql: true,
  context,
  subscription: {
    context: subscriptionContext
  },
  
  errorFormatter: (err, ctx) => {
    const res = mercurius.defaultErrorFormatter(err, ctx)

    const hasInternalError = res.response.errors?.find(error => error?.extensions?.code === 'INTERNAL_ERROR')
    if (hasInternalError) res.statusCode = 500
    else res.statusCode = 200

    // TODO: check, confirm and test
    const paths = res.response.errors?.map(error => error.path)
    if (paths?.[0]?.[0]) res.response.data = {
      [paths[0][0]]: null
    }
    
    return res 
  }
})
