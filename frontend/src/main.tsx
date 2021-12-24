import { createRoot } from 'react-dom'

import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter } from 'react-router-dom'

import ThemeProvider from './providers/theme'
import { SnackbarProvider } from 'notistack'
import RelayProvider from './providers/relay'
import Routing from './providers/routes'
import AuthProvider from './providers/auth'

const rootElement = document.getElementById('root')
if(!rootElement) throw new Error('Root element not found. Unable to render the App')

createRoot(rootElement).render(
  <BrowserRouter>
    <ThemeProvider>
      <ErrorBoundary fallback={<>Something went wrong!</>}>
        <Suspense fallback='Loading...'>
          <SnackbarProvider autoHideDuration={1500}>
            <AuthProvider>
              <RelayProvider>
                <Routing />
              </RelayProvider>
            </AuthProvider>
          </SnackbarProvider>
        </Suspense>
      </ErrorBoundary>
    </ThemeProvider>
  </BrowserRouter>
)
