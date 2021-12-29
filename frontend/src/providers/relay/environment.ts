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
import { SubscriptionClient } from 'subscriptions-transport-ws'

const subscriptionClient = new SubscriptionClient(
  import.meta.env.VITE_API_SUBSCRIPTION_ENDPOINT,
  {
    reconnect: true,
  },
  WebSocket
)

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
    subscribeFn: (operation, variables) => {
      const subscribeObservable = subscriptionClient.request({
        query: operation.text || undefined,
        operationName: operation.name,
        variables,
      })

      return Observable.from(subscribeObservable as any) as any
    }
  }
)

const store = new Store(new RecordSource())

export const environment = new Environment({
  network,
  store
})
