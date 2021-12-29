import { styled, Typography } from '@mui/material'
import { usePaginationFragment, graphql, useSubscription } from 'react-relay'
import RoomMessageItem from './RoomMessageItem'
import { LoadingButton } from '@mui/lab'
import { RoomMessageList_room$key } from './__generated__/RoomMessageList_room.graphql'
import { RoomMessageListPaginationQuery } from './__generated__/RoomMessageListPaginationQuery.graphql'
import { useMemo } from 'react'
import { RoomMessageListSubscription } from './__generated__/RoomMessageListSubscription.graphql'
import { useParams } from 'react-router-dom'

type RoomMessageListProps = {
  roomRef: RoomMessageList_room$key
}

const MessageSentSubscription = graphql`
  subscription RoomMessageListSubscription(
    $input: MessageSentInput!
    $connections: [ID!]!
  )
  {
    messageSent(input: $input) {
      message
      @appendNode(
        edgeTypeName: "MessageEdge"
        connections: $connections
      )
      {
        ...RoomMessageItem_message
      }
    }
  }
`
const RoomMessageList: React.FC<RoomMessageListProps> = ({ roomRef }) => {
  const { id } = useParams()

  const { data, hasNext, isLoadingNext, loadNext } = usePaginationFragment<RoomMessageListPaginationQuery, RoomMessageList_room$key>(
    graphql`
      fragment RoomMessageList_room on Room
      @refetchable(queryName: "RoomMessageListPaginationQuery")
      @argumentDefinitions(
        count: { type: "Int!", defaultValue: 10 }
        cursor: { type: "String" }
      )
      {
        id
        messages(first: $count, after: $cursor)
        @connection(key: "RoomMessageList_room_messages")
        {
          edges {
            node {
              id
              ...RoomMessageItem_message
            }
          }
        }
      }
    `,
    roomRef
  )
  const handleLoadMore = () => loadNext(10)
  
  const config = useMemo(
    () => ({
      subscription: MessageSentSubscription,
      variables: { 
        input: {
          roomId: id
        },
        connections: [
          `client:${id}:__RoomMessageList_room_messages_connection`
        ]  
      },
    }),
    [id]
  )
  useSubscription<RoomMessageListSubscription>(config)

  return (
    <RoomMessageBoxContainer>
      {!Boolean(data.messages.edges?.length) && (
        <Typography variant='h5' textAlign='center' style={{ marginTop: 24 }}>
          start talking to each others
        </Typography>
      )}

      {data.messages.edges?.map(edge => {
        if(!edge?.node) return

        return <RoomMessageItem key={edge.node.id} messageRef={edge.node} />
      })}

      {hasNext && (
        <LoadingButton fullWidth loading={isLoadingNext} onClick={handleLoadMore}>
          Load more
        </LoadingButton>
      )}
    </RoomMessageBoxContainer>
  )
}

export default RoomMessageList

const RoomMessageBoxContainer = styled('div')(({ theme }) => `
  height: calc(100vh - 64px - 65px - 56px - 33px);
  overflow-y: auto;
  margin: 16px 16px;
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 8px;
    display: none
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: ${theme.palette.background.paper};
    transition: background 0.5s ease-in-out;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${theme.palette.grey[800]};
    transition: background 0.5s ease-in-out;
  }
`)