import { makeSchema, connectionPlugin } from 'nexus'
import { join } from 'path'

// import NexusPrismaScalars from 'nexus-prisma/scalars'
import * as scalars from './scalars'
import * as interfaces from './interfaces'
import * as types from './types'

export const schema = makeSchema({
  types: [scalars, interfaces, types],
  plugins: [
    connectionPlugin({
      disableBackwardPagination: true,
    })
  ],
  contextType: {
    module: join(__dirname, 'context', 'index.ts'),
    export: 'Context'
  },
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'),
    schema: join(__dirname, '..', 'schema.graphql'),
  },
})
