import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import LoginPage from '../../pages/LoginPage'
import AppPage from '../../pages/AppPage'
import Host from '../../pages/CallPage/Host'
import Guest from '../../pages/CallPage/Guest'
const SignupPage = lazy(() => import('../../pages/SignupPage'))
const RoomListPage = lazy(() => import('../../pages/MessagePage/RoomListPage'))
const NewRoomPage = lazy(() => import('../../pages/MessagePage/NewRoomPage'))
const Room = lazy(() => import('../../pages/MessagePage/Room'))
// const CallPage = lazy(() => import('../../pages/CallPage'))

const Routing = () => {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/app' element={<AppPage />}>
        <Route path='messages' element={<RoomListPage />}>
          <Route path='new' element={<NewRoomPage />} />
          <Route path=':id' element={<Room />} />
        </Route>
        <Route path='call'>
          <Route path='host/:roomId' element={<Host />} />
          <Route path='guest/:roomId' element={<Guest />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Routing
