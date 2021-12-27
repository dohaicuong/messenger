import { Suspense } from 'react'
import { useLazyLoadQuery, graphql } from 'react-relay'
import UserSearchingInput from './UserSearchingInput'
import { NewRoomPageQuery } from './__generated__/NewRoomPageQuery.graphql'

const NewRoomPage = () => {
  const data = useLazyLoadQuery<NewRoomPageQuery>(
    graphql`
      query NewRoomPageQuery {
        me {
          ...UserSearchingInput_me
        }
      }
    `,
    {}
  )

  if(!data.me) return null

  return (
    <Suspense fallback='Loading...'>
      <UserSearchingInput meRef={data.me} />
    </Suspense>
  )
}

export default NewRoomPage
