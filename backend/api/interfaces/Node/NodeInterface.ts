import { toGlobalId } from 'graphql-relay'
import { interfaceType } from 'nexus'

export const NodeInterface = interfaceType({
  name: 'Node',
  resolveType: (node: any) => node.type,
  definition: t => {
    t.nonNull.id('id', {
      description: 'Relay ID',
      resolve: (node: any, __, ___, { parentType }) => {
        return toGlobalId(parentType.name, node.id)
      }
    })
  },
})
