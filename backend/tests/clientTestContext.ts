import { createMercuriusTestClient } from 'mercurius-integration-testing'
import { server } from '../api/server'

export type ClientTestContext = {
  client: ReturnType<typeof createMercuriusTestClient>
}

export const clientTestContext = () => {
  return {
    beforeEach: async () => {
      const client = createMercuriusTestClient(server)

      return client
    }
  }
}
