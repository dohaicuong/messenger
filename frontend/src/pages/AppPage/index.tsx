import { Suspense, useEffect } from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../providers/auth'
import Navbar from './Navbar'
import { AppPageQuery } from './__generated__/AppPageQuery.graphql'

const AppPage = () => {
  const { token, signout } = useAuth()
  const data = useLazyLoadQuery<AppPageQuery>(
    graphql`
      query AppPageQuery {
        me {
          ...NavbarFragment_user
        }
      }
    `,
    {}
  )

  useEffect(() => {
    if (!data.me) signout()
  }, [data.me])

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
