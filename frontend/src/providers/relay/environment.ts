import 'regenerator-runtime/runtime'
import { Environment, RecordSource, Store } from 'relay-runtime'
import {
  RelayNetworkLayer,
  urlMiddleware,
  authMiddleware,
} from 'react-relay-network-modern'

const network = new RelayNetworkLayer(
  [
    urlMiddleware({
      url: (req) => Promise.resolve('http://127.0.0.1:4000/graphql'),
    }),
    authMiddleware({
      token: localStorage.getItem('jwt') || undefined,
    }),
    // uploadMiddleware(),
  ],
  {
    noThrow: true
  }
)

const store = new Store(new RecordSource())

export const environment = new Environment({
  network,
  store
})
