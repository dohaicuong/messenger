import { fromGlobalId } from 'graphql-relay'
import { extendType, nonNull } from 'nexus'

export const NodeQuery = extendType({
  type: 'Query',
  definition: t => {
    t.field('node', {
      type: 'Node',
      args: { id: nonNull('ID') },
      resolve: async (_, args, ctx) => {
        const { id, type, objectName } = decodeGlobalId(args.id)
        if(!(ctx.prisma as any)?.[objectName]) throw new Error('id is invalid')

        const node = await (ctx.prisma as any)[objectName].findUnique({ where: { id }})
        if(!node) return null

        return {
          ...node,
          type
        }
      }
    })
  }
})

/*
 * HELPERS
 */
const decodeGlobalId = (globalId: string): { id: string, type: string, objectName: string } => {
  const { type, id } = fromGlobalId(globalId)
  const objectName = type.charAt(0).toLowerCase() + type.slice(1)
  return { id, type, objectName }
}