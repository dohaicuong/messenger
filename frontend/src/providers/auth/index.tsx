import React, { createContext, useCallback, useContext, useState } from 'react'
import { useRelayEnvironment, commitLocalUpdate } from 'react-relay'

type AuthContextType = {
  id?: string
  token?: string
  signin: (token: string, id: string) => void
  signout: () => void
}

let AuthContext = createContext<AuthContextType>(null!)

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('jwt') || undefined)
  const [id, setId] = useState<string | undefined>(localStorage.getItem('userId') || undefined)
  const relay = useRelayEnvironment()

  const signin = useCallback((_token: string, _id: string) => {
    localStorage.setItem('jwt', _token)
    localStorage.setItem('userId', _id)

    setTimeout(() => {
      setToken(_token)
      setId(_id)
    }, 500)
  }, [])
  const signout = () => {
    localStorage.removeItem('jwt')
    localStorage.removeItem('userId')
    commitLocalUpdate(relay, store => {
      store.getRoot().invalidateRecord()
    })

    setTimeout(() => {
      setToken(undefined)
      setId(undefined)
    }, 200)
  }

  const value = { token, id, signin, signout }

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