import { Suspense, useEffect } from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { Navigate, Outlet, useMatch, useNavigate } from 'react-router-dom'
import { useAuth } from '../../providers/auth'
import Navbar from './Navbar'
import { AppPageQuery } from './__generated__/AppPageQuery.graphql'

const AppPage = () => {
  const { token, signout } = useAuth()
  const navigate = useNavigate()

  const data = useLazyLoadQuery<AppPageQuery>(
    graphql`
      query AppPageQuery {
        me {
          id
          ...NavbarFragment_user
        }
      }
    `,
    {},
  )

  const key = JSON.stringify(data.me?.id || {})
  useEffect(() => {
    if (!data.me?.id) return signout()
  }, [key])

  const match = useMatch('/app')
  useEffect(() => {
    if (match?.pathname) navigate('messages')
  }, [match?.pathname])

  if (!token || !data.me) return <Navigate to='/' />

  return (
    <>
      <Navbar userRef={data.me} />
      <Suspense fallback='Loading...'>
        <Outlet />
      </Suspense>
    </>
  )
}

export default AppPage
