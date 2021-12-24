import { RelayEnvironmentProvider } from 'react-relay'
import { environment } from './environment'

const RelayProvider: React.FC = ({ children }) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  )
}

export default RelayProvider
