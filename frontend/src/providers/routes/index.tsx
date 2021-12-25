import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginPage from '../../pages/LoginPage'
const SignupPage = lazy(() => import('../../pages/SignupPage'))
const AppPage = lazy(() => import('../../pages/AppPage'))

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/app' element={<AppPage />} />
    </Routes>
  )
}

export default Routing
