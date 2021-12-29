import { Divider } from '@mui/material'
import { useLazyLoadQuery, graphql } from 'react-relay'
import { useParams } from "react-router-dom"
import RoomHeader from './RoomHeader'
import RoomChatBox from './RoomChatBox'
import { RoomQuery } from './__generated__/RoomQuery.graphql'
import RoomMessageList from './RoomMessageList'

const Room = () => {
  const { id } = useParams<{ id: string }>()
  const data = useLazyLoadQuery<RoomQuery>(
    graphql`
      query RoomQuery($id: ID!) {
        room: node (id: $id) {
          ... on Room {
            ...RoomHeader_room
            ...RoomMessageList_room
          }
        }
      }
    `,
    { id: id || '' }
  )

  if (!data.room) return null

  return (
    <>
      <RoomHeader roomRef={data.room} />
      <Divider />
      <RoomMessageList roomRef={data.room} />
      <RoomChatBox />
    </>
  )
}

export default Room
