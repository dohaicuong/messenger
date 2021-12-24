import { Navigate } from 'react-router-dom'
import { useAuth } from '../../providers/auth'

const AppPage = () => {
  const { token } = useAuth()

  if (!token) return <Navigate to='/' />

  return (
    <>App</>
  )
}

export default AppPage
