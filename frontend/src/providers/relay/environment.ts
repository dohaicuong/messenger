import 'regenerator-runtime/runtime'
import {
  Environment,
  RecordSource,
  Store,
  Observable,
} from 'relay-runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
} from 'react-relay-network-modern'
import { createClient } from 'graphql-ws'

const subscriptionsClient = createClient({
  url: import.meta.env.VITE_API_SUBSCRIPTION_ENDPOINT
})

const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: (req) => Promise.resolve(import.meta.env.VITE_API_ENDPOINT),
    }),
    authMiddleware({
      // @ts-ignore
      token: (req) => {
        return localStorage.getItem('jwt') || undefined
      },
    }),
    // uploadMiddleware(),
  ],
  {
    noThrow: true,
    // @ts-ignore
    subscribeFn: (operation, variables) => {
      return Observable.create(sink => {
        if (!operation.text) {
          return sink.error(new Error('Operation text cannot be empty'));
        }

        return subscriptionsClient.subscribe(
          {
            operationName: operation.name,
            query: operation.text,
            variables
          },
          {
            ...sink,
            error: (err: any) => {
              // GraphQLError[]
              if (Array.isArray(err)) {
                return sink.error(new Error(err.map(({ message }) => message).join(', ')))
              }

              if (err instanceof CloseEvent) {
                return sink.error(new Error(`Socket closed with event ${err.code} ${err.reason || ''}`))
              }

              return sink.error(err)
            }
          }
        )
      })
    }
  }
)

const store = new Store(new RecordSource())

export const environment = new Environment({
  network,
  store
})
