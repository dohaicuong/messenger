import React, { createContext, useCallback, useContext, useState } from 'react'

type AuthContextType = {
  token?: string
  signin: (token: string) => void
  signout: () => void
}

let AuthContext = createContext<AuthContextType>(null!)

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | undefined>(localStorage.getItem('jwt') || undefined)

  const signin = useCallback((_token: string) => {
    setToken(_token)
    localStorage.setItem('jwt', _token)
  }, [])
  const signout = useCallback(() => {
    setToken(undefined)
    localStorage.removeItem('jwt')
  }, [])

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