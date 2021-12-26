import React, { createContext, useCallback, useContext, useState } from 'react'
import { useRelayEnvironment, commitLocalUpdate } from 'react-relay'

type AuthContextType = {
  token?: string
  signin: (token: string) => void
  signout: () => void
}

let AuthContext = createContext<AuthContextType>(null!)

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('jwt') || undefined)
  const relay = useRelayEnvironment()

  const signin = useCallback((_token: string) => {
    localStorage.setItem('jwt', _token)
    setTimeout(() => {
      setToken(_token)
    }, 500)
  }, [])
  const signout = () => {
    localStorage.removeItem('jwt')
    commitLocalUpdate(relay, store => {
      store.getRoot().invalidateRecord()
    })

    setTimeout(() => {
      setToken(undefined)
    }, 200)
  }

  const value = { token, signin, signout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => {
  return useContext(AuthContext)
}