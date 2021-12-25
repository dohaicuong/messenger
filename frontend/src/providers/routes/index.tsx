import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginPage from '../../pages/LoginPage'
import AppPage from '../../pages/AppPage'
const SignupPage = lazy(() => import('../../pages/SignupPage'))
const RoomList = lazy(() => import('../../pages/MessagePage/RoomList'))
const Room = lazy(() => import('../../pages/MessagePage/Room'))

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/app' element={<AppPage />}>
        <Route path='messages' element={<RoomList />}>
          <Route path=':id' element={<Room />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Routing
